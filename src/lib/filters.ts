/**
 * Filters an array of values using a low pass filter
 *
 * @export
 * @param {number[]} values - Array of values to filter
 * @param {number} alpha - Alpha value for the filter
 * @return {*}  {number[]} - Filtered array of values
 */
export function lowpassfilter(values: number[], alpha: number): number[] {
	let value = values[0];
	for (let i = 1; i < values.length; i++){
			const currentValue = values[i];
			value += (currentValue - value) * alpha;
			values[i] = value;
	}
	return values;
}