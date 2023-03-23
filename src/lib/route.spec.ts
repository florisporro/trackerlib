import { describe, it, expect, beforeEach } from 'vitest'

import * as geolib from "geolib";

import { Route, RoutePoint } from "./route";
import { Distance } from "./units";


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
		expect(point1.bearing).to.equal(0);
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
			const sorted = route.sortByDistanceTravelled(new Distance(geolib.getDistance(start.position, finish.position), "m"));
			expect(sorted[0].name).to.equal("Finish");
			expect(sorted[1].name).to.equal("Point1");
			expect(sorted[2].name).to.equal("Start");

			const sorted2 = route.sortByDistanceTravelled(new Distance(geolib.getDistance(start.position, point1.position), "m"));
			expect(sorted2[0].name).to.equal("Point1");
		});

		it("returns the closest route point", () => {
			const closest = route.getClosestRoutePoint({ latitude: 0.02, longitude: 25 });
			expect(closest.name).to.equal("Finish");
		});

		it("accurately sorts nearest path segment when just before a point", () => {
			const segments = route.sortByNearestPathSegment({ latitude: 0.009, longitude: 24.9 });
			expect(segments[0][0].name).to.equal("Start");
			expect(segments[0][1].name).to.equal("Point1");
		});

		it("accurately sorts nearest path segment when just past a point", () => {
			const segments = route.sortByNearestPathSegment({ latitude: 0.011, longitude: 24.9 });
			expect(segments[0][0].name).to.equal("Point1");
			expect(segments[0][1].name).to.equal("Finish");
		});

		it("accurately sorts nearest path segment when just before the last point", () => {
			const segments = route.sortByNearestPathSegment({ latitude: 0.019, longitude: 24.0 });
			expect(segments[0][0].name).to.equal("Point1");
			expect(segments[0][1].name).to.equal("Finish");
		});
	})

	describe("calculating the nearest point on the route line", () => {
		it("accurately finds the route from just past the first point", () => {
			const pointOffRouteLine = { latitude: 0.001, longitude: 25.01 }
			const target = { latitude: 0.001, longitude: 25 }
			const calculatedPoint = route.getNearestPointOnRouteLine(pointOffRouteLine);
			const distanceFromTarget = geolib.getDistance(target, calculatedPoint);
			
			expect(distanceFromTarget).to.be.lessThan(5);
		});

		it("accurately finds the route from halfway to the first point", () => {
			const pointOffRouteLine = { latitude: 0.005, longitude: 24.50 }
			const target = { latitude: 0.005, longitude: 25 }
			const calculatedPoint = route.getNearestPointOnRouteLine(pointOffRouteLine);
			const distanceFromTarget = geolib.getDistance(target, calculatedPoint);
			
			expect(distanceFromTarget).to.be.lessThan(5);
		});

		it("accurately finds the route from just beyond the second point", () => {
			const pointOffRouteLine = { latitude: 0.012, longitude: 25.55 }
			const target = { latitude: 0.012, longitude: 25 }
			const calculatedPoint = route.getNearestPointOnRouteLine(pointOffRouteLine);
			const distanceFromTarget = geolib.getDistance(target, calculatedPoint);
			
			expect(distanceFromTarget).to.be.lessThan(5);
		});

		it("accurately finds the route from just before the finish", () => {
			const pointOffRouteLine = { latitude: 0.019, longitude: 25.03 }
			const target = { latitude: 0.019, longitude: 25 }
			const calculatedPoint = route.getNearestPointOnRouteLine(pointOffRouteLine);
			const distanceFromTarget = geolib.getDistance(target, calculatedPoint);
			
			expect(distanceFromTarget).to.be.below(5);
		});

		it("calculates total distance along route", () => {
			const pointOffRouteLine = { latitude: 0.015, longitude: 27.03 }
			const target = { latitude: 0.015, longitude: 25 }
			
			const distance = geolib.getDistance(start.position, target);
			const calculatedDistance = route.getDistanceAlongRoute(pointOffRouteLine);
			
			expect(distance - calculatedDistance.m).to.be.below(5);
			expect(distance - calculatedDistance.m).to.be.above(-5);
		});

		it("calculates a position on the route line from a distance along route", () => {
			const distance = new Distance(1670, "m");
			const target = { latitude: 0.015, longitude: 25 };
			const calculatedPoint = route.getRoutePointFromDistance(distance);

			const distanceFromTarget = geolib.getDistance(target, calculatedPoint);

			expect(distanceFromTarget).to.be.below(5);
			expect(distanceFromTarget).to.be.above(-5);
		})
	})
});
