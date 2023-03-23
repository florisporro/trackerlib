import * as geolib from "geolib"
import { Position, Distance } from "./units"

/**
 * A route point is a point on a route line. It can be given a lastRoutePoint in its constructor,
 * which will then calculate the distance and bearing between the two points. It will also
 * get a new id, which is the id of the lastRoutePoint + 1.
 *
 * @export
 * @class RoutePoint
 */
export class RoutePoint {
	readonly id: number;
	name?: string;
	position: Position;
	altitude?: number;
	meta?: object;
	readonly bearing?: number;
	readonly distance: Distance;
	readonly totalDistance: Distance;

	constructor(position: Position, altitude?: number, name?: string, lastRoutePoint?: RoutePoint) {
		this.name = name;
		this.position = position;
		this.altitude = altitude || 0;
		this.distance = new Distance(0);
		this.totalDistance = new Distance(0);

		if (lastRoutePoint) {
			this.id = lastRoutePoint.id + 1 || 0;
			this.bearing = geolib.getRhumbLineBearing(lastRoutePoint.position, position)
			this.distance = new Distance(geolib.getDistance(position, lastRoutePoint.position))
			this.totalDistance = new Distance(lastRoutePoint.totalDistance.m + this.distance.m)
		} else {
			this.id = 0
		}
	}

	/**
	 * Returns the distance between this route point and the given position.
	 *
	 * @param {Position} position
	 * @return {Distance}
	 * @memberof RoutePoint
	 */
	getDistance(position: Position): Distance {
		return new Distance(geolib.getDistance(this.position, position), "m")
	}

	/**
	 * Returns the bearing between this route point and the given position.
	 *
	 * @param {Position} position
	 * @return {number}
	 * @memberof RoutePoint
	 */
	getBearing(position: Position): number {
		return geolib.getRhumbLineBearing(this.position, position);
	}
}

export interface newRoutePoint {
	position: Position;
	name?: string;
	altitude?: number;
}

/**
 * A route is a collection of route points. It has a bunch of useful functions for working with routes, like the ability to find
 * the closest route position along the route line, or to sort the route points by distance from a given position.
 *
 * @export
 * @class Route
 */
export class Route {
	routePoints: RoutePoint[]

	constructor() {
		this.routePoints = []
	}
	
	/**
	 * Adds a new point to the route.
	 *
	 * @param {newRoutePoint} routePoint
	 * @return {RoutePoint}
	 * @memberof Route
	 */
	addRoutePoint(routePoint: newRoutePoint): RoutePoint {
		const lastRoutePoint = this.routePoints[this.routePoints.length - 1]
		const newRoutePoint = new RoutePoint(routePoint.position, routePoint.altitude, routePoint.name, lastRoutePoint)
		this.routePoints = [...this.routePoints, newRoutePoint]
		return newRoutePoint
	}

	/**
	 * Get the total distance of the route.
	 *
	 * @readonly
	 * @memberof Route
	 */
	get totalDistance(): Distance {
		return new Distance(this.routePoints.reduce((totalDistance, routePoint) => {
			return totalDistance + routePoint.distance.m
		}, 0))
	}

	/**
	 * Sort the Route by distance from a given position. Returns a copy.
	 *
	 * @param {Position} position
	 * @return {RoutePoint[]}
	 * @memberof Route
	 */
	sortByDistanceFromPosition(position: Position): RoutePoint[] {
		return Route.sortByDistanceFromPosition(this.routePoints, position)
	}

	/**
	 * Sort an array of route points by distance from a given position. Returns a copy.
	 *
	 * @static
	 * @param {RoutePoint[]} route
	 * @param {Position} position
	 * @return {RoutePoint[]}
	 * @memberof Route
	 */
	static sortByDistanceFromPosition(route: RoutePoint[], position: Position): RoutePoint[] {
		return [ ...route ].sort((pointA, pointB) => {
			const distanceA = geolib.getDistance(pointA.position, position)
			const distanceB = geolib.getDistance(pointB.position, position)

			return distanceA - distanceB
		})
	}

	/**
	 * Get the closest route point to a given position.
	 *
	 * @param {Position} position
	 * @return {RoutePoint}
	 * @memberof Route
	 */
	getClosestRoutePoint(position: Position): RoutePoint {
		return this.sortByDistanceFromPosition(position)[0]
	}

