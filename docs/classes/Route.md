[trackerlib](../README.md) / [Exports](../modules.md) / Route

# Class: Route

## Table of contents

### Constructors

- [constructor](Route.md#constructor)

### Properties

- [routePoints](Route.md#routepoints)

### Accessors

- [totalDistance](Route.md#totaldistance)

### Methods

- [addRoutePoint](Route.md#addroutepoint)
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

[lib/route.ts:49](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L49)

## Properties

### routePoints

• **routePoints**: `RoutePoint`[]

#### Defined in

[lib/route.ts:47](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L47)

## Accessors

### totalDistance

• `get` **totalDistance**(): `number`

#### Returns

`number`

#### Defined in

[lib/route.ts:60](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L60)

## Methods

### addRoutePoint

▸ **addRoutePoint**(`routePoint`): `RoutePoint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routePoint` | `newRoutePoint` |

#### Returns

`RoutePoint`

#### Defined in

[lib/route.ts:53](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L53)

___

### getAllFollowingRoutePoints

▸ **getAllFollowingRoutePoints**(`routePoint`): `RoutePoint`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `routePoint` | `RoutePoint` |

#### Returns

`RoutePoint`[]

#### Defined in

[lib/route.ts:177](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L177)

___

### getClosestRoutePoint

▸ **getClosestRoutePoint**(`position`): `RoutePoint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

`RoutePoint`

#### Defined in

[lib/route.ts:79](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L79)

___

### getCurrentSegment

▸ **getCurrentSegment**(`position`): `RoutePoint`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

`RoutePoint`[]

#### Defined in

[lib/route.ts:120](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L120)

___

### getDistanceAlongRoute

▸ **getDistanceAlongRoute**(`position`): [`Distance`](Distance.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/route.ts:156](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L156)

___

### getNearestPointOnRouteLine

▸ **getNearestPointOnRouteLine**(`position`): [`Position`](Position.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/route.ts:130](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L130)

___

### getNextRoutePoint

▸ **getNextRoutePoint**(`position`): `RoutePoint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

`RoutePoint`

#### Defined in

[lib/route.ts:125](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L125)

___

### getRoutePointAtDistance

▸ **getRoutePointAtDistance**(`distance`): `RoutePoint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | [`Distance`](Distance.md) |

#### Returns

`RoutePoint`

#### Defined in

[lib/route.ts:93](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L93)

___

### getRoutePointFromDistance

▸ **getRoutePointFromDistance**(`distance`): [`Position`](Position.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | [`Distance`](Distance.md) |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/route.ts:166](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L166)

___

### sortByDistanceFromPosition

▸ **sortByDistanceFromPosition**(`position`): `RoutePoint`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

`RoutePoint`[]

#### Defined in

[lib/route.ts:66](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L66)

___

### sortByDistanceTravelled

▸ **sortByDistanceTravelled**(`distance`): `RoutePoint`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | [`Distance`](Distance.md) |

#### Returns

`RoutePoint`[]

#### Defined in

[lib/route.ts:89](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L89)

___

### sortByNearestPathSegment

▸ **sortByNearestPathSegment**(`position`): `RoutePoint`[][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

`RoutePoint`[][]

#### Defined in

[lib/route.ts:97](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L97)

___

### sortByDistanceFromPosition

▸ `Static` **sortByDistanceFromPosition**(`route`, `position`): `RoutePoint`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | `RoutePoint`[] |
| `position` | [`Position`](Position.md) |

#### Returns

`RoutePoint`[]

#### Defined in

[lib/route.ts:70](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L70)

___

### sortByDistanceTravelled

▸ `Static` **sortByDistanceTravelled**(`route`, `distance`): `RoutePoint`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | `RoutePoint`[] |
| `distance` | [`Distance`](Distance.md) |

#### Returns

`RoutePoint`[]

#### Defined in

[lib/route.ts:83](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/route.ts#L83)
