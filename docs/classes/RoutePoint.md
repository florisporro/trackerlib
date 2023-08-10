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

[lib/route.ts:40](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L40)

## Properties

### altitude

• `Optional` **altitude**: `number`

#### Defined in

[lib/route.ts:34](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L34)

___

### bearing

• `Optional` `Readonly` **bearing**: `number`

#### Defined in

[lib/route.ts:36](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L36)

___

### distance

• `Readonly` **distance**: [`Distance`](Distance.md)

#### Defined in

[lib/route.ts:37](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L37)

___

### id

• `Readonly` **id**: `number`

#### Defined in

[lib/route.ts:31](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L31)

___

### meta

• `Optional` **meta**: `object`

#### Defined in

[lib/route.ts:35](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L35)

___

### name

• `Optional` **name**: `string`

#### Defined in

[lib/route.ts:32](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L32)

___

### position

• **position**: [`Position`](Position.md)

#### Defined in

[lib/route.ts:33](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L33)

___

### totalDistance

• `Readonly` **totalDistance**: [`Distance`](Distance.md)

#### Defined in

[lib/route.ts:38](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L38)

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

[lib/route.ts:75](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L75)

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

[lib/route.ts:64](https://github.com/florisporro/trackerlib/blob/47e5200/src/lib/route.ts#L64)
