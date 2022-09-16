import { expect } from "chai";
import "mocha";

import * as geolib from "geolib";

import { Tracker } from "./tracker";

describe("Tracker", () => {
	// let route: Route, start: RoutePoint, point1: RoutePoint, finish: RoutePoint;
	let tracker: Tracker;

	beforeEach(() => {
		tracker = new Tracker(0, "Test Tracker", "Car", {
			team: "Test Team"
		});

		tracker.addFrame({
			position: {
				latitude: 0.0,
				longitude: 25.0
			}
		})

		tracker.addFrame({
			position: {
				latitude: 0.01,
				longitude: 25.0
			},
			positionTimestamp: Date.now() + 60000
		})
	});

	it("creates a new tracker", () => {
		expect(tracker.id).to.equal(0);
		expect(tracker.name).to.equal("Test Tracker");
		expect(tracker.type).to.equal("Car");
		expect(tracker?.meta?.team).to.equal("Test Team");
	})

	it("allows recording of tracker frames", () => {
		expect(tracker.frames.length).to.equal(2)
	})

	it("creates a unique frame number for every new frame", () => {
		expect(tracker.frames[0].frameno).to.equal(0)
		expect(tracker.frames[1].frameno).to.equal(1)
	})

	it("calculates speed given two frames", () => {
		// Distance is roughly 1110m so speed is slightly above
		// 60 kph
		expect(tracker.speed * 3.6).to.be.above(60)
		expect(tracker.speed * 3.6).to.be.below(70)
	})
})