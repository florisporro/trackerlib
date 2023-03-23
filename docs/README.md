trackerlib / [Exports](modules.md)

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

## Documentation

Auto-generated docs can be found here:
[https://github.com/florisporro/trackerlib/blob/main/docs/modules.md](https://github.com/florisporro/trackerlib/blob/main/docs/modules.md)

## Usage examples

Will be along shortly, but in the meantime check out the .spec.ts files for some concrete usage examples.

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
