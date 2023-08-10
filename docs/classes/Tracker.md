[trackerlib](../README.md) / [Exports](../modules.md) / Tracker

# Class: Tracker

The Tracker class. A Tracker is a moving object that is tracked, like a car, boat, airplane etc.
A tracker has many frames. A frame is a snapshot of a position at a given time. Using this history, many calculations can be made.
For example, the speed, bearing, distance travelled, projected position etc.
The class also offers functions for calculations along a route.

You can initialize the class with a name, type and other meta data. These are all optional.

**`Export`**

## Table of contents

### Constructors

- [constructor](Tracker.md#constructor)

### Properties

- [frames](Tracker.md#frames)
- [meta](Tracker.md#meta)
- [name](Tracker.md#name)
- [type](Tracker.md#type)

### Accessors

- [bearing](Tracker.md#bearing)
- [currentFrame](Tracker.md#currentframe)
- [lastFrame](Tracker.md#lastframe)
- [position](Tracker.md#position)
- [projectedPosition](Tracker.md#projectedposition)
- [speed](Tracker.md#speed)
- [speeds](Tracker.md#speeds)
- [timeSinceLastSample](Tracker.md#timesincelastsample)
- [totalDistance](Tracker.md#totaldistance)

### Methods

- [filterBearing](Tracker.md#filterbearing)
- [filterSpeed](Tracker.md#filterspeed)
- [projectPosition](Tracker.md#projectposition)
- [projectPositionOnRouteLine](Tracker.md#projectpositiononrouteline)
- [projectTotalDistance](Tracker.md#projecttotaldistance)
- [projectTotalDistanceAlongRouteLine](Tracker.md#projecttotaldistancealongrouteline)
- [record](Tracker.md#record)
- [serialize](Tracker.md#serialize)
- [calcBearing](Tracker.md#calcbearing)
- [calcSpeed](Tracker.md#calcspeed)
- [deserialize](Tracker.md#deserialize)

## Constructors

### constructor

• **new Tracker**(`name`, `type?`, `meta?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type?` | `string` |
| `meta?` | `any` |

#### Defined in

[lib/tracker.ts:116](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L116)

## Properties

### frames

• **frames**: [`Frame`](Frame.md)[]

#### Defined in

[lib/tracker.ts:111](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L111)

___

### meta

• `Optional` **meta**: `any`

#### Defined in

[lib/tracker.ts:114](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L114)

___

### name

• **name**: `string`

#### Defined in

[lib/tracker.ts:105](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L105)

___

### type

• `Optional` **type**: `string`

#### Defined in

[lib/tracker.ts:108](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L108)

## Accessors

### bearing

• `get` **bearing**(): `number`

Get the current bearing of the tracker

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:259](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L259)

___

### currentFrame

• `get` **currentFrame**(): `undefined` \| [`Frame`](Frame.md)

Gets the current tracker frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:153](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L153)

___

### lastFrame

• `get` **lastFrame**(): `undefined` \| [`Frame`](Frame.md)

The frame recorded just prior to the current frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:163](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L163)

___

### position

• `get` **position**(): `undefined` \| [`Position`](Position.md)

The last recorded tracker position

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:173](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L173)

___

### projectedPosition

• `get` **projectedPosition**(): `undefined` \| [`Position`](Position.md)

Get the projected position of the tracker using Date.now()

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:183](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L183)

___

### speed

• `get` **speed**(): [`Speed`](Speed.md)

Get the current speed of the tracker

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)

#### Defined in

[lib/tracker.ts:214](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L214)

___

### speeds

• `get` **speeds**(): [`Speed`](Speed.md)[]

Get the historic tracker speeds

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)[]

#### Defined in

[lib/tracker.ts:229](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L229)

___

### timeSinceLastSample

• `get` **timeSinceLastSample**(): `number`

The time since the last sample was taken.

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:313](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L313)

___

### totalDistance

• `get` **totalDistance**(): [`Distance`](Distance.md)

Total distance travelled by the tracker.

**`Memberof`**

Tracker

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:328](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L328)

## Methods

### filterBearing

▸ **filterBearing**(`alpha`, `sampleCount`): `number`

Filter the bearing using a low pass filter.

**`Memberof`**

Tracker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alpha` | `number` | The alpha value for the filter |
| `sampleCount` | `number` | The number of samples to use for the filter |

#### Returns

`number`

#### Defined in

[lib/tracker.ts:294](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L294)

___

### filterSpeed

▸ **filterSpeed**(`alpha`, `sampleCount`): [`Speed`](Speed.md)

Filter the speed using a low pass filter.

**`Memberof`**

Tracker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alpha` | `number` | The alpha value for the filter |
| `sampleCount` | `number` | The number of samples to use for the filter |

#### Returns

[`Speed`](Speed.md)

#### Defined in

[lib/tracker.ts:275](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L275)

___

### projectPosition

▸ **projectPosition**(`time`): `undefined` \| [`Position`](Position.md)

* Project the current position of the tracker based on the last known position, speed and bearing.

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:342](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L342)

___

### projectPositionOnRouteLine

▸ **projectPositionOnRouteLine**(`time`, `route`): [`Position`](Position.md)

Projects the current position on the route line.
This will stop working if the tracker is deviating from the route line for whatever reason.

**`Memberof`**

Tracker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | The time to project to |
| `route` | [`Route`](Route.md) | The route to project along |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/tracker.ts:406](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L406)

___

### projectTotalDistance

▸ **projectTotalDistance**(`time`): [`Distance`](Distance.md)

Projects the total distance travelled by the tracker.

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:357](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L357)

___

### projectTotalDistanceAlongRouteLine

▸ **projectTotalDistanceAlongRouteLine**(`time`, `route`): [`Distance`](Distance.md)

Get the current projected distance along a given route, irrespective of the distance the tracker has travelled.
This will stop working if the tracker is deviating from the route for whatever reason.

**`Memberof`**

Tracker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | The time to project to |
| `route` | [`Route`](Route.md) | The route to project along |

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:374](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L374)

___

### record

▸ **record**(`position`, `positionTimestamp?`): [`Frame`](Frame.md)

Record a new frame for the tracker

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |
| `positionTimestamp?` | `number` |

#### Returns

[`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:130](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L130)

___

### serialize

▸ **serialize**(): `any`

Serialize the tracker to a stringifyable object

**`Memberof`**

Tracker

#### Returns

`any`

#### Defined in

[lib/tracker.ts:422](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L422)

___

### calcBearing

▸ `Static` **calcBearing**(`frame1`, `frame2`): `number`

Calculate the bearing between any two tracker frames

**`Static`**

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame1` | [`Frame`](Frame.md) |
| `frame2` | [`Frame`](Frame.md) |

#### Returns

`number`

#### Defined in

[lib/tracker.ts:249](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L249)

___

### calcSpeed

▸ `Static` **calcSpeed**(`frame1`, `frame2`): [`Speed`](Speed.md)

Calculate the speed between any two tracker frames

**`Static`**

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame1` | [`Frame`](Frame.md) |
| `frame2` | [`Frame`](Frame.md) |

#### Returns

[`Speed`](Speed.md)

#### Defined in

[lib/tracker.ts:196](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L196)

___

### deserialize

▸ `Static` **deserialize**(`serializedTracker`): [`Tracker`](Tracker.md)

Deserialize a tracker from a stringifyable object

**`Static`**

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `serializedTracker` | `Object` |

#### Returns

[`Tracker`](Tracker.md)

#### Defined in

[lib/tracker.ts:434](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/tracker.ts#L434)
