import * as geolib from "geolib";
import { lowpassfilter } from "./filters";
import { Speed, Position, Distance } from "./units";
import { Route } from "./route";

interface NewFrame {
	position: Position,
	altitude?: number,
	positionTimestamp?: number,
	lastFrame?: Frame
}

class Frame {
	readonly frameno: number;
	position: Position;
	frameTimestamp: number;
	positionTimestamp?: number;
	distance?: Distance;
	totalDistance: Distance;

	constructor(newFrame: NewFrame) {
		this.position = new Position(newFrame.position);
		this.frameTimestamp = Date.now();
		this.positionTimestamp = newFrame.positionTimestamp || Date.now();

		if (newFrame.lastFrame) {
			this.frameno = newFrame.lastFrame.frameno + 1 || 0;
			this.distance = new Distance(geolib.getDistance(newFrame.lastFrame.position, this.position));
			this.totalDistance = new Distance(newFrame.lastFrame.totalDistance.m + this.distance.m);
		} else {
			this.frameno = 0;
			this.totalDistance = new Distance(0);
		}
	}

	get timestamp() {
		return this.positionTimestamp || this.frameTimestamp;
	}

	projectPosition(speed: Speed, bearing: number, time: number): Position {
		const elapsed = (time - this.timestamp) / 1000;
		return new Position(geolib.computeDestinationPoint(this.position, speed.mps * elapsed, bearing));
	}

	projectTotalDistance(speed: Speed, time: number): Distance {
		const elapsed = (time - this.timestamp) / 1000;
		return new Distance(this.totalDistance.m + speed.mps * elapsed);
	}
}

export class Tracker {
	name: string;
	type?: string;
	frames: Array<Frame>
	meta?: any;

	constructor(name: string, type?: string, meta?: any) {
		this.name = name;
		this.type = type;
		this.frames = [];
		this.meta = meta;
	}

	record(newFrame: NewFrame) {
		// Check if the new frame is a duplicate, if so, ignore it
		if (this.currentFrame?.positionTimestamp !== undefined) {
			if (this.currentFrame?.positionTimestamp === newFrame?.positionTimestamp) return this.currentFrame
		}

		const frame = new Frame({
			...newFrame,
			lastFrame: this.currentFrame
		})

		this.frames = [...this.frames, frame]

		return this.currentFrame as Frame
	}

	get currentFrame() {
		return this.frames[this.frames.length - 1]
	}

	get lastFrame() {
		return this.frames[this.frames.length - 2]
	}

	get position() {
		return this.currentFrame.position
	}

	get projectedPosition() {
		return this.projectPosition(Date.now())
	}

	calcSpeed(frame1: Frame, frame2: Frame): Speed {
		const speed = geolib.getSpeed({
			...frame1.position,
			time: frame1.positionTimestamp || frame1.frameTimestamp
		},{
			...frame2.position,
			time: frame2.positionTimestamp || frame2.frameTimestamp
		})
		return new Speed(speed)
	}

	get speed(): Speed {
		if (this.frames.length < 2) {
			return new Speed(0)
		}

		return this.calcSpeed(this.lastFrame, this.currentFrame)
	}

	get speeds(): Speed[] {		
		const speeds = this.frames.map((frame, index) => {
			if (index === 0) return new Speed(0)
			return this.calcSpeed(this.frames[index - 1], frame)
		})

		// Skip the first speed, which is always 0
		return speeds.slice(1)
	}

	calcBearing(frame1: Frame, frame2: Frame) {
		return geolib.getRhumbLineBearing(frame1.position, frame2.position)
	}

	get bearing() {
		if (this.frames.length < 2) {
			return 0
		}

		return this.calcBearing(this.lastFrame, this.currentFrame)
	}

	filterSpeed(alpha: number, sampleCount: number): Speed {
		if (sampleCount > this.speeds.length) {
			throw new Error("Sample count is greater than the number speeds calculable")
		}
		const samples = this.speeds.slice(-sampleCount).map(speed => speed.mps)

		const filteredSpeeds = lowpassfilter(samples, alpha)

		return new Speed(filteredSpeeds[filteredSpeeds.length - 1])
	}

	filterBearing(alpha: number, sampleCount: number) {
		const samples = this.frames.slice(-sampleCount)

		const bearings = samples.map((frame, index) => {
			if (index === 0) return 0
			return this.calcBearing(samples[index - 1], frame)
		})

		const filteredBearings = lowpassfilter(bearings, alpha)

		return filteredBearings[filteredBearings.length - 1]
	}

	get timeSinceLastSample() {
		if (this.frames.length < 1) {
			return 0
		}
		const timestamp = this.currentFrame.positionTimestamp || this.currentFrame.frameTimestamp
		return Date.now() - timestamp
	}

	get totalDistanceTravelled() {
		return this.currentFrame.totalDistance
	}

	projectPosition(time: number) {
		if (this.frames.length < 2) {
			return this.currentFrame.position
		}

		return this.currentFrame.projectPosition(this.speed, this.bearing, time)
	}

	projectTotalDistance(time: number) {
		if (this.frames.length < 2) {
			return new Distance(0)
		}

		return this.currentFrame.projectTotalDistance(this.speed, time)
	}

	/**
	 * Get the current projected distance along a given route, irrespective of the distance the tracker has travelled.
	 * This will stop working if the tracker is deviating from the route for whatever reason.
	 *
	 * @param {number} time The time to project to
	 * @param {Route} route The route to project along
	 * @return {*}  {Distance}
	 * @memberof Tracker
	 */
	projectTotalDistanceAlongRouteLine(time: number, route: Route): Distance {
		// Get current nearest position on route line
		const nearestPointOnRouteLine = route.getNearestPointOnRouteLine(this.position)

		// Get current distance along route
		const distanceAlongRoute = route.getDistanceAlongRoute(nearestPointOnRouteLine)

		// Get delta distance
		const deltaDistance = this.totalDistance.m - distanceAlongRoute.m

		// Project total distance
		const projectedTotalDistance = this.projectTotalDistance(time)

		// Subtract the delta
		const adjustedTotalDistance = new Distance(projectedTotalDistance.m - deltaDistance, "m")

		return adjustedTotalDistance
	}

	/**
	 * Projects the current position on the route line.
	 * This will stop working if the tracker is deviating from the route line for whatever reason.
	 *
	 * @param {number} time The time to project to
	 * @param {Route} route The route to project along
	 * @return {*}  {Position}
	 * @memberof Tracker
	 */
	projectPositionOnRouteLine(time: number, route: Route): Position {		
		// Get the projected distance along the route line
		const projectedDistance = this.projectTotalDistanceAlongRouteLine(time, route)
		
		// Get the projected position on the route line
		const projectedPositionOnRoute = route.getRoutePointFromDistance(projectedDistance)

		return projectedPositionOnRoute
	}
}