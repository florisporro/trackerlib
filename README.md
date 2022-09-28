# trackerlib - package for the realtime processing of GPS data

## Introduction

This package helps in the realtime processing of GPS data from one or more trackers. It helps in the calculation of speed, distance travelled, bearing etc. There are also functions to apply smoothing (in the form of a lowpass filter) to the output of speed data.

Additionally this package helps in the calculation of route data, like finding the nearest point on a series of waypoints from the position of a tracker.

Based heavily on [manuelbieh](https://github.com/manuelbieh)/[geolib](https://github.com/manuelbieh/geolib).

## Features

### Tracker / GPS processing

- Process GPS data into speed, bearing, distance travelled
- Apply smoothing filter to the calculated speed and bearing
- Project the current position of a tracker based on time elapsed, last position and bearing

### Route helpers

- Create a route from a series of route points (waypoints)
- Calculate the total distance of the route
- Sort route points by distance from a position
- Sort route points by distance travelled
- Find the closest route segment (two route points) to a position
- Find the nearest point on a route segment to a position off the route path
- Calculate the distance travelled from the beginning of the route to a position off the route path

## Install

Install with [npm](https://www.npmjs.com/):

```bash
npm install trackerlib
```

## Usage

### Tracker

#### `new Tracker(name: string, type?: string, meta?: any)`

To get started, initialize a tracker and record a few positions:

```js
import { Tracker } from "trackerlib";

// Create a new tracker. You can pass any metadata you like.
tracker = new Tracker("Test Tracker", "Car", {
	team: "Test Team",
	anyData: "that you like",
});
```

#### `tracker.record(newFrame)`

With the tracker created, record some frames on it:

```js
// Record our first position, set the timestamp to be 2 minutes (120000ms) in the past
tracker.record({
	position: {
		latitude: 0.0,
		longitude: 25.0,
	},
	positionTimestamp: Date.now() - 120000,
});

// Record another position, set the timestamp to be 60 seconds in the past
tracker.record({
	position: {
		latitude: 0.01,
		longitude: 25.0,
	},
	positionTimestamp: Date.now() - 60000,
});
```

The options available are:

```js
{
	// Position, should be obvious
	position: { latitude, longitude },
	// The positionTimestamp can be optionally provided, and can be used when the GPS data comes with its own timestamp. When provided, the positionTimestamp is used for all calculations that require a time parameter, like speed.
	positionTimestamp: number,
	// Not currently in use, but reserved for future calculations
  altitude: number
}
```

The tracker now tracks and calculates a bunch of values for us.

#### `tracker.frames`

A frame is a peice of recorded GPS data for a tracker. This array contains all recorded frames.

#### `tracker.currentFrame`

Returns the last frame recorded.

```js
Frame {
	// 
  position: { latitude: 0.01, longitude: 25 },
	// Not currently in use, but reserved for future calculations
  altitude: 0,
	// The frameTimestamp is automatically recorded with Date.now()
  frameTimestamp: 1664392994440,
	// The GPS timestamp as previously discussed
  positionTimestamp: 1664393054440,
	// A sequential frame number, automatically incremented
  frameno: 1,
	// The distance since the last recorded frame
  distance: 1113,
	// The total distance of all frames until this one
  totalDistance: 1113
}
```

#### `tracker.lastFrame`

Returns the second to last frame recorded.

```js
Frame {
  position: { latitude: 0, longitude: 25 },
  altitude: 0,
  frameTimestamp: 1664393031599,
  positionTimestamp: 1664393031599,
  frameno: 0,
  totalDistance: 0
}
```

#### `tracker.position`

Returns the current tracker position. This is the same as doing `tracker.frames[0].position`.

```js
{ latitude: 0.01, longitude: 25 }
```

#### `tracker.speed`

Returns a speed object. This can be converted to a measurement of your choice using the convertSpeed helper function.

```js
{ value: 18.55, unit: 'm/s' }
```

#### `tracker.totalDistanceTravelled`

Returns the total amount of distance travelled (in meters) since we started recording positions on this tracker.

```js
1113
```

#### `tracker.bearing`

Returns the bearing in degrees.

```js
0 // Exactly north
```

#### `tracker.speeds`

In order to make a speed calculation, we need at least 2 frames. That means if we have 10 frames, 9 speed calculations can be made. One for each frame minus the first.

This getter returns an array of all calculated speeds that can be made on the tracker. In this case, since in this example only two positions have been recorded, it returns an array with only one speed object.

```js
[
	{ value: 18.55, unit: 'm/s' }
]
```

#### `tracker.timeSinceLastSample`

Returns the time elapsed since the last recorded frame. Returns the frame `positionTimestamp` if it is set, otherwise returns the `frameTimestamp`.

#### `tracker.projectedPosition`

Returns the current estimated position, based on the current system time, the last speed and bearing of our tracker.

```js
{ latitude: 0.020009449473875476, longitude: 25 }
```

#### `tracker.calcSpeed(frame1: Frame, frame2: Frame)`

Calculates speed from two provided tracker frames.

```js
// As an example, this:
tracker.speed

// Is the same as doing:
tracker.calcSpeed(tracker.lastFrame, tracker.currentFrame)

// Output:
{ value: 18.55, unit: 'm/s' }
```

#### `tracker.calcBearing(frame1: Frame, frame2: Frame)`

Calculates bearing from two provided tracker frames.

```js
// As an example, this:
tracker.bearing

// Is the same as doing:
tracker.calcBearing(tracker.lastFrame, tracker.currentFrame)

// Output:
0 // Exactly north
```

#### `tracker.filterSpeed(alpha: number, sampleCount: number)`

TODO

#### `tracker.filterBearing(alpha: number, sampleCount: number)`

TODO

#### `tracker.projectPosition(time: number)`

TODO

### Route

#### `new Route()`

TODO

#### `addRoutePoint(routePoint: newRoutePoint)`

```js
interface newRoutePoint {
	position: Position;
	name?: string;
	altitude?: number;
}
```

#### `route.totalDistance`

TODO

#### `route.sortByDistanceFromPosition(position: Position)`

Also available as static function on Route.

#### `route.getClosestRoutePoint`

TODO

#### `route.sortByDistanceTravelled(route: RoutePoint[], distance: number)`

Also available as static function on Route.

#### `route.getRoutePointAtDistance(distance: number): RoutePoint`

TODO

#### `route.sortByNearestPathSegment(position: Position): RoutePoint[][]`

TODO

#### `getNextRoutePoint(position: Position): RoutePoint`

TODO

#### `getNearestPointOnRouteLine(position: Position): Position`

TODO

#### `getDistanceAlongRoute(position: Position): number`

TODO

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/florisporro](https://github.com/florisporro)
- [twitter/florisporro](https://twitter.com/florisporro)

## License

MIT © florisporro
