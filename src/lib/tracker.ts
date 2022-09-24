import { Position } from "./interfaces";
import * as geolib from "geolib";
import { lowpassfilter } from "./filters";

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
		this.positionTimestamp = newFrame.positionTimestamp || Date.now();

		if (newFrame.lastFrame) {
			this.frameno = newFrame.lastFrame.frameno + 1 || 0;
			this.distance = geolib.getDistance(newFrame.lastFrame.position, this.position);
			this.totalDistance = newFrame.lastFrame.totalDistance + this.distance;
		} else {
			this.frameno = 0;
			this.totalDistance = 0;
		}
	}

	get timestamp() {
		return this.positionTimestamp || this.frameTimestamp;
	}

	projectPosition(speed: number, bearing: number, time: number) {
		const elapsed = (time - this.timestamp) / 1000;
		return geolib.computeDestinationPoint(this.position, speed * elapsed, bearing);
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

	record(newFrame: NewFrame) {
		// Check if the new frame is a duplicate, if so, ignore it
		if (this.currentFrame?.positionTimestamp !== undefined) {
			if (this.currentFrame?.positionTimestamp === newFrame?.positionTimestamp) return this.currentFrame
		}

		const frame = new Frame({
			...newFrame,
			lastFrame: this.currentFrame
		})

		this.frames.push(frame)

		return this.currentFrame
	}

	get currentFrame() {
		return this.frames[this.frames.length - 1]
	}

	get lastFrame() {
		return this.frames[this.frames.length - 2]
	}

	calcSpeed(frame1: Frame, frame2: Frame) {
		return geolib.getSpeed({
			...frame1.position,
			time: frame1.positionTimestamp || frame1.frameTimestamp
		},{
			...frame2.position,
			time: frame2.positionTimestamp || frame2.frameTimestamp
		})
	}

	get speed() {
		if (this.frames.length < 2) {
			return 0
		}

		return this.calcSpeed(this.lastFrame, this.currentFrame)
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

	filteredSpeed(alpha: number, sampleCount: number) {
		const samples = this.frames.slice(-sampleCount)

		const speeds = samples.map((frame, index) => {
			if (index === 0) return 0
			return this.calcSpeed(samples[index - 1], frame)
		})

		const filteredSpeeds = lowpassfilter(speeds, alpha)

		return filteredSpeeds[filteredSpeeds.length - 1]
	}

	filteredBearing(alpha: number, sampleCount: number) {
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
}