import { expect } from "chai";
import "mocha";

import * as geolib from "geolib";

import { Route, RoutePoint } from "./route";

describe("Route", () => {
	let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;

	beforeEach(() => {
		route = new Route();
		start = route.addRoutePoint({ name: "Start", position: { latitude: 0, longitude: 25.0 } });
		point1 = route.addRoutePoint({ name: "Point1", position: { latitude: 0.01, longitude: 25.0 } });
		finish = route.addRoutePoint({ name: "Finish", position: { latitude: 0.02, longitude: 25.0 } });
	});

	it("calculates distances on route points", () => {
		expect(start.distance).to.equal(0);
		expect(point1.distance).to.equal(geolib.getDistance(start.position, point1.position));
		expect(finish.distance).to.equal(geolib.getDistance(point1.position, finish.position));
	})

	it("calculates total distance on route points", () => {
		expect(start.totalDistance).to.equal(0);
		expect(point1.totalDistance).to.equal(geolib.getDistance(start.position, point1.position));
		expect(finish.totalDistance).to.equal(geolib.getDistance(start.position, finish.position));
	})

	it("calculates bearing on route points", () => {
		expect(start.bearing).to.equal(undefined);
		expect(point1.bearing).to.equal(180);
	})

	it("calculates total route distance", () => {
		expect(finish.totalDistance).to.equal(geolib.getDistance(start.position, finish.position));
		expect(route.totalDistance).to.equal(geolib.getDistance(start.position, finish.position));
	});

	it("makes a unique id when adding route points", () => {
		expect(start.id).to.equal(0);
		expect(point1.id).to.equal(1);
		expect(finish.id).to.equal(2);
	});

	describe("sorting", () => {
		it("sorts route points by distance from a position", () => {
			const sorted = route.sortByDistanceFromPosition({ latitude: 0.02, longitude: 25 });
			expect(sorted[0].name).to.equal("Finish");
			expect(sorted[1].name).to.equal("Point1");
			expect(sorted[2].name).to.equal("Start");
		});

		it("sorts route points by a distance travelled value", () => {
			const sorted = route.sortByDistanceTravelled(geolib.getDistance(start.position, finish.position));
			expect(sorted[0].name).to.equal("Finish");
			expect(sorted[1].name).to.equal("Point1");
			expect(sorted[2].name).to.equal("Start");

			const sorted2 = route.sortByDistanceTravelled(geolib.getDistance(start.position, point1.position));
			expect(sorted2[0].name).to.equal("Point1");
		});
	})
});
