import { Speed } from "./units";

import { describe, it, expect } from 'vitest'

describe("Units", () => {
	it("Converts from m/s to m/s", () => {
		expect(new Speed(10, "m/s")).to.equal(10);
	})
	it("Converts from m/s to km/h", () => {
		expect(new Speed(10, "m/s").kmh).to.equal(10 * 3.6);
	})
	it("Converts from m/s to m/h", () => {
		expect(new Speed(10, "m/s").mph).to.equal(10 * 2.237);
	})
	it("Converts from km/h to m/s", () => {
		expect(new Speed(10, "km/h").mps).to.equal(10/3.6);
	})
	it("Converts from m/h to m/s", () => {
		expect(new Speed(10, "m/h").mps).to.equal(10/2.237);
	})
})