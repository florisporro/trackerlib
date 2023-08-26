import { Speed, Position, Distance } from "./units";
import * as geolib from "geolib";

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
