[trackerlib](../README.md) / [Exports](../modules.md) / Route

# Class: Route

A route is a collection of route points. It has a bunch of useful functions for working with routes, like the ability to find
the closest route position along the route line, or to sort the route points by distance from a given position.

**`Export`**

## Table of contents

### Constructors

- [constructor](Route.md#constructor)

### Properties

- [routePoints](Route.md#routepoints)
- [waypoints](Route.md#waypoints)

### Accessors

- [totalDistance](Route.md#totaldistance)

### Methods

- [addRoutePoint](Route.md#addroutepoint)
- [addWaypoint](Route.md#addwaypoint)
- [getAllFollowingRoutePoints](Route.md#getallfollowingroutepoints)
- [getClosestRoutePoint](Route.md#getclosestroutepoint)
- [getCurrentSegment](Route.md#getcurrentsegment)
- [getDistanceAlongRoute](Route.md#getdistancealongroute)
- [getNearestPointOnRouteLine](Route.md#getnearestpointonrouteline)
- [getNextRoutePoint](Route.md#getnextroutepoint)
- [getRoutePointAtDistance](Route.md#getroutepointatdistance)
- [getRoutePointFromDistance](Route.md#getroutepointfromdistance)
- [sortByDistanceFromPosition](Route.md#sortbydistancefromposition)
- [sortByDistanceTravelled](Route.md#sortbydistancetravelled)
- [sortByNearestPathSegment](Route.md#sortbynearestpathsegment)
- [sortByDistanceFromPosition](Route.md#sortbydistancefromposition-1)
- [sortByDistanceTravelled](Route.md#sortbydistancetravelled-1)

## Constructors

### constructor

• **new Route**()

#### Defined in

[lib/route.ts:97](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L97)

## Properties

### routePoints

• **routePoints**: [`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:94](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L94)

___

### waypoints

• **waypoints**: `Waypoint`[]

#### Defined in

[lib/route.ts:95](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L95)

## Accessors

### totalDistance

• `get` **totalDistance**(): [`Distance`](Distance.md)

Get the total distance of the route.

**`Memberof`**

Route

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/route.ts:136](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L136)

## Methods

### addRoutePoint

▸ **addRoutePoint**(`routePoint`): [`RoutePoint`](RoutePoint.md)

Adds a new point to the route.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `routePoint` | [`newRoutePoint`](../interfaces/newRoutePoint.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)

#### Defined in

[lib/route.ts:109](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L109)

___

### addWaypoint

▸ **addWaypoint**(`waypoint`): `Waypoint`

Adds a new waypoint to the route.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `waypoint` | `NewWaypoint` |

#### Returns

`Waypoint`

#### Defined in

[lib/route.ts:123](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L123)

___

### getAllFollowingRoutePoints

▸ **getAllFollowingRoutePoints**(`routePoint`): [`RoutePoint`](RoutePoint.md)[]

Get all route points that sequentially follow a given route point.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `routePoint` | [`RoutePoint`](RoutePoint.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:348](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L348)

___

### getClosestRoutePoint

▸ **getClosestRoutePoint**(`position`): [`RoutePoint`](RoutePoint.md)

Get the closest route point to a given position.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)

#### Defined in

[lib/route.ts:178](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L178)

___

### getCurrentSegment

▸ **getCurrentSegment**(`position`): [`RoutePoint`](RoutePoint.md)[]

Gets the current segment of the route, which is the closest line segment to the given position.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:257](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L257)

___

### getDistanceAlongRoute

▸ **getDistanceAlongRoute**(`position`): [`Distance`](Distance.md)

For a given position, finds the nearest position on the route line and returns the distance along the route to that position.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/route.ts:314](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L314)

___

### getNearestPointOnRouteLine

▸ **getNearestPointOnRouteLine**(`position`): [`Position`](Position.md)

Gets the nearest position on the route line to a given position.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/route.ts:281](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L281)

___

### getNextRoutePoint

▸ **getNextRoutePoint**(`position`): [`RoutePoint`](RoutePoint.md)

Gets the next upcoming route point on the route, which is the furthest along point on the nearest line segment.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)

#### Defined in

[lib/route.ts:269](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L269)

___

### getRoutePointAtDistance

▸ **getRoutePointAtDistance**(`distance`): [`RoutePoint`](RoutePoint.md)

Gets the nearest route point to a given distance travelled along the route.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | [`Distance`](Distance.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)

#### Defined in

[lib/route.ts:215](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L215)

___

### getRoutePointFromDistance

▸ **getRoutePointFromDistance**(`distance`): [`Position`](Position.md)

For a given distance, finds the nearest position on the route line and returns the position on the route line at that distance.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | [`Distance`](Distance.md) |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/route.ts:330](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L330)

___

### sortByDistanceFromPosition

▸ **sortByDistanceFromPosition**(`position`): [`RoutePoint`](RoutePoint.md)[]

Sort the Route by distance from a given position. Returns a copy.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:149](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L149)

___

### sortByDistanceTravelled

▸ **sortByDistanceTravelled**(`distance`): [`RoutePoint`](RoutePoint.md)[]

Sorts the route by distance travelled. Returns a copy.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | [`Distance`](Distance.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:204](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L204)

___

### sortByNearestPathSegment

▸ **sortByNearestPathSegment**(`position`): [`RoutePoint`](RoutePoint.md)[][]

Finds the closest line segment in the route to a given position. Returns an array of two route points, which are the
start and end of the closest line segment.

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[][]

#### Defined in

[lib/route.ts:227](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L227)

___

### sortByDistanceFromPosition

▸ `Static` **sortByDistanceFromPosition**(`route`, `position`): [`RoutePoint`](RoutePoint.md)[]

Sort an array of route points by distance from a given position. Returns a copy.

**`Static`**

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | [`RoutePoint`](RoutePoint.md)[] |
| `position` | [`Position`](Position.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:162](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L162)

___

### sortByDistanceTravelled

▸ `Static` **sortByDistanceTravelled**(`route`, `distance`): [`RoutePoint`](RoutePoint.md)[]

Sorts an array of route points by distance travelled. Returns a copy.

**`Static`**

**`Memberof`**

Route

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | [`RoutePoint`](RoutePoint.md)[] |
| `distance` | [`Distance`](Distance.md) |

#### Returns

[`RoutePoint`](RoutePoint.md)[]

#### Defined in

[lib/route.ts:191](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L191)
