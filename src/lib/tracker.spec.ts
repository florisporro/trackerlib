import { describe, it, expect, beforeEach } from 'vitest'

import { Tracker, Frame } from "./tracker";
import { Route, RoutePoint } from "./route";
import { Position } from "./units"
const now = Date.now();

describe("Tracker", () => {
	let tracker: Tracker;

	beforeEach(() => {

		tracker = new Tracker("Test Tracker", "Car", {
			team: "Test Team"
		});

		tracker.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)

		tracker.record({
				latitude: 0.01,
				longitude: 25.0
			}, now + 60000
		)

		tracker.record({
				latitude: 0.01,
				longitude: 25.0
			}, now + 60000
		)

		tracker.record({
				latitude: 0.02,
				longitude: 25.0
			}, now + 120000
		)
	});

	it("creates a new tracker", () => {
		expect(tracker.name).to.equal("Test Tracker");
		expect(tracker.type).to.equal("Car");
		expect(tracker?.meta?.team).to.equal("Test Team");
	})

	it("allows recording of tracker frames", () => {
		expect(tracker.frames.length).to.equal(3)
	})

	it("creates a unique frame number for every new frame", () => {
		expect(tracker.frames[0].frameno).to.equal(0)
		expect(tracker.frames[1].frameno).to.equal(1)
	})

	it("calculates speed given two frames", () => {
		// Distance is roughly 1110m so speed is slightly above
		// 18 meters per second
		expect(tracker.speed.mps).to.be.above(18)
		expect(tracker.speed.mps).to.be.below(19)
	})

	it("calculates bearing given two frames", () => {
		// Tracker is moving up
		expect(tracker.bearing).to.equal(0)
	})

	it("keeps a running total of distance travelled", () => {
		expect((tracker.currentFrame as Frame).totalDistance.m).to.be.above(2220)
		expect((tracker.currentFrame as Frame).totalDistance.m).to.be.below(2230)
	})

	it("ignores recording of duplicate frames", () => {
		expect(tracker.frames.length).to.equal(3)
	})

	it("projects position based on tracker history", () => {
		const projectedPosition = tracker.projectPosition(now + 180000)

		expect((projectedPosition as Position).latitude).to.be.above(0.02)
		expect((projectedPosition as Position).latitude).to.be.below(0.04)
		expect((projectedPosition as Position).longitude).to.equal(25.0)
	})

	it("projects total distance based on tracker history", () => {
		const projectedDistance = tracker.projectTotalDistance(now + 180000)

		expect(projectedDistance.m).to.be.below(4000)
		expect(projectedDistance.m).to.be.above(3000)
	})

	it("returns an array of speeds", () => {
		expect(tracker.speeds.length).to.equal(2)
	})

	it("at a constant speed, filtered speed remains constant too", () => {
		const filteredSpeed = tracker.filterSpeed(0.2, 2)
		expect(Number(filteredSpeed.mps.toFixed(2))).to.equal(18.55)
	})

	it("at sudden acceleration, filtered speed increases by the difference times the factor", () => {
		tracker.record(
			{
				latitude: 0.04,
				longitude: 25.0
			},
			now + 180000
		)

		const difference = 18.55 * 0.2

		const expectedSpeed = 18.55 + difference
		const filteredSpeed = tracker.filterSpeed(0.2, 2)
		
		expect(filteredSpeed.mps).to.be.above(expectedSpeed - 0.02)
		expect(filteredSpeed.mps).to.be.below(expectedSpeed + 0.02)
	})

	describe("serializing / deserializing to JSON", () => {
		it("serializes", () => {
			const serializedTracker = tracker.serialize()
			expect(serializedTracker.name).to.equal("Test Tracker")
		});

		it("deserializes", () => {
			const serializedTracker = tracker.serialize()
			const deserializedTracker = Tracker.deserialize(serializedTracker)
			expect(deserializedTracker.name).to.equal("Test Tracker")
			// console.log(deserializedTracker)
			expect(deserializedTracker.totalDistance.m).to.equal(2226);
		});
	})

	describe("working with routes", () => {
		let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;
		let tracker2: Tracker;

		beforeEach(() => {
			route = new Route();
			start = route.addRoutePoint({ name: "Start", position: { latitude: 0, longitude: 25.0 } });
			point1 = route.addRoutePoint({ name: "Point1", position: { latitude: 0.01, longitude: 25.0 } });
			finish = route.addRoutePoint({ name: "Finish", position: { latitude: 0.01, longitude: 25.01 } });

			tracker2 = new Tracker("Test Tracker", "Car");
	
			tracker2.record({
					latitude: -0.01,
					longitude: 25.0
				}
			)

			tracker2.record({
					latitude: 0.0,
					longitude: 25.0
				},
				now + 60000
			)

			tracker2.record({
					latitude: 0.01,
					longitude: 25.0
				},
				now + 120000
			)
		})

		it("projects position directly ahead", () => {
			const projectedPosition = tracker2.projectPosition(now + 180000)

			expect((projectedPosition as Position).latitude).to.be.above(0.019)
			expect((projectedPosition as Position).latitude).to.be.below(0.021)
			expect((projectedPosition as Position).longitude).to.equal(25.0)
		})

		it("projects position along the route line", () => {
			const projectedPosition = tracker2.projectPositionOnRouteLine(now + 180000, route)

			expect(projectedPosition.latitude).to.equal(0.01)
			expect(projectedPosition.longitude).to.be.above(25.009)
			expect(projectedPosition.longitude).to.be.below(25.011)
		})

		it("calculates speed along the route line", () => {
			const speed = tracker2.calcSpeedAlongRouteLine(route)
			expect(speed.mps).to.be.above(18)
			expect(speed.mps).to.be.below(19)
		});
	})

	describe("calculating relative motion", () => {
		let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;
		let tracker2: Tracker;

		beforeEach(() => {
			tracker2 = new Tracker("Test Tracker", "Car");
		})

		it("returns distance only if one of the trackers does not have enough frames", () => {
			const relativeMotion = tracker.calcTrackerRelativeMotion(tracker2)
			expect(relativeMotion?.deltaDistance?.m).to.equal(undefined)
		});

		it("returns distance if both trackers have frames", () => {
			tracker2.record({
				latitude: 0.0,
				longitude: 25.0})
			const relativeMotion = tracker.calcTrackerRelativeMotion(tracker2)
			expect(relativeMotion?.deltaDistance?.m).to.equal(2226)
		});

		it("returns intercept time if both trackers have more than 1 frame and are closing", () => {
			tracker2.record({
				latitude: 0.00,
				longitude: 25.0}, now)

			tracker2.record({
				latitude: 0.012,
				longitude: 25.0}, now + 60000)

			tracker2.record({
				latitude: 0.02,
				longitude: 25.0}, now + 90000)

			const relativeMotion = tracker.calcTrackerRelativeMotion(tracker2, now + 120000)
			// console.log(relativeMotion)
			// expect(relativeMotion?.distance?.m).to.equal(2226)
		});

		describe("working with routes", () => {
			let tracker3, tracker4;
			
			beforeEach(() => {
				route = new Route();
				start = route.addRoutePoint({ name: "Start", position: { latitude: 0, longitude: 25.0 } });
				point1 = route.addRoutePoint({ name: "Point1", position: { latitude: 0.01, longitude: 25.0 } });
				finish = route.addRoutePoint({ name: "Finish", position: { latitude: 0.01, longitude: 25.01 } });

				tracker3 = new Tracker("Test Tracker", "Car");
				tracker4 = new Tracker("Test Tracker", "Car");

				tracker3.record({
					latitude: 0.005,
					longitude: 25.0}, now - 10000)
				tracker3.record({
					latitude: 0.006,
					longitude: 25.0}, now)
	
				tracker4.record({
					latitude: 0.01,
					longitude: 25.005}, now - 10000)

				tracker4.record({
					latitude: 0.01,
					longitude: 25.0055}, now)
			});

			it("returns relative distance on the route line", () => {
				const relativeMotion = tracker3.calcTrackerRelativeMotion(tracker4, undefined, route)
				console.log(relativeMotion)
				console.log(route.totalDistance)
				// expect(relativeMotion?.deltaDistance?.m).to.equal(1113)
			});
		})
	})
})