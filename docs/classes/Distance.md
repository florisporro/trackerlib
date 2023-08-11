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

### Methods

- [valueOf](Distance.md#valueof)

## Constructors

### constructor

• **new Distance**(`value`, `unit?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `unit` | `string` | `"m"` |

#### Defined in

[lib/units.ts:112](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L112)

## Properties

### distance

• **distance**: `number`

#### Defined in

[lib/units.ts:110](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L110)

## Accessors

### km

• `get` **km**(): `number`

Returns the distance in kilometers.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:142](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L142)

___

### m

• `get` **m**(): `number`

Returns the distance in meters.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:132](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L132)

___

### mi

• `get` **mi**(): `number`

Returns the distance in miles.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:152](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L152)

___

### nm

• `get` **nm**(): `number`

Returns the distance in nautical miles.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:162](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L162)

## Methods

### valueOf

▸ **valueOf**(): `number`

#### Returns

`number`

#### Defined in

[lib/units.ts:166](https://github.com/florisporro/trackerlib/blob/520b40a/src/lib/units.ts#L166)
