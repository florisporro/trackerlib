import { expect } from "chai";
import "mocha";

import * as geolib from "geolib";

import { scramblePosition, calcDistance, getCurrentGeodesicPosition } from "./position";

describe("Position", () => {
	it("scramble position by the right amount", () => {
		const position = {
			latitude: 50.0,
			longitude: -15.0,
		};
		const distance = 50;

		const scrambledPosition = scramblePosition(position, distance);

		const distanceTravelled = geolib.getDistance(position, scrambledPosition);

		expect(distanceTravelled).to.equal(distance);
	});

	it("should calculate distance", () => {
		// 60 kph
		const speed = 60

		// 6 seconds
		const time = 6000	

		const distance = calcDistance(speed, time)

		expect(distance).to.equal(100)
	})

	it ("should calculate the current geodesic position", () => {
		const lastFrame = {
			position: {
				latitude: 0.000,
				longitude: 0.000
			},
			lastFrameTime: "",
			altitude: 0,
			speed: 100,
			bearing: 0,
			frameno: 0,
			frameDuration: 1000,
			distance: 0,
			totalDistanceTravelled: 0
		}

		expect(getCurrentGeodesicPosition(lastFrame, 6000).latitude).to.equal(0.0014988693431978845)
		expect(getCurrentGeodesicPosition(lastFrame, 6000).longitude).to.equal(0.000)
	})
});
