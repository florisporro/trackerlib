import { Tracker } from "./tracker"

// A tracker list is a collection of trackers
// It is used to group trackers together and provides various functions to sort them.
// It can also be used to calculate relative values such as the distance between trackers,
// the time to reach another tracker, etc.
class TrackerList {
	constructor(public name: string, public trackers: Tracker[]) {}

	addTracker(tracker: Tracker) {
		this.trackers = [...this.trackers, tracker]
	}

	removeTracker(name: string) {
		this.trackers = this.trackers.filter((tracker) => tracker.name !== name)
	}

	sortByTotalDistanceTravelled() {
		return this.trackers = this.trackers.sort((a, b) => {
			const aDistance = a.currentFrame.totalDistance.m
			const bDistance = b.currentFrame.totalDistance.m
			return bDistance - aDistance
		})
	}

	sortByProjectedDistaceTravelled(time: number) {
		return this.trackers = this.trackers.sort((a, b) => {
			const aDistance = a.projectTotalDistance(time).m
			const bDistance = b.projectTotalDistance(time).m
			return bDistance - aDistance
		})
	}

	// sortByProjectedDistanceTravelledAlongRoute() {}
}
