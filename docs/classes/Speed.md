[trackerlib](../README.md) / [Exports](../modules.md) / Speed

# Class: Speed

Speed class. Give it a speed and a unit, and it will convert it to other speed units.

Units default to meters per second.

**`Export`**

## Table of contents

### Constructors

- [constructor](Speed.md#constructor)

### Properties

- [speed](Speed.md#speed)

### Accessors

- [kmh](Speed.md#kmh)
- [kts](Speed.md#kts)
- [mph](Speed.md#mph)
- [mps](Speed.md#mps)

## Constructors

### constructor

• **new Speed**(`value`, `unit?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `unit` | `string` | `"m/s"` |

#### Defined in

[lib/units.ts:40](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L40)

## Properties

### speed

• **speed**: `number`

#### Defined in

[lib/units.ts:38](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L38)

## Accessors

### kmh

• `get` **kmh**(): `number`

Returns the speed in kilometers per hour.

**`Memberof`**

Speed

#### Returns

`number`

#### Defined in

[lib/units.ts:70](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L70)

___

### kts

• `get` **kts**(): `number`

Returns the speed in knots.

**`Memberof`**

Speed

#### Returns

`number`

#### Defined in

[lib/units.ts:90](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L90)

___

### mph

• `get` **mph**(): `number`

Returns the speed in miles per hour.

**`Memberof`**

Speed

#### Returns

`number`

#### Defined in

[lib/units.ts:80](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L80)

___

### mps

• `get` **mps**(): `number`

Returns the speed in meters per second.

**`Memberof`**

Speed

#### Returns

`number`

#### Defined in

[lib/units.ts:60](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L60)
