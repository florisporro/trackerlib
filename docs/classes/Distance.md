[trackerlib](../README.md) / [Exports](../modules.md) / Distance

# Class: Distance

Distance class. Give it a distance and a unit, and it will convert it to other distance units.

Units default to meters.

**`Export`**

## Table of contents

### Constructors

- [constructor](Distance.md#constructor)

### Properties

- [distance](Distance.md#distance)

### Accessors

- [km](Distance.md#km)
- [m](Distance.md#m)
- [mi](Distance.md#mi)
- [nm](Distance.md#nm)

## Constructors

### constructor

• **new Distance**(`value`, `unit?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `unit` | `string` | `"m"` |

#### Defined in

[lib/units.ts:107](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L107)

## Properties

### distance

• **distance**: `number`

#### Defined in

[lib/units.ts:105](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L105)

## Accessors

### km

• `get` **km**(): `number`

Returns the distance in kilometers.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:137](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L137)

___

### m

• `get` **m**(): `number`

Returns the distance in meters.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:127](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L127)

___

### mi

• `get` **mi**(): `number`

Returns the distance in miles.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:147](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L147)

___

### nm

• `get` **nm**(): `number`

Returns the distance in nautical miles.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:157](https://github.com/florisporro/trackerlib/blob/e55e3af/src/lib/units.ts#L157)
