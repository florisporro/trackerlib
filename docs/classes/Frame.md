[trackerlib](../README.md) / [Exports](../modules.md) / Frame

# Class: Frame

A frame is a snapshot of a position at a given time.

If a lastFrame is included in the constructor, the frame will calculate the distance travelled since the last frame.
Additionally, the frame will then receive a frameno, which is the frameno of the last frame + 1.
If frames are recorded using the Tracker.record function, this will be done automatically.

**`Export`**

## Table of contents

### Constructors

- [constructor](Frame.md#constructor)

### Properties

- [distance](Frame.md#distance)
- [frameTimestamp](Frame.md#frametimestamp)
- [frameno](Frame.md#frameno)
- [position](Frame.md#position)
- [positionTimestamp](Frame.md#positiontimestamp)
- [totalDistance](Frame.md#totaldistance)

### Accessors

- [timestamp](Frame.md#timestamp)

### Methods

- [projectPosition](Frame.md#projectposition)
- [projectTotalDistance](Frame.md#projecttotaldistance)

## Constructors

### constructor

• **new Frame**(`position`, `positionTimestamp?`, `lastFrame?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |
| `positionTimestamp?` | `number` |
| `lastFrame?` | [`Frame`](Frame.md) |

#### Defined in

[lib/tracker.ts:44](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L44)

## Properties

### distance

• `Optional` **distance**: [`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:39](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L39)

___

### frameTimestamp

• **frameTimestamp**: `number`

#### Defined in

[lib/tracker.ts:33](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L33)

___

### frameno

• `Readonly` **frameno**: `number`

#### Defined in

[lib/tracker.ts:27](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L27)

___

### position

• **position**: [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:30](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L30)

___

### positionTimestamp

• `Optional` **positionTimestamp**: `number`

#### Defined in

[lib/tracker.ts:36](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L36)

___

### totalDistance

• **totalDistance**: [`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:42](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L42)

## Accessors

### timestamp

• `get` **timestamp**(): `number`

#### Returns

`number`

#### Defined in

[lib/tracker.ts:59](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L59)

## Methods

### projectPosition

▸ **projectPosition**(`speed`, `bearing`, `time`): [`Position`](Position.md)

Project the current frame out to a new position, based on a speed, bearing and time.

**`Memberof`**

Frame

#### Parameters

| Name | Type |
| :------ | :------ |
| `speed` | [`Speed`](Speed.md) |
| `bearing` | `number` |
| `time` | `number` |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/tracker.ts:72](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L72)

___

### projectTotalDistance

▸ **projectTotalDistance**(`speed`, `time`): [`Distance`](Distance.md)

Project the new total distance travelled based on a speed and time.

**`Memberof`**

Frame

#### Parameters

| Name | Type |
| :------ | :------ |
| `speed` | [`Speed`](Speed.md) |
| `time` | `number` |

#### Returns

[`Distance`](Distance.md)

{Distance}

#### Defined in

[lib/tracker.ts:86](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/tracker.ts#L86)
