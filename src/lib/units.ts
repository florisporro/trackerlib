import { Speed, Distance } from "./interfaces"

export function getSpeed(speed: Speed, targetUnit:string) {
	// Convert speed to meters per second
	let mps:number
	if (speed.unit === "m/s") {
		mps = speed.value
	} else if (speed.unit === "km/h") {
		mps = speed.value / 3.6
	} else if (speed.unit === "m/h") {
		mps = speed.value / 2.237
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
	} else {
		throw new Error("Invalid target speed unit")
	}
}