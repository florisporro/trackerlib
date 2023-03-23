import * as geolib from "geolib"
import { Position, Distance } from "./units"

export class RoutePoint {
	readonly id: number;
	name?: string;
	position: Position;
	altitude?: number;
	meta?: object;
	readonly bearing?: number;
	readonly distance: number;
	readonly totalDistance: number;

	constructor(position: Position, altitude?: number, name?: string, lastRoutePoint?: RoutePoint) {
		this.name = name;
		this.position = position;
		this.altitude = altitude || 0;
		this.distance = 0;
		this.totalDistance = 0;

		if (lastRoutePoint) {
			this.id = lastRoutePoint.id + 1 || 0;
			this.bearing = geolib.getRhumbLineBearing(lastRoutePoint.position, position)
			this.distance = geolib.getDistance(position, lastRoutePoint.position)
			this.totalDistance = lastRoutePoint.totalDistance + this.distance
		} else {
			this.id = 0
		}
	}

	getDistance(position: Position): Distance {
		return new Distance(geolib.getDistance(this.position, position), "m")
	}

	getBearing(position: Position): number {
		return geolib.getRhumbLineBearing(this.position, position);
	}
}

interface newRoutePoint {
	position: Position;
	name?: string;
	altitude?: number;
}

export class Route {
	routePoints: RoutePoint[]

	constructor() {
		this.routePoints = []
	}

	addRoutePoint(routePoint: newRoutePoint) {
		const lastRoutePoint = this.routePoints[this.routePoints.length - 1]
		const newRoutePoint = new RoutePoint(routePoint.position, routePoint.altitude, routePoint.name, lastRoutePoint)
		this.routePoints = [...this.routePoints, newRoutePoint]
		return newRoutePoint
	}

	get totalDistance() {
		return this.routePoints.reduce((totalDistance, routePoint) => {
			return totalDistance + routePoint.distance
		}, 0)
	}

	sortByDistanceFromPosition(position: Position): RoutePoint[] {
		return Route.sortByDistanceFromPosition(this.routePoints, position)
	}

	static sortByDistanceFromPosition(route: RoutePoint[], position: Position): RoutePoint[] {
		return route.sort((pointA, pointB) => {
			const distanceA = geolib.getDistance(pointA.position, position)
			const distanceB = geolib.getDistance(pointB.position, position)

			return distanceA - distanceB
		})
	}

	getClosestRoutePoint(position: Position): RoutePoint {
		return this.sortByDistanceFromPosition(position)[0]
	}

	static sortByDistanceTravelled(route: RoutePoint[], distance: Distance): RoutePoint[] {
		return route.sort((pointA, pointB) => {
			return Math.abs(distance.m-pointA.totalDistance) - Math.abs(distance.m-pointB.totalDistance)
		})
	}

	sortByDistanceTravelled(distance: Distance): RoutePoint[] {
		return Route.sortByDistanceTravelled(this.routePoints, distance)
	}

	getRoutePointAtDistance(distance: Distance): RoutePoint {
		return this.sortByDistanceTravelled(distance)[0]
	}

	sortByNearestPathSegment(position: Position): RoutePoint[][] {
		// Find the nearest path segment, consisting of two consecutive RoutePoints

		const segments = this.routePoints.map((routePoint, index) => {
			const nextRoutePoint = this.routePoints[index + 1]
			if (nextRoutePoint) {
				return [routePoint, nextRoutePoint]
			}
		}).filter(segment => segment !== undefined) as RoutePoint[][]

		const sortedSegments = segments.sort((segmentA, segmentB) => {
			if (!segmentA || !segmentB) {
				return 0
			}
			const segmentAdistance = geolib.getDistanceFromLine(position, segmentA[0].position, segmentA[1].position)
			const segmentBdistance = geolib.getDistanceFromLine(position, segmentB[0].position, segmentB[1].position)

			return segmentAdistance - segmentBdistance
		})

		return sortedSegments
	}

	getCurrentSegment(position: Position): RoutePoint[] {
		const sortedSegments = this.sortByNearestPathSegment(position)
		return sortedSegments[0]
	}

	getNextRoutePoint(position: Position): RoutePoint {
		const sortedSegments = this.sortByNearestPathSegment(position)
		return sortedSegments[0][1]
	}

	getNearestPointOnRouteLine(position: Position): Position {
		// Sort segments by nearest to position
		const sortedSegments = this.sortByNearestPathSegment(position)
		const nearestSegment = sortedSegments[0]

		// Get the distance from the segment line
		const distanceFromRouteLine = geolib.getDistanceFromLine(position, nearestSegment[0].position, nearestSegment[1].position)

		// Get the distance to the next point on the segment line
		const distanceToNextSegmentPoint = geolib.getDistance(position, nearestSegment[1].position)

		// Use pythagoras to get distance from the closest route point
		const AC2 = Math.pow(distanceToNextSegmentPoint,2) || 0
		const BC2 = Math.pow(distanceFromRouteLine,2) || 0
		const AB2 = Math.sqrt(AC2 - BC2)
		const distanceToNextSegmentPointAlongSegment = AB2

		// Get the bearing on our segment from the next to the previous point
		const bearing = geolib.getGreatCircleBearing(nearestSegment[1].position, nearestSegment[0].position)

		// Now work back to get the final position on the route line)
		const target = geolib.computeDestinationPoint(nearestSegment[1].position, distanceToNextSegmentPointAlongSegment, bearing)

		return target
	}

	getDistanceAlongRoute(position: Position): Distance {
		const nearestPointOnRouteLine = this.getNearestPointOnRouteLine(position)
		const nearestSegment = this.sortByNearestPathSegment(position)[0]
		const distanceToNearestRoutePoint = geolib.getDistance(nearestPointOnRouteLine, nearestSegment[0].position)
		const distanceAlongRoute = nearestSegment[0].totalDistance + distanceToNearestRoutePoint

		return new Distance(distanceAlongRoute, "m")
	}

	// When given a distance along the route, return a position on the route line route point at that distance
	getRoutePointFromDistance(distance: Distance): Position {
		const routePoint = this.getRoutePointAtDistance(distance)
		const distanceFromRoutePoint = distance.m - routePoint.totalDistance
		const bearing = routePoint.bearing
		if (bearing !== undefined) {
			return geolib.computeDestinationPoint(routePoint.position, distanceFromRoutePoint, bearing)
		} else {
			return routePoint.position;
		}
	}

	getAllFollowingRoutePoints(routePoint: RoutePoint): RoutePoint[] {
		const index = this.routePoints.indexOf(routePoint)
		return this.routePoints.slice(index)
	}
}