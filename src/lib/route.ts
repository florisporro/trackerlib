import * as geolib from "geolib"
import { Position } from "./interfaces"

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
			this.bearing = geolib.getRhumbLineBearing(position, lastRoutePoint.position)
			this.distance = geolib.getDistance(position, lastRoutePoint.position)
			this.totalDistance = lastRoutePoint.totalDistance + this.distance
		} else {
			this.id = 0
		}
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
		this.routePoints.push(newRoutePoint)
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

	sortByDistanceTravelled(distance: number): RoutePoint[] {
		return Route.sortByDistanceTravelled(this.routePoints, distance)
	}

	static sortByDistanceTravelled(route: RoutePoint[], distance: number): RoutePoint[] {
		return route.sort((pointA, pointB) => {
			return Math.abs(distance-pointA.totalDistance) - Math.abs(distance-pointB.totalDistance)
		})
	}

	// getNearestRoutePoint(lastFrame: Frame): RoutePoint {
	// 	// Sort the route to nearest points
	// 	const sortedBynearest = Route.sortByDistanceFromPosition(this.routePoints, lastFrame.position)

	// 	// To prevent skipping ahead in the route, we sort again, this time
	// 	// 		we compare the actual total distance travelled to the route distance travelled.
	// 	// 		Whatever point has the lowest delta is our current route point.
	// 	const sortedByDistanceTravelled = Route.sortByDistanceTravelled(sortedBynearest, lastFrame.totalDistanceTravelled)

	// 	return sortedByDistanceTravelled[0]
	// }

	static distanceToRoutePoint(routePoint: RoutePoint, position: Position): number {
		return geolib.getDistance(routePoint.position, position)
	}
}

// // 3. The two closest points should form the line we are currently on
// const expectedPath = [
// 	sortedByDistanceTravelled[0].position,
// 	sortedByDistanceTravelled[1].position
// ]

// // 4. Now we get the minimum distance from that line, that's one side of our
// // 		triangle
// const distanceFromRouteLine = geolib.getDistanceFromLine(lastFrame.position, expectedPath[0].position, expectedPath[1].position)

// // 5. Now get the actual distance to the closest route point
// const distanceToClosestPoint = geolib.getDistance(lastFrame.position, sortedByDistanceTravelled[0].position)

// // 6. Use pythagoras to get distance from the closest route point
// const distanceFromClosestPointOnRoute = Math.sqrt(distanceFromRouteLine^2 - distanceToClosestPoint^2)

// // 7. Get the bearing on our line
// const bearing = geolib.getRhumbLineBearing(expectedPath[0], expectedPath[1])

// // 8. Now get the final position
// return geolib.computeDestinationPoint(expectedPath[0], distanceFromClosestPointOnRoute, bearing)