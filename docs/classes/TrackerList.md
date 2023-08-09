[trackerlib](../README.md) / [Exports](../modules.md) / TrackerList

# Class: TrackerList

A tracker list is a collection of trackers
It is used to group trackers together and provides various functions to sort them.
It can also be used to calculate relative values such as the distance between trackers,
the time to reach another tracker, etc.

## Table of contents

### Constructors

- [constructor](TrackerList.md#constructor)

### Properties

- [name](TrackerList.md#name)
- [trackers](TrackerList.md#trackers)

### Methods

- [addTracker](TrackerList.md#addtracker)
- [getProjectedDistancesTravelled](TrackerList.md#getprojecteddistancestravelled)
- [getProjectedDistancesTravelledAlongRoute](TrackerList.md#getprojecteddistancestravelledalongroute)
- [getTotalDistancesTravelled](TrackerList.md#gettotaldistancestravelled)
- [sortByProjectedDistaceTravelled](TrackerList.md#sortbyprojecteddistacetravelled)
- [sortByProjectedDistanceTravelledAlongRoute](TrackerList.md#sortbyprojecteddistancetravelledalongroute)
- [sortByTotalDistanceTravelled](TrackerList.md#sortbytotaldistancetravelled)

## Constructors

### constructor

• **new TrackerList**(`name`, `trackers`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `trackers` | [`Tracker`](Tracker.md)[] |

#### Defined in

[lib/trackerlist.ts:14](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L14)

## Properties

### name

• **name**: `string`

#### Defined in

[lib/trackerlist.ts:14](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L14)

___

### trackers

• **trackers**: [`Tracker`](Tracker.md)[]

#### Defined in

[lib/trackerlist.ts:14](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L14)

## Methods

### addTracker

▸ **addTracker**(`tracker`): `void`

Add a tracker to the list

**`Memberof`**

TrackerList

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracker` | [`Tracker`](Tracker.md) |

#### Returns

`void`

#### Defined in

[lib/trackerlist.ts:22](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L22)

___

### getProjectedDistancesTravelled

▸ **getProjectedDistancesTravelled**(`time`): [`Distance`](Distance.md)[]

Returns a new array of the distances that all trackers are projected to have travelled, based on an elapsed time.

**`Memberof`**

TrackerList

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

[`Distance`](Distance.md)[]

#### Defined in

[lib/trackerlist.ts:58](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L58)

___

### getProjectedDistancesTravelledAlongRoute

▸ **getProjectedDistancesTravelledAlongRoute**(`time`, `route`): [`Distance`](Distance.md)[]

Returns a new array of the distances that all trackers are projected to have travelled, based on an elapsed time, along a given route.

**`Memberof`**

TrackerList

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |
| `route` | [`Route`](Route.md) |

#### Returns

[`Distance`](Distance.md)[]

#### Defined in

[lib/trackerlist.ts:85](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L85)

___

### getTotalDistancesTravelled

▸ **getTotalDistancesTravelled**(): [`Distance`](Distance.md)[]

Returns a new array of the distances that all trackers have travelled.

**`Memberof`**

TrackerList

#### Returns

[`Distance`](Distance.md)[]

#### Defined in

[lib/trackerlist.ts:32](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L32)

___

### sortByProjectedDistaceTravelled

▸ **sortByProjectedDistaceTravelled**(`time`): [`Tracker`](Tracker.md)[]

Sorts the trackers in the list by the total distance they are projected to have travelled (since tracking began). Returns a copy.

**`Memberof`**

TrackerList

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

[`Tracker`](Tracker.md)[]

#### Defined in

[lib/trackerlist.ts:69](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L69)

___

### sortByProjectedDistanceTravelledAlongRoute

▸ **sortByProjectedDistanceTravelledAlongRoute**(`time`, `route`): [`Tracker`](Tracker.md)[]

Sorts the trackers in the list by the total distance they are projected to have travelled (since tracking began) along a given route. Returns a copy.

**`Memberof`**

TrackerList

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | The time to project the distance to |
| `route` | [`Route`](Route.md) | The route to calculate the projected distance over |

#### Returns

[`Tracker`](Tracker.md)[]

#### Defined in

[lib/trackerlist.ts:97](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L97)

___

### sortByTotalDistanceTravelled

▸ **sortByTotalDistanceTravelled**(): [`Tracker`](Tracker.md)[]

Sorts the trackers in the list by the total distance each has travelled (since tracking began). Returns a copy.

**`Memberof`**

TrackerList

#### Returns

[`Tracker`](Tracker.md)[]

#### Defined in

[lib/trackerlist.ts:42](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/trackerlist.ts#L42)
