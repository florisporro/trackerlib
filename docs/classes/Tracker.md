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
- [calcBearing](Tracker.md#calcbearing)
- [calcSpeed](Tracker.md#calcspeed)

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

[lib/tracker.ts:78](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L78)

## Properties

### frames

• **frames**: `Frame`[]

#### Defined in

[lib/tracker.ts:75](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L75)

___

### meta

• `Optional` **meta**: `any`

#### Defined in

[lib/tracker.ts:76](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L76)

___

### name

• **name**: `string`

#### Defined in

[lib/tracker.ts:73](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L73)

___

### type

• `Optional` **type**: `string`

#### Defined in

[lib/tracker.ts:74](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L74)

## Accessors

### bearing

• `get` **bearing**(): `number`

Get the current bearing of the tracker

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:221](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L221)

___

### currentFrame

• `get` **currentFrame**(): `undefined` \| `Frame`

Gets the current tracker frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| `Frame`

#### Defined in

[lib/tracker.ts:115](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L115)

___

### lastFrame

• `get` **lastFrame**(): `undefined` \| `Frame`

The frame recorded just prior to the current frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| `Frame`

#### Defined in

[lib/tracker.ts:125](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L125)

___

### position

• `get` **position**(): `undefined` \| [`Position`](Position.md)

The last recorded tracker position

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:135](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L135)

___

### projectedPosition

• `get` **projectedPosition**(): `undefined` \| [`Position`](Position.md)

Get the projected position of the tracker using Date.now()

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:145](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L145)

___

### speed

• `get` **speed**(): [`Speed`](Speed.md)

Get the current speed of the tracker

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)

#### Defined in

[lib/tracker.ts:176](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L176)

___

### speeds

• `get` **speeds**(): [`Speed`](Speed.md)[]

Get the historic tracker speeds

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)[]

#### Defined in

[lib/tracker.ts:191](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L191)

___

### timeSinceLastSample

• `get` **timeSinceLastSample**(): `number`

The time since the last sample was taken.

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:275](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L275)

___

### totalDistance

• `get` **totalDistance**(): [`Distance`](Distance.md)

Total distance travelled by the tracker.

**`Memberof`**

Tracker

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:290](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L290)

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

{number}

#### Defined in

[lib/tracker.ts:256](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L256)

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

{Speed}

#### Defined in

[lib/tracker.ts:237](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L237)

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

{Position}

#### Defined in

[lib/tracker.ts:304](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L304)

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

{Position}

#### Defined in

[lib/tracker.ts:368](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L368)

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

{Distance}

#### Defined in

[lib/tracker.ts:319](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L319)

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

{Distance}

#### Defined in

[lib/tracker.ts:336](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L336)

___

### record

▸ **record**(`newFrame`): `Frame`

Record a new frame for the tracker

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `newFrame` | `NewFrame` |

#### Returns

`Frame`

#### Defined in

[lib/tracker.ts:92](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L92)

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
| `frame1` | `Frame` |
| `frame2` | `Frame` |

#### Returns

`number`

#### Defined in

[lib/tracker.ts:211](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L211)

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
| `frame1` | `Frame` |
| `frame2` | `Frame` |

#### Returns

[`Speed`](Speed.md)

{Speed}

#### Defined in

[lib/tracker.ts:158](https://github.com/florisporro/trackerlib/blob/90bf6ff/src/lib/tracker.ts#L158)