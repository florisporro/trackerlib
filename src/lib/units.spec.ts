import { convertSpeed } from "./units";

import { expect } from "chai";
import "mocha";

describe("Units", () => {
	it("Converts from m/s to m/s", () => {
		expect(convertSpeed({ value: 10, unit: "m/s" }, "m/s")).to.equal(10);
	})
	it("Converts from m/s to km/h", () => {
		expect(convertSpeed({ value: 10, unit: "m/s" }, "km/h")).to.equal(10 * 3.6);
	})
	it("Converts from m/s to m/h", () => {
		expect(convertSpeed({ value: 10, unit: "m/s" }, "m/h")).to.equal(10 * 2.237);
	})
	it("Converts from km/h to m/s", () => {
		expect(convertSpeed({ value: 10, unit: "km/h" }, "m/s")).to.equal(10/3.6);
	})
	it("Converts from m/h to m/s", () => {
		expect(convertSpeed({ value: 10, unit: "m/h" }, "m/s")).to.equal(10/2.237);
	})
})