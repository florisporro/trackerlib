export function lowpassfilter(values: number[], alpha: number) {
	let value = values[0];
	for (let i = 1; i < values.length; i++){
			const currentValue = values[i];
			value += (currentValue - value) * alpha;
			values[i] = value;
	}
	return values;
}