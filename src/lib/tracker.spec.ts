import { describe, it, expect, beforeEach } from 'vitest'

import { Tracker } from "./tracker";

describe("Tracker", () => {
	// let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;
	let tracker: Tracker;

	beforeEach(() => {
		tracker = new Tracker("Test Tracker", "Car", {
			team: "Test Team"
		});

		tracker.record({
			position: {
				latitude: 0.0,
				longitude: 25.0
			}
		})

		tracker.record({
			position: {
				latitude: 0.01,
				longitude: 25.0
			},
			positionTimestamp: Date.now() + 60000
		})

		console.log(tracker.calcBearing(tracker.lastFrame, tracker.currentFrame))

		tracker.record({
			position: {
				latitude: 0.01,
				longitude: 25.0
			},
			positionTimestamp: Date.now() + 60000
		})

		tracker.record({
			position: {
				latitude: 0.02,
				longitude: 25.0
			},
			positionTimestamp: Date.now() + 120000
		})
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
		expect(tracker.currentFrame.totalDistance).to.be.above(2220)
		expect(tracker.currentFrame.totalDistance).to.be.below(2230)
	})

	it("ignores recording of duplicate frames", () => {
		expect(tracker.frames.length).to.equal(3)
	})

	it("projects position given speed and bearing", () => {
		const projectedPosition = tracker.projectPosition(Date.now() + 180000)

		expect(projectedPosition.latitude).to.be.above(0.02)
		expect(projectedPosition.latitude).to.be.below(0.04)
		expect(projectedPosition.longitude).to.equal(25.0)
	})

	it("returns an array of speeds", () => {
		expect(tracker.speeds.length).to.equal(2)
	})

	it("at a constant speed, filtered speed remains constant too", () => {
		const filteredSpeed = tracker.filterSpeed(0.2, 2)
		expect(filteredSpeed.mps).to.equal(18.55)
	})

	it("at sudden acceleration, filtered speed increases by the difference times the factor", () => {
		tracker.record({
			position: {
				latitude: 0.04,
				longitude: 25.0
			},
			positionTimestamp: Date.now() + 180000
		})

		const difference = 18.55 * 0.2

		const expectedSpeed = 18.55 + difference
		const filteredSpeed = tracker.filterSpeed(0.2, 2)
		
		expect(filteredSpeed.mps).to.equal(expectedSpeed)
	})
})