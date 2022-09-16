
import { lowpassfilter } from "./filters";

import { expect } from "chai";
import "mocha";

describe("Filters", () => {
	it('returns the same value with alpha set to 1', function() {
		const result = lowpassfilter([10,8,9,10,12,8,50,10,12,8,50], 1);
		expect(result[result.length - 1]).to.equal(50)
	});

	it('should return smoothed value', function() {
		const result = lowpassfilter([10,10,10,10,10,10,10,10,10,20], 0.2);
		expect(result[result.length - 1]).to.equal(12)
	});
});