	/**
	 * Sorts an array of route points by distance travelled. Returns a copy.
	 *
	 * @static
	 * @param {RoutePoint[]} route
	 * @param {Distance} distance
	 * @return {RoutePoint[]}
	 * @memberof Route
	 */
	static sortByDistanceTravelled(route: RoutePoint[], distance: Distance): RoutePoint[] {
		return [ ...route ].sort((pointA, pointB) => {
			return Math.abs(distance.m-pointA.totalDistance.m) - Math.abs(distance.m-pointB.totalDistance.m)
		})
	}

	/**
	 * Sorts the route by distance travelled. Returns a copy.
	 *
	 * @param {Distance} distance
	 * @return {RoutePoint[]}
	 * @memberof Route
	 */
	sortByDistanceTravelled(distance: Distance): RoutePoint[] {
		return Route.sortByDistanceTravelled(this.routePoints, distance)
	}

	/**
	 * Gets the nearest route point to a given distance travelled along the route.
	 *
	 * @param {Distance} distance
	 * @return {RoutePoint}
	 * @memberof Route
	 */
	getRoutePointAtDistance(distance: Distance): RoutePoint {
		return this.sortByDistanceTravelled(distance)[0]
	}

	/**
	 * Finds the closest line segment in the route to a given position. Returns an array of two route points, which are the
	 * start and end of the closest line segment.
	 *
	 * @param {Position} position
	 * @return {RoutePoint[][]}
	 * @memberof Route
	 */
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

	/**
	 * Gets the current segment of the route, which is the closest line segment to the given position.
	 *
	 * @param {Position} position
	 * @return {RoutePoint[]}
	 * @memberof Route
	 */
	getCurrentSegment(position: Position): RoutePoint[] {
		const sortedSegments = this.sortByNearestPathSegment(position)
		return sortedSegments[0]
	}

	/**
	 * Gets the next upcoming route point on the route, which is the furthest along point on the nearest line segment.
	 *
	 * @param {Position} position
	 * @return {RoutePoint}
	 * @memberof Route
	 */
	getNextRoutePoint(position: Position): RoutePoint {
		const sortedSegments = this.sortByNearestPathSegment(position)
		return sortedSegments[0][1]
	}

	/**
	 * Gets the nearest position on the route line to a given position.
	 *
	 * @param {Position} position
	 * @return {Position}
	 * @memberof Route
	 */
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

	/**
	 * For a given position, finds the nearest position on the route line and returns the distance along the route to that position.
	 *
	 * @param {Position} position
	 * @return {Distance}
	 * @memberof Route
	 */
	getDistanceAlongRoute(position: Position): Distance {
		const nearestPointOnRouteLine = this.getNearestPointOnRouteLine(position)
		const nearestSegment = this.sortByNearestPathSegment(position)[0]
		const distanceToNearestRoutePoint = geolib.getDistance(nearestPointOnRouteLine, nearestSegment[0].position)
		const distanceAlongRoute = nearestSegment[0].totalDistance.m + distanceToNearestRoutePoint

		return new Distance(distanceAlongRoute, "m")
	}

	/**
	 * For a given distance, finds the nearest position on the route line and returns the position on the route line at that distance.
	 *
	 * @param {Distance} distance
	 * @return {Position}
	 * @memberof Route
	 */
	getRoutePointFromDistance(distance: Distance): Position {
		const routePoint = this.getRoutePointAtDistance(distance)
		const distanceFromRoutePoint = distance.m - routePoint.totalDistance.m
		const bearing = routePoint.bearing
		if (bearing !== undefined) {
			return geolib.computeDestinationPoint(routePoint.position, distanceFromRoutePoint, bearing)
		} else {
			return routePoint.position;
		}
	}

	/**
	 * Get all route points that sequentially follow a given route point.
	 *
	 * @param {RoutePoint} routePoint
	 * @return {RoutePoint[]}
	 * @memberof Route
	 */
	getAllFollowingRoutePoints(routePoint: RoutePoint): RoutePoint[] {
		const index = this.routePoints.indexOf(routePoint)
		return this.routePoints.slice(index)
	}
}