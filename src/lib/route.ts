import * as geolib from "geolib"
import { Position, Frame, Route } from "./interfaces"

export function getCurrentRoutePosition(lastFrame: Frame, time: number, route: Route): Position {
	// 1. Sort the route to nearest points
	const sortedRoute = route.points.sort((pointA, pointB) => {
		const distanceA = geolib.getDistance(pointA.position, lastFrame.position)
		const distanceB = geolib.getDistance(pointB.position, lastFrame.position)

		if (distanceA < distanceB) {
			return -1
		}
		if (distanceB > distanceA) {
			return 1
		}
		return 0
	})

	// 2. To prevent skipping ahead in the route, we sort again, this time
	// 		we compare the actual total distance travelled to the route distance travelled.
	// 		Whatever point has the lowest delta is our current route point.
	const sortedByDistanceTravelled = sortedRoute.sort((pointA, pointB) => {
		const distanceTravelledDeltaA = pointA.totalDistance - lastFrame.totalDistanceTravelled
		const distanceTravelledDeltaB = pointA.totalDistance - lastFrame.totalDistanceTravelled

		if (distanceTravelledDeltaA < distanceTravelledDeltaB) {
			return -1
		}
		if (distanceTravelledDeltaB > distanceTravelledDeltaA) {
			return 1
		}
		return 0
	})
	
	// 3. The two closest points should form the line we are currently on
	const expectedPath = [
		sortedByDistanceTravelled[0].position,
		sortedByDistanceTravelled[1].position
	]

	// 4. Now we get the minimum distance from that line, that's one side of our
	// 		triangle
	const distanceFromRouteLine = geolib.getDistanceFromLine(lastFrame.position, expectedPath[0].position, expectedPath[1].position)

	// 5. Now get the actual distance to the closest route point
	const distanceToClosestPoint = geolib.getDistance(lastFrame.position, sortedByDistanceTravelled[0].position)

	// 6. Use pythagoras to get distance from the closest route point
	const distanceFromClosestPointOnRoute = Math.sqrt(distanceFromRouteLine^2 - distanceToClosestPoint^2)

	// 7. Get the bearing on our line
	const bearing = geolib.getRhumbLineBearing(expectedPath[0], expectedPath[1])

	// 8. Now get the final position
	return geolib.computeDestinationPoint(expectedPath[0], distanceFromClosestPointOnRoute, bearing)
}