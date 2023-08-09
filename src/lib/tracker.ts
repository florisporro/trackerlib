import * as geolib from "geolib";
import { lowpassfilter } from "./filters";
import { Speed, Position, Distance } from "./units";
import { Route } from "./route";
import {
	list,
	object,
	identifier,
	raw,
	serialize,
	deserialize,
	serializable,
} from "serializr";

/**
 * A frame is a snapshot of a position at a given time.
 * 
 * If a lastFrame is included in the constructor, the frame will calculate the distance travelled since the last frame.
 * Additionally, the frame will then receive a frameno, which is the frameno of the last frame + 1.
 * If frames are recorded using the Tracker.record function, this will be done automatically.
 *
 * @export
 * @class Frame
 */
export class Frame {
	@serializable(identifier())
	readonly frameno: number;
	
	@serializable(object(Position))
	position: Position;

	@serializable
	frameTimestamp: number;
	
	@serializable
	positionTimestamp?: number;
	
	@serializable(object(Distance))
	distance?: Distance;
	
	@serializable(object(Distance))
	totalDistance: Distance;

	constructor(position: Position, positionTimestamp?: number, lastFrame?: Frame) {
		this.position = position;
		this.frameTimestamp = Date.now();
		this.positionTimestamp = positionTimestamp || Date.now();

		if (lastFrame) {
			this.frameno = lastFrame.frameno + 1 || 0;
			this.distance = new Distance(geolib.getDistance(lastFrame.position, this.position));
			this.totalDistance = new Distance(lastFrame.totalDistance.m + this.distance.m);
		} else {
			this.frameno = 0;
			this.totalDistance = new Distance(0);
		}
	}

	get timestamp() {
		return this.positionTimestamp || this.frameTimestamp;
	}

	/**
	 * Project the current frame out to a new position, based on a speed, bearing and time.
	 *
	 * @param {Speed} speed
	 * @param {number} bearing
	 * @param {number} time
	 * @return {Position}
	 * @memberof Frame
	 */
	projectPosition(speed: Speed, bearing: number, time: number): Position {
		const elapsed = (time - this.timestamp) / 1000;
		const destination = geolib.computeDestinationPoint(this.position, speed.mps * elapsed, bearing)
		return new Position(destination.latitude, destination.longitude);
	}

	/**
	 * Project the new total distance travelled based on a speed and time.
	 *
	 * @param {Speed} speed
	 * @param {number} time
	 * @return {*}  {Distance}
	 * @memberof Frame
	 */
	projectTotalDistance(speed: Speed, time: number): Distance {
		const elapsed = (time - this.timestamp) / 1000;
		return new Distance(this.totalDistance.m + speed.mps * elapsed);
	}
}

/**
 * The Tracker class. A Tracker is a moving object that is tracked, like a car, boat, airplane etc.
 * A tracker has many frames. A frame is a snapshot of a position at a given time. Using this history, many calculations can be made.
 * For example, the speed, bearing, distance travelled, projected position etc.
 * The class also offers functions for calculations along a route.
 * 
 * You can initialize the class with a name, type and other meta data. These are all optional.
 *
 * @export
 * @class Tracker
 */
export class Tracker {
	@serializable(identifier())
	name: string;
	
	@serializable
	type?: string;
	
	@serializable(list(object(Frame)))
	frames: Array<Frame>

	@serializable(raw())
	meta?: any;

	constructor(name: string, type?: string, meta?: any) {
		this.name = name;
		this.type = type;
		this.frames = [];
		this.meta = meta;
	}

	/**
	 * Record a new frame for the tracker
	 *
	 * @param {NewFrame} newFrame
	 * @return {*} 
	 * @memberof Tracker
	 */
	record(position: Position, positionTimestamp?: number): Frame {
		// Check if the new frame is a duplicate, if so, ignore it
		if (this.currentFrame?.positionTimestamp !== undefined) {
			if (this.currentFrame?.positionTimestamp === positionTimestamp) return this.currentFrame
		}

		const frame = new Frame(position,
			positionTimestamp,
			this.currentFrame
		)

		this.frames = [...this.frames, frame]

		return this.currentFrame as Frame
	}

	/**
	 * Gets the current tracker frame
	 *
	 * @readonly
	 * @type {(Frame | undefined)}
	 * @memberof Tracker
	 */
	get currentFrame(): Frame | undefined {
		return this.frames[this.frames.length - 1]
	}

	/**
	 * The frame recorded just prior to the current frame
	 *
	 * @readonly
	 * @memberof Tracker
	 */
	get lastFrame(): Frame | undefined {
		return this.frames[this.frames.length - 2]
	}

	/**
	 * The last recorded tracker position
	 *
	 * @readonly
	 * @memberof Tracker
	 */
	get position() {
		return this.currentFrame?.position
	}

	/**
	 * Get the projected position of the tracker using Date.now()
	 *
	 * @readonly
	 * @memberof Tracker
	 */
	get projectedPosition() {
		return this.projectPosition(Date.now())
	}

	/**
	 * Calculate the speed between any two tracker frames
	 *
	 * @static
	 * @param {Frame} frame1
	 * @param {Frame} frame2
	 * @return {Speed}
	 * @memberof Tracker
	 */
	static calcSpeed(frame1: Frame, frame2: Frame): Speed {
		const speed = geolib.getSpeed({
			...frame1.position,
			time: frame1.positionTimestamp || frame1.frameTimestamp
		},{
			...frame2.position,
			time: frame2.positionTimestamp || frame2.frameTimestamp
		})
		return new Speed(speed)
	}

