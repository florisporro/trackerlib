import * as geolib from "geolib"
import { Position } from "./interfaces"
import { Tracker } from "./tracker"

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

	getDistance(position: Position): number {
		return geolib.getDistance(this.position, position)
	}

	getBearing(position: Position): number {
		return geolib.getRhumbLineBearing(this.position, position)
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

	getClosestRoutePoint(position: Position): RoutePoint {
		return this.sortByDistanceFromPosition(position)[0]
	}

	static sortByDistanceTravelled(route: RoutePoint[], distance: number): RoutePoint[] {
		return route.sort((pointA, pointB) => {
			return Math.abs(distance-pointA.totalDistance) - Math.abs(distance-pointB.totalDistance)
		})
	}

	sortByDistanceTravelled(distance: number): RoutePoint[] {
		return Route.sortByDistanceTravelled(this.routePoints, distance)
	}

	getRoutePointAtDistance(distance: number): RoutePoint {
		return this.sortByDistanceTravelled(distance)[0]
	}

	getNextRoutePointForTracker(tracker: Tracker): RoutePoint | undefined {
		const currentFrame = tracker.currentFrame
		const lastFrame = tracker.lastFrame

		// For the current and last frame, get the distance to the nearest route point
		const currentFrameClosestRoutePoint = this.getClosestRoutePoint(currentFrame.position)
		const currentFrameDistance = currentFrameClosestRoutePoint.getDistance(currentFrame.position)
		const lastFrameDistance = currentFrameClosestRoutePoint.getDistance(lastFrame.position)
		const currentFrameDistanceTravelled = currentFrameClosestRoutePoint.totalDistance
		const nextRoutePoint = this.routePoints.find(routePoint => routePoint.id === currentFrameClosestRoutePoint.id + 1)

		// If the distance is exactly zero, then we're on the route point and should
		// return the next route poinr
		if (currentFrameDistance === 0) {
			return nextRoutePoint
		}

		// If the current frame is closer to the route point than the last frame, we are approaching the closest route point
		// and should return it as the next route point for our tracker
		if (currentFrameDistance < lastFrameDistance) {
			console.log("Approaching route point")
			return currentFrameClosestRoutePoint
		}

		// If the current frame is further from the route point than the last frame, we are moving away from the route point
		// and should return the next route point ordered by distance travelled
		if (currentFrameDistance > lastFrameDistance) {
			console.log("Moving away from route point")
			return nextRoutePoint
		}

		return currentFrameClosestRoutePoint
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