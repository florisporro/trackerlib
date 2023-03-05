
import { lowpassfilter } from "./filters";

import { describe, it, expect } from 'vitest'

describe("Filters", () => {
	it('returns the same value with alpha set to 1', function() {
		const result = lowpassfilter([10,8,9,10,12,8,50,10,12,8,50], 1);
		expect(result[result.length - 1]).to.equal(50)
	});

	it('returns a smoothed value with alpha set less than 1', function() {
		const result = lowpassfilter([10,10,10,10,10,10,10,10,10,20], 0.2);
		expect(result[result.length - 1]).to.equal(12)
	});
});