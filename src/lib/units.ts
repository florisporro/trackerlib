/**
 * Position class. Holds a position in latitude and longitude, and optionally altitude.
 *
 * @export
 * @class Position
 */
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

/**
 * Speed class. Give it a speed and a unit, and it will convert it to other speed units.
 * 
 * Units default to meters per second.
 *
 * @export
 * @class Speed
 */
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

	/**
	 * Returns the speed in meters per second.
	 *
	 * @readonly
	 * @memberof Speed
	 */
	get mps() {
		return this.speed
	}

	/**
	 * Returns the speed in kilometers per hour.
	 *
	 * @readonly
	 * @memberof Speed
	 */
	get kmh() {
		return this.speed * 3.6
	}

	/**
	 * Returns the speed in miles per hour.
	 *
	 * @readonly
	 * @memberof Speed
	 */
	get mph() {
		return this.speed * 2.237
	}

	/**
	 * Returns the speed in knots.
	 *
	 * @readonly
	 * @memberof Speed
	 */
	get kts() {
		return this.speed * 1.944
	}
}

/**
 * Distance class. Give it a distance and a unit, and it will convert it to other distance units.
 * 
 * Units default to meters.
 *
 * @export
 * @class Distance
 */
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

	/**
	 * Returns the distance in meters.
	 *
	 * @readonly
	 * @memberof Distance
	 */
	get m() {
		return this.distance
	}

	/**
	 * Returns the distance in kilometers.
	 *
	 * @readonly
	 * @memberof Distance
	 */
	get km() {
		return this.distance / 1000
	}

	/**
	 * Returns the distance in miles.
	 *
	 * @readonly
	 * @memberof Distance
	 */
	get mi() {
		return this.distance / 1609.344
	}

	/**
	 * Returns the distance in nautical miles.
	 *
	 * @readonly
	 * @memberof Distance
	 */
	get nm() {
		return this.distance / 1852
	}
}
