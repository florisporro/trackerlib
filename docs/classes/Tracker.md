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

[lib/tracker.ts:95](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L95)

## Properties

### frames

• **frames**: [`Frame`](Frame.md)[]

#### Defined in

[lib/tracker.ts:92](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L92)

___

### meta

• `Optional` **meta**: `any`

#### Defined in

[lib/tracker.ts:93](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L93)

___

### name

• **name**: `string`

#### Defined in

[lib/tracker.ts:90](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L90)

___

### type

• `Optional` **type**: `string`

#### Defined in

[lib/tracker.ts:91](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L91)

## Accessors

### bearing

• `get` **bearing**(): `number`

Get the current bearing of the tracker

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:238](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L238)

___

### currentFrame

• `get` **currentFrame**(): `undefined` \| [`Frame`](Frame.md)

Gets the current tracker frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:132](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L132)

___

### lastFrame

• `get` **lastFrame**(): `undefined` \| [`Frame`](Frame.md)

The frame recorded just prior to the current frame

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:142](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L142)

___

### position

• `get` **position**(): `undefined` \| [`Position`](Position.md)

The last recorded tracker position

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:152](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L152)

___

### projectedPosition

• `get` **projectedPosition**(): `undefined` \| [`Position`](Position.md)

Get the projected position of the tracker using Date.now()

**`Memberof`**

Tracker

#### Returns

`undefined` \| [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:162](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L162)

___

### speed

• `get` **speed**(): [`Speed`](Speed.md)

Get the current speed of the tracker

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)

#### Defined in

[lib/tracker.ts:193](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L193)

___

### speeds

• `get` **speeds**(): [`Speed`](Speed.md)[]

Get the historic tracker speeds

**`Memberof`**

Tracker

#### Returns

[`Speed`](Speed.md)[]

#### Defined in

[lib/tracker.ts:208](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L208)

___

### timeSinceLastSample

• `get` **timeSinceLastSample**(): `number`

The time since the last sample was taken.

**`Memberof`**

Tracker

#### Returns

`number`

#### Defined in

[lib/tracker.ts:292](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L292)

___

### totalDistance

• `get` **totalDistance**(): [`Distance`](Distance.md)

Total distance travelled by the tracker.

**`Memberof`**

Tracker

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:307](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L307)

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

[lib/tracker.ts:273](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L273)

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

[lib/tracker.ts:254](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L254)

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

[lib/tracker.ts:321](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L321)

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

[lib/tracker.ts:385](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L385)

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

[lib/tracker.ts:336](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L336)

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

[lib/tracker.ts:353](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L353)

___

### record

▸ **record**(`newFrame`): [`Frame`](Frame.md)

Record a new frame for the tracker

**`Memberof`**

Tracker

#### Parameters

| Name | Type |
| :------ | :------ |
| `newFrame` | [`NewFrame`](../interfaces/NewFrame.md) |

#### Returns

[`Frame`](Frame.md)

#### Defined in

[lib/tracker.ts:109](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L109)

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

[lib/tracker.ts:228](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L228)

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

[lib/tracker.ts:175](https://github.com/florisporro/trackerlib/blob/326f9fc/src/lib/tracker.ts#L175)
