import { Position } from "./interfaces";
import * as geolib from "geolib";

interface NewFrame {
	position: Position,
	altitude?: number,
	positionTimestamp?: number,
	lastFrame?: Frame
}

class Frame {
	readonly frameno: number;
	position: Position;
	altitude: number;
	frameTimestamp: number;
	positionTimestamp?: number;
	distance?: number;
	totalDistance: number;

	constructor(newFrame: NewFrame) {
		this.position = newFrame.position;
		this.altitude = newFrame.altitude || 0;
		this.frameTimestamp = Date.now();
		this.positionTimestamp = newFrame.positionTimestamp;

		if (newFrame.lastFrame) {
			this.frameno = newFrame.lastFrame.frameno + 1 || 0;
			this.distance = geolib.getDistance(newFrame.lastFrame.position, this.position);
			this.totalDistance = newFrame.lastFrame.totalDistance + this.distance;
		} else {
			this.frameno = 0;
			this.totalDistance = 0;
		}
	}
}

export class Tracker {
	name: string;
	id: number;
	type?: string;
	frames: Array<Frame>
	meta?: any;

	constructor(id: number, name: string, type?: string, meta?: any) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.frames = [];
		this.meta = meta;
	}

	addFrame(newFrame: NewFrame) {
		const frame = new Frame({
			...newFrame,
			lastFrame: this.currentFrame
		})
		this.frames.push(frame)
	}

	get currentFrame() {
		return this.frames[this.frames.length - 1]
	}

	get lastFrame() {
		return this.frames[this.frames.length - 2]
	}

	get speed() {
		if (this.frames.length < 2) {
			return 0
		}
		
		return geolib.getSpeed({
			...this.lastFrame.position,
			time: this.lastFrame.positionTimestamp || this.lastFrame.frameTimestamp
		},{
			...this.currentFrame.position,
			time: this.currentFrame.positionTimestamp || this.currentFrame.frameTimestamp
		})
	}
	get bearing() {
		if (this.frames.length < 2) {
			return 0
		}
		return geolib.getRhumbLineBearing(this.lastFrame.position, this.currentFrame.position)
	}

	getInterpolatedPosition() {}
	getTotalDistanceTravelled() {}
}