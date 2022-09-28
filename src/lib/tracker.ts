import { Position, Speed } from "./interfaces";
import * as geolib from "geolib";
import { lowpassfilter } from "./filters";
import { convertSpeed } from "./units";

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

	projectPosition(speed: Speed, bearing: number, time: number): Position {
		const elapsed = (time - this.timestamp) / 1000;
		const convertedSpeed = convertSpeed(speed, "m/s");
		return geolib.computeDestinationPoint(this.position, convertedSpeed * elapsed, bearing);
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

		this.frames.push(frame)

		return this.currentFrame
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
		return {
			value: speed,
			unit: "m/s"
		}
	}

	get speed(): Speed {
		if (this.frames.length < 2) {
			return {
				unit: "m/s",
				value: 0
			}
		}

		return this.calcSpeed(this.lastFrame, this.currentFrame)
	}

	get speeds(): Speed[] {		
		const speeds = this.frames.map((frame, index) => {
			if (index === 0) return { value: 0, unit: "m/s" }
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

	filterSpeed(alpha: number, sampleCount: number) {
		if (sampleCount > this.speeds.length) {
			throw new Error("Sample count is greater than the number speeds calculable")
		}
		const samples = this.speeds.slice(-sampleCount).map(speed => speed.value)

		const filteredSpeeds = lowpassfilter(samples, alpha)

		return filteredSpeeds[filteredSpeeds.length - 1]
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
}