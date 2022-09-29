import { Speed } from "./interfaces"

export function convertSpeed(speed: Speed, targetUnit:string) {
	// Convert speed to meters per second
	let mps:number
	if (speed.unit === "m/s") {
		mps = speed.value
	} else if (speed.unit === "km/h") {
		mps = speed.value / 3.6
	} else if (speed.unit === "m/h") {
		mps = speed.value / 2.237
	} else if (speed.unit === "kts") {
		mps = speed.value / 1.944
	} else {
		throw new Error("Invalid speed unit")
	}

	// Convert to target unit
	if (targetUnit === "m/s") {
		return mps
	} else if (targetUnit === "km/h") {
		return mps * 3.6
	} else if (targetUnit === "m/h") {
		return mps * 2.237
	} else if (targetUnit === "kts") {
		return mps * 1.944
	} else {
		throw new Error("Invalid target speed unit")
	}
}

export function convertDistance(distance: number, targetUnit: string) {
	if (targetUnit === "m") {
		return distance
	} else if (targetUnit === "km") {
		return distance / 1000
	} else if (targetUnit === "mi") {
		return distance / 1609.344
	} else if (targetUnit === "nm") {
		return distance / 1852
	} else {
		throw new Error("Invalid target distance unit")
	}
}