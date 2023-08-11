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

- [calcSpeedAlongRouteLine](Tracker.md#calcspeedalongrouteline)
- [calcTrackerRelativeMotion](Tracker.md#calctrackerrelativemotion)
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
- [calcSpeedAlongRouteLine](Tracker.md#calcspeedalongrouteline-1)
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

[lib/tracker.ts:127](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L127)

## Properties

### frames

• **frames**: [`Frame`](Frame.md)[]

#### Defined in

[lib/tracker.ts:122](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L122)

___

### meta

• `Optional` **meta**: `any`

#### Defined in

[lib/tracker.ts:125](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L125)

___

### name

• **name**: `string`

#### Defined in

[lib/tracker.ts:116](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L116)

___

### type

• `Optional` **type**: `string`

#### Defined in

[lib/tracker.ts:119](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L119)

## Accessors

### bearing

• `get` **bearing**(): `number`

Get the current bearing of the tracker

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:308](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L308)

___

### currentFrame

• `get` **currentFrame**(): `undefined` \| [`Frame`](Frame.md)

Gets the current tracker frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:164](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L164)

___

### lastFrame

• `get` **lastFrame**(): `undefined` \| [`Frame`](Frame.md)

The frame recorded just prior to the current frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:174](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L174)

___

### position

• `get` **position**(): `undefined` \| [`Position`](Position.md)

The last recorded tracker position

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:184](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L184)

___

### projectedPosition

• `get` **projectedPosition**(): `undefined` \| [`Position`](Position.md)

Get the projected position of the tracker using Date.now()

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:194](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L194)

___

### speed

• `get` **speed**(): [`Speed`](Speed.md)

Get the current speed of the tracker

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)

#### Defined in

[lib/tracker.ts:263](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L263)

___

### speeds

• `get` **speeds**(): [`Speed`](Speed.md)[]

Get the historic tracker speeds

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)[]

#### Defined in

[lib/tracker.ts:278](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L278)

___

### timeSinceLastSample

• `get` **timeSinceLastSample**(): `number`

The time since the last sample was taken.

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:362](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L362)

___

### totalDistance

• `get` **totalDistance**(): [`Distance`](Distance.md)

Total distance travelled by the tracker.

**`Memberof`**

Tracker

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:377](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L377)

## Methods

### calcSpeedAlongRouteLine

▸ **calcSpeedAlongRouteLine**(`route`): [`Speed`](Speed.md)

Calculates the present speed of the tracker based on the last two recorded frames

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | [`Route`](Route.md) |

#### Returns

[`Speed`](Speed.md)

{Speed}

#### Defined in

[lib/tracker.ts:251](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L251)

___

### calcTrackerRelativeMotion

▸ **calcTrackerRelativeMotion**(`tracker`, `time?`, `route?`): `TrackerRelativeMotion`

Given a tracker to compare against, calculate properties like the time it will take for the two to meet, the distance between them, etc.
Also handles projections into the future, and projections along a route line.

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracker` | [`Tracker`](Tracker.md) |
| `time?` | `number` |
| `route?` | [`Route`](Route.md) |

#### Returns

`TrackerRelativeMotion`

{TrackerRelativeMotion}

#### Defined in

[lib/tracker.ts:475](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L475)

___

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

[lib/tracker.ts:343](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L343)

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

[lib/tracker.ts:324](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L324)

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

[lib/tracker.ts:391](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L391)

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

[lib/tracker.ts:455](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L455)

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

[lib/tracker.ts:406](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L406)

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

[lib/tracker.ts:423](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L423)

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

[lib/tracker.ts:141](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L141)

___

### serialize

▸ **serialize**(): `any`

Serialize the tracker to a stringifyable object

**`Memberof`**

Tracker

#### Returns

`any`

#### Defined in

[lib/tracker.ts:536](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L536)

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

[lib/tracker.ts:298](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L298)

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

[lib/tracker.ts:207](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L207)

___

### calcSpeedAlongRouteLine

▸ `Static` **calcSpeedAlongRouteLine**(`frame1`, `frame2`, `route`): [`Speed`](Speed.md)

Calculate the speed between any two tracker frames along a route line

**`Static`**

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame1` | [`Frame`](Frame.md) |
| `frame2` | [`Frame`](Frame.md) |
| `route` | [`Route`](Route.md) |

#### Returns

[`Speed`](Speed.md)

{Speed}

#### Defined in

[lib/tracker.ts:228](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L228)

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

[lib/tracker.ts:548](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L548)
