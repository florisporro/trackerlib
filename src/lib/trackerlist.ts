import { Tracker } from "./tracker"
import { Route } from "./route"
import { Distance } from "./units"

/**
 * A tracker list is a collection of trackers
 * It is used to group trackers together and provides various functions to sort them.
 * It can also be used to calculate relative values such as the distance between trackers,
 * the time to reach another tracker, etc.
 *
 * @class TrackerList
 */
export class TrackerList {
	constructor(public name: string, public trackers: Tracker[]) {}

	/**
	 * Add a tracker to the list
	 *
	 * @param {Tracker} tracker
	 * @memberof TrackerList
	 */
	addTracker(tracker: Tracker) {
		this.trackers = [...this.trackers, tracker]
	}

	/**
	 * Returns a new array of the distances that all trackers have travelled.
	 *
	 * @return {Distance[]}
	 * @memberof TrackerList
	 */
	getTotalDistancesTravelled(): Distance[] {
		return this.trackers.map(t => t.totalDistance)
	}

	/**
	 * Sorts the trackers in the list by the total distance each has travelled (since tracking began). Returns a copy.
	 *
	 * @return {Tracker[]} 
	 * @memberof TrackerList
	 */
	sortByTotalDistanceTravelled(): Tracker[] {
		return this.trackers = [ ...this.trackers ].sort((a, b) => {
			if (!a.currentFrame || !b.currentFrame) return 0
			const aDistance = a.currentFrame.totalDistance.m
			const bDistance = b.currentFrame.totalDistance.m
			return bDistance - aDistance
		})
	}

	/**
	 * Returns a new array of the distances that all trackers are projected to have travelled, based on an elapsed time.
	 *
	 * @param {number} time
	 * @return {Distance[]}
	 * @memberof TrackerList
	 */
	getProjectedDistancesTravelled(time: number): Distance[] {
		return this.trackers.map(t => t.projectTotalDistance(time))
	}

	/**
	 * Sorts the trackers in the list by the total distance they are projected to have travelled (since tracking began). Returns a copy.
	 *
	 * @param {number} time
	 * @return {Tracker[]} 
	 * @memberof TrackerList
	 */
	sortByProjectedDistaceTravelled(time: number): Tracker[] {
		return this.trackers = [ ...this.trackers ].sort((a, b) => {
			const aDistance = a.projectTotalDistance(time).m
			const bDistance = b.projectTotalDistance(time).m
			return bDistance - aDistance
		})
	}

	/**
	 * Returns a new array of the distances that all trackers are projected to have travelled, based on an elapsed time, along a given route.
	 *
	 * @param {number} time
	 * @param {Route} route
	 * @return {Distance[]}
	 * @memberof TrackerList
	 */
	getProjectedDistancesTravelledAlongRoute(time: number, route: Route): Distance[] {
		return this.trackers.map(t => t.projectTotalDistanceAlongRouteLine(time, route))
	}

	/**
	 * Sorts the trackers in the list by the total distance they are projected to have travelled (since tracking began) along a given route. Returns a copy.
	 *
	 * @param {number} time The time to project the distance to
	 * @param {Route} route The route to calculate the projected distance over
	 * @return {*} 
	 * @memberof TrackerList
	 */
	sortByProjectedDistanceTravelledAlongRoute(time: number, route: Route) {
		return this.trackers = [ ...this.trackers ].sort((a, b) => {
			const aDistance = a.projectTotalDistanceAlongRouteLine(time, route).m
			const bDistance = b.projectTotalDistanceAlongRouteLine(time, route).m
			return bDistance - aDistance
		})
	}
}
