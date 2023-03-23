[trackerlib](../README.md) / [Exports](../modules.md) / RoutePoint

# Class: RoutePoint

A route point is a point on a route line. It can be given a lastRoutePoint in its constructor,
which will then calculate the distance and bearing between the two points. It will also
get a new id, which is the id of the lastRoutePoint + 1.

**`Export`**

## Table of contents

### Constructors

- [constructor](RoutePoint.md#constructor)

### Properties

- [altitude](RoutePoint.md#altitude)
- [bearing](RoutePoint.md#bearing)
- [distance](RoutePoint.md#distance)
- [id](RoutePoint.md#id)
- [meta](RoutePoint.md#meta)
- [name](RoutePoint.md#name)
- [position](RoutePoint.md#position)
- [totalDistance](RoutePoint.md#totaldistance)

### Methods

- [getBearing](RoutePoint.md#getbearing)
- [getDistance](RoutePoint.md#getdistance)

## Constructors

### constructor

• **new RoutePoint**(`position`, `altitude?`, `name?`, `lastRoutePoint?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |
| `altitude?` | `number` |
| `name?` | `string` |
| `lastRoutePoint?` | [`RoutePoint`](RoutePoint.md) |

#### Defined in

[lib/route.ts:22](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L22)

## Properties

### altitude

• `Optional` **altitude**: `number`

#### Defined in

[lib/route.ts:16](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L16)

___

### bearing

• `Optional` `Readonly` **bearing**: `number`

#### Defined in

[lib/route.ts:18](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L18)

___

### distance

• `Readonly` **distance**: [`Distance`](Distance.md)

#### Defined in

[lib/route.ts:19](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L19)

___

### id

• `Readonly` **id**: `number`

#### Defined in

[lib/route.ts:13](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L13)

___

### meta

• `Optional` **meta**: `object`

#### Defined in

[lib/route.ts:17](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L17)

___

### name

• `Optional` **name**: `string`

#### Defined in

[lib/route.ts:14](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L14)

___

### position

• **position**: [`Position`](Position.md)

#### Defined in

[lib/route.ts:15](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L15)

___

### totalDistance

• `Readonly` **totalDistance**: [`Distance`](Distance.md)

#### Defined in

[lib/route.ts:20](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L20)

## Methods

### getBearing

▸ **getBearing**(`position`): `number`

Returns the bearing between this route point and the given position.

**`Memberof`**

RoutePoint

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

`number`

#### Defined in

[lib/route.ts:57](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L57)

___

### getDistance

▸ **getDistance**(`position`): [`Distance`](Distance.md)

Returns the distance between this route point and the given position.

**`Memberof`**

RoutePoint

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |

#### Returns

[`Distance`](Distance.md)

#### Defined in

[lib/route.ts:46](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/route.ts#L46)
