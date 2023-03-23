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

• **new Frame**(`newFrame`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newFrame` | [`NewFrame`](../interfaces/NewFrame.md) |

#### Defined in

[lib/tracker.ts:31](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L31)

## Properties

### distance

• `Optional` **distance**: [`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:28](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L28)

___

### frameTimestamp

• **frameTimestamp**: `number`

#### Defined in

[lib/tracker.ts:26](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L26)

___

### frameno

• `Readonly` **frameno**: `number`

#### Defined in

[lib/tracker.ts:24](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L24)

___

### position

• **position**: [`Position`](Position.md)

#### Defined in

[lib/tracker.ts:25](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L25)

___

### positionTimestamp

• `Optional` **positionTimestamp**: `number`

#### Defined in

[lib/tracker.ts:27](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L27)

___

### totalDistance

• **totalDistance**: [`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:29](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L29)

## Accessors

### timestamp

• `get` **timestamp**(): `number`

#### Returns

`number`

#### Defined in

[lib/tracker.ts:46](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L46)

## Methods

### projectPosition

▸ **projectPosition**(`speed`, `bearing`, `time`): [`Position`](Position.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `speed` | [`Speed`](Speed.md) |
| `bearing` | `number` |
| `time` | `number` |

#### Returns

[`Position`](Position.md)

#### Defined in

[lib/tracker.ts:50](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L50)

___

### projectTotalDistance

▸ **projectTotalDistance**(`speed`, `time`): [`Distance`](Distance.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `speed` | [`Speed`](Speed.md) |
| `time` | `number` |

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/tracker.ts:55](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/tracker.ts#L55)
