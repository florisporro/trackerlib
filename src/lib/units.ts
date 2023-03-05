export class Position {
	longitude: number;
	latitude: number;
	altitude?: number;

	constructor({ latitude, longitude, altitude }: Position) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.altitude = altitude;
	}
}

export class Speed {
	speed: number;

	constructor(value: number, unit: string = "m/s") {
		if (unit === "m/s") {
			this.speed = value
		} else if (unit === "km/h") {
			this.speed = value / 3.6
		} else if (unit === "m/h") {
			this.speed = value / 2.237
		} else if (unit === "kts") {
			this.speed = value / 1.944
		} else {
			throw new Error("Invalid speed unit")
		}
	}

	get mps() {
		return this.speed
	}

	get kmh() {
		return this.speed * 3.6
	}

	get mph() {
		return this.speed * 2.237
	}

	get kts() {
		return this.speed * 1.944
	}
}

export class Distance {
	distance: number;

	constructor(public value: number, public unit: string = "m") {
		if (unit === "m") {
			this.distance = value
		} else if (unit === "km") {
			this.distance = value * 1000
		} else if (unit === "mi") {
			this.distance = value * 1609.344
		} else if (unit === "nm") {
			this.distance = value * 1852
		} else {
			throw new Error("Invalid distance unit")
		}
	}

	get m() {
		return this.distance
	}

	get km() {
		return this.distance / 1000
	}

	get mi() {
		return this.distance / 1609.344
	}

	get nm() {
		return this.distance / 1852
	}
}
