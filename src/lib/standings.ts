import * as geolib from "geolib"

import { Tracker, Route, Standing } from "./interfaces"

/**
 * Takes an array of trackers, sorts them by total distance travelled and adds
 * meta information, like distance to next team and time to intercept
 *
 * @export
 * @param {Array<Tracker>} trackers
 */
export function generateStandings(trackers: Array<Tracker>): Array<Standing> {
	// Sort trackers by total distance travelled
	const sortedTrackers = trackers.sort((trackerA, trackerB) => {
		const distanceA = trackerA.frames[0].totalDistanceTravelled
		const distanceB = trackerB.frames[0].totalDistanceTravelled
		if (distanceA < distanceB) {
			return -1
		}
		if (distanceB > distanceA) {
			return 1
		}
		return 0
	})

	const leader = sortedTrackers[0]

	const standings:Array<Standing> = []
	// For every tracker, generate a standings object
	for (const [index, tracker] of sortedTrackers) {
		const standing:Standing = { tracker }

		const { speed, position } = tracker.frames[0].position
		const nextTracker = sortedTrackers[index+1]

		// Calculate distance to next tracker (0 if we are the last tracker)
		if (!nextTracker) {
			standing.distanceToNext = 0
		} else {
			standing.distanceToNext = geolib.getDistance(position, nextTracker.frames[0].position)
		}

		// Calculate distance to leader (0 if this is the leader)
		if (index === 0) {
			standing.distanceToLeader = 0
		} else {
			standing.distanceToLeader = geolib.getDistance(position, leader.frames[0].position)
		}

		// Calculate time to the next tracker (distance / speed)
		

		// Calculate time it will take us to intercept the next tracker


		standings.push(standing)
	}

	return standings
}

// export function generateRouteStandings(trackers: Array<Tracker>, route: Route) {

// }