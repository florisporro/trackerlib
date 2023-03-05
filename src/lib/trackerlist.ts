import { Tracker } from "./tracker"

// A tracker list is a collection of trackers
// It is used to group trackers together and provides various functions to sort them.
// It can also be used to calculate relative values such as the distance between trackers,
// the time to reach another tracker, etc.
class TrackerList {
	name: string
	trackers: Tracker[]

	constructor(name: string, trackers: Tracker[]) {
		this.name = name
		this.trackers = []
	}

	addTracker(tracker: Tracker) {
		this.trackers = [...this.trackers, tracker]
	}

	removeTracker(name: string) {
		this.trackers = this.trackers.filter((tracker) => tracker.name !== name)
	}

	sortByTotalDistanceTravelled() {
		return this.trackers = this.trackers.sort((a, b) => {
			const aDistance = a.frames[a.frames.length - 1].totalDistance
			const bDistance = b.frames[b.frames.length - 1].totalDistance
			return bDistance - aDistance
		})
	}

	// sortByProjectedDistaceTravelled(time: number) {
	// 	return this.trackers = this.trackers.sort((a, b) => {
	// 		const aDistance = a.projectPosition(time)
	// 		const bDistance = b.projectPosition(time)
	// 		return bDistance - aDistance
	// 	})
	// }

	// sortByProjectedDistanceTravelledAlongRoute() {}
}