	/**
	 * Get the current speed of the tracker
	 *
	 * @readonly
	 * @type {Speed}
	 * @memberof Tracker
	 */
	get speed(): Speed {
		if (this.frames.length < 2) {
			return new Speed(0)
		}

		return Tracker.calcSpeed(this.lastFrame as Frame, this.currentFrame as Frame)
	}

	/**
	 * Get the historic tracker speeds
	 *
	 * @readonly
	 * @type {Speed[]}
	 * @memberof Tracker
	 */
	get speeds(): Speed[] {		
		const speeds = this.frames.map((frame, index) => {
			if (index === 0) return new Speed(0)
			return Tracker.calcSpeed(this.frames[index - 1], frame)
		})

		// Skip the first speed, which is always 0
		return speeds.slice(1)
	}

	
	/**
	 * Calculate the bearing between any two tracker frames
	 *
	 * @static
	 * @param {Frame} frame1
	 * @param {Frame} frame2
	 * @return {*} 
	 * @memberof Tracker
	 */
	static calcBearing(frame1: Frame, frame2: Frame) {
		return geolib.getRhumbLineBearing(frame1.position, frame2.position)
	}

	/**
	 * Get the current bearing of the tracker
	 *
	 * @readonly
	 * @memberof Tracker
	 */
	get bearing(): number {
		if (this.frames.length < 2) {
			return 0
		}

		return Tracker.calcBearing(this.lastFrame as Frame, this.currentFrame as Frame)
	}

	/**
	 * Filter the speed using a low pass filter.
	 *
	 * @param {number} alpha The alpha value for the filter
	 * @param {number} sampleCount The number of samples to use for the filter
	 * @return {Speed}
	 * @memberof Tracker
	 */
	filterSpeed(alpha: number, sampleCount: number): Speed {
		if (sampleCount > this.speeds.length) {
			throw new Error("Sample count is greater than the number speeds calculable")
		}
		const samples = this.speeds.slice(-sampleCount).map(speed => speed.mps)

		const filteredSpeeds = lowpassfilter(samples, alpha)

		return new Speed(filteredSpeeds[filteredSpeeds.length - 1])
	}

	/**
	 * Filter the bearing using a low pass filter.
	 *
	 * @param {number} alpha The alpha value for the filter
	 * @param {number} sampleCount The number of samples to use for the filter
	 * @return {number}
	 * @memberof Tracker
	 */
	filterBearing(alpha: number, sampleCount: number): number {
		const samples = this.frames.slice(-sampleCount)

		const bearings = samples.map((frame, index) => {
			if (index === 0) return 0
			return Tracker.calcBearing(samples[index - 1], frame)
		})

		const filteredBearings = lowpassfilter(bearings, alpha)

		return filteredBearings[filteredBearings.length - 1]
	}

	/**
	 * The time since the last sample was taken.
	 *
	 * @readonly
	 * @memberof Tracker
	 */
	get timeSinceLastSample() {
		if (this.frames.length < 1) {
			return 0
		}
		const timestamp = (this.currentFrame as Frame).positionTimestamp || (this.currentFrame as Frame).frameTimestamp
		return Date.now() - timestamp
	}

	/**
	 *	Total distance travelled by the tracker.
	 *
	 * @readonly
	 * @type {Distance}
	 * @memberof Tracker
	 */
	get totalDistance(): Distance {
		if (this.frames.length < 1) {
			return new Distance(0, "m")
		}
		return (this.currentFrame as Frame).totalDistance
	}

	/**
	 * * Project the current position of the tracker based on the last known position, speed and bearing.
	 *
	 * @param {number} time
	 * @return {Position}
	 * @memberof Tracker
	 */
	projectPosition(time: number): Position | undefined {
		if (this.frames.length < 2) {
			return this.currentFrame?.position
		}

		return (this.currentFrame as Frame).projectPosition(this.speed, this.bearing, time)
	}

	/**
	 * Projects the total distance travelled by the tracker.
	 *
	 * @param {number} time
	 * @return {Distance}
	 * @memberof Tracker
	 */
	projectTotalDistance(time: number): Distance {
		if (this.frames.length < 2) {
			return new Distance(0)
		}

		return (this.currentFrame as Frame).projectTotalDistance(this.speed, time)
	}

	/**
	 * Get the current projected distance along a given route, irrespective of the distance the tracker has travelled.
	 * This will stop working if the tracker is deviating from the route for whatever reason.
	 *
	 * @param {number} time The time to project to
	 * @param {Route} route The route to project along
	 * @return {Distance}
	 * @memberof Tracker
	 */
	projectTotalDistanceAlongRouteLine(time: number, route: Route): Distance {
		if (this.frames.length < 2) {
			return new Distance(0)
		}

		// Get current nearest position on route line
		const nearestPointOnRouteLine = route.getNearestPointOnRouteLine(this.position as Position)

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
	 * @return {Position}
	 * @memberof Tracker
	 */
	projectPositionOnRouteLine(time: number, route: Route): Position {		
		// Get the projected distance along the route line
		const projectedDistance = this.projectTotalDistanceAlongRouteLine(time, route)
		
		// Get the projected position on the route line
		const projectedPositionOnRoute = route.getRoutePointFromDistance(projectedDistance)

		return projectedPositionOnRoute
	}

	/**
	 * Serialize the tracker to a stringifyable object
	 *
	 * @return {*} 
	 * @memberof Tracker
	 */
	serialize() {
		return serialize(this);
	}

	/**
	 * Deserialize a tracker from a stringifyable object
	 *
	 * @static
	 * @param {{}} serializedTracker
	 * @return {*} 
	 * @memberof Tracker
	 */
	static deserialize(serializedTracker: {}) {
		return deserialize(Tracker, serializedTracker);
	}

}