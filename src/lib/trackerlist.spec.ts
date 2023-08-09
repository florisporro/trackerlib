import { describe, it, expect, beforeEach } from 'vitest'

import { TrackerList } from "./trackerlist";
import { Tracker, Frame } from "./tracker";
import { Route, RoutePoint } from "./route";
import { Position } from "./units"

describe("Tracker", () => {
	let tracker1: Tracker;
	let tracker2: Tracker;
	let trackerlist: TrackerList
	let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;

	beforeEach(() => {
		tracker1 = new Tracker("Test tracker 1");
		tracker2 = new Tracker("Test tracker 2");
		trackerlist = new TrackerList("Test trackerlist", [tracker1, tracker2]);

		route = new Route();
		// Add a route with a 90 degree turn in the middle
		start = route.addRoutePoint({ name: "Start", position: { latitude: 0, longitude: 25.0 } });
		point1 = route.addRoutePoint({ name: "Point1", position: { latitude: 0.01, longitude: 25.0 } });
		finish = route.addRoutePoint({ name: "Finish", position: { latitude: 0.01, longitude: 25.01 } });
	});

	it("sorts trackers by total distance travelled", () => {
		tracker1.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)
		tracker2.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)
		tracker2.record({
				latitude: 0.01,
				longitude: 25.0
			},
			Date.now() + 60000
		)

		expect(trackerlist.sortByTotalDistanceTravelled()).toEqual([tracker2, tracker1])
	})

	it("sorts trackers by projected distance travelled", () => {
		tracker1.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)
		// Note that tracker1 is way faster
		tracker1.record({
				latitude: 0.01,
				longitude: 25.0
			},
			Date.now() + 10000
		)
		tracker2.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)
		tracker2.record({
				latitude: 0.01,
				longitude: 25.0
			},
			Date.now() + 60000
		)

		expect(trackerlist.sortByProjectedDistaceTravelled(Date.now() + 120000)).toEqual([tracker1, tracker2])
	})

	it("sorts trackers by projected distance travelled along route", () => {
		tracker1.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)
		tracker1.record({
				latitude: 0.01,
				longitude: 25.0
			},
			Date.now() + 60000
		)
		tracker2.record({
				latitude: 0.0,
				longitude: 25.0
			}
		)
		// Note that tracker2 is way faster
		tracker2.record({
				latitude: 0.01,
				longitude: 25.0
			},
			Date.now() + 10000
		)

		expect(trackerlist.sortByProjectedDistaceTravelled(Date.now() + 120000)).toEqual([tracker2, tracker1])
	})

	describe("getting arrays of distances travelled", () => {
		let tracker1: Tracker;
		let tracker2: Tracker;
		let trackerlist: TrackerList
		let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;

		beforeEach(() => {
			tracker1 = new Tracker("Test tracker 1");
			tracker2 = new Tracker("Test tracker 2");
			trackerlist = new TrackerList("Test trackerlist", [tracker1, tracker2]);
	
			route = new Route();
			// Add a route with a 90 degree turn in the middle
			start = route.addRoutePoint({ name: "Start", position: { latitude: 0, longitude: 25.0 } });
			point1 = route.addRoutePoint({ name: "Point1", position: { latitude: 0.01, longitude: 25.0 } });
			finish = route.addRoutePoint({ name: "Finish", position: { latitude: 0.01, longitude: 25.01 } });

			tracker1.record(
				{
					latitude: 0.0,
					longitude: 25.0
				}
			)
			tracker1.record(
				{
					latitude: 0.01,
					longitude: 25.0
				},
				Date.now() + 60000
			)
			tracker2.record(
				{
					latitude: 0.0,
					longitude: 25.0
				}
			)
			// Note that tracker2 is a bit faster
			tracker2.record({
					latitude: 0.012,
					longitude: 25.0
				},
				Date.now() + 50000
			)
		});

		it("gets total distances travelled", () => {
			const distances = trackerlist.getTotalDistancesTravelled();
			
			expect(distances[0].m).to.equal(1113)
			expect(distances[1].m).to.equal(1336)
		});

		it("gets projected distances travelled", () => {
			const distances = trackerlist.getProjectedDistancesTravelled(Date.now() + 120000);


			expect(distances[0].m).to.equal(2226)
			expect(distances[1].m).to.equal(3206.4)
		});

		it("gets projected distances travelled along route", () => {
			const distances = trackerlist.getProjectedDistancesTravelledAlongRoute(Date.now() + 120000, route);
			
			expect(distances[0].m).to.be.above(2226 - 0.02)
			expect(distances[0].m).to.be.below(2226 + 0.02)
			expect(distances[1].m).to.be.above(2983.4 - 0.02)
			expect(distances[1].m).to.be.below(2983.4 + 0.02)
		});
	});

	describe("serializing / deserializing to JSON", () => {
		it("serializes", () => {
			tracker1.record({
					latitude: 0.0,
					longitude: 25.0
				}
			)
			const serializedTrackerlist = trackerlist.serialize()
			expect(serializedTrackerlist.name).to.equal("Test trackerlist")
		});

		it("deserializes", () => {
			const serializedTrackerlist = trackerlist.serialize()
			const deserializedTrackerlist = TrackerList.deserialize(serializedTrackerlist)
			expect(deserializedTrackerlist.name).to.equal("Test trackerlist")
		});
	})

});