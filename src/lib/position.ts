import * as geolib from "geolib"

import { Position, Frame } from "./interfaces"

/**
 * Calculates distance in meters travelled with a given speed (in kph) and time (milliseconds)
 *
 * @export
 * @param {number} speed
 * @param {number} time
 * @returns {number}
 */
export function calcDistance(speed: number, time: number): number {
	const speedMs = speed * (1000 / 3600);
	const distance = (time / 1000) * speedMs;

	return distance;
};

/**
 * Returns the current interpolated position based on the last frame data and a time (in ms)
 *
 * @export
 * @param {Frame} lastFrame
 * @param {number} time
 * @returns {Position}
 */
export function getCurrentGeodesicPosition(lastFrame: Frame, time: number): Position {
	const distance = calcDistance(lastFrame.speed, time)

	return geolib.computeDestinationPoint(
		lastFrame.position,
		distance,
		lastFrame.bearing
	);
}

/**
 * Scrambles the current position by x meters in a random direction (simulates GPS accuraccy)
 *
 * @export
 * @param {Position} position
 * @param {number} meters
 * @returns {Position}
 */
export function scramblePosition(position: Position, meters: number): Position {
	const bearing = Math.random() * 360;
	const distance = Math.random() * meters;

	return geolib.computeDestinationPoint(position, distance, bearing);
};