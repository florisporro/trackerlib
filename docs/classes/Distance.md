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
- [unit](Distance.md#unit)
- [value](Distance.md#value)

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

[lib/units.ts:96](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L96)

## Properties

### distance

• **distance**: `number`

#### Defined in

[lib/units.ts:94](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L94)

___

### unit

• **unit**: `string` = `"m"`

#### Defined in

[lib/units.ts:96](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L96)

___

### value

• **value**: `number`

#### Defined in

[lib/units.ts:96](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L96)

## Accessors

### km

• `get` **km**(): `number`

Returns the distance in kilometers.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:126](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L126)

___

### m

• `get` **m**(): `number`

Returns the distance in meters.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:116](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L116)

___

### mi

• `get` **mi**(): `number`

Returns the distance in miles.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:136](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L136)

___

### nm

• `get` **nm**(): `number`

Returns the distance in nautical miles.

**`Memberof`**

Distance

#### Returns

`number`

#### Defined in

[lib/units.ts:146](https://github.com/florisporro/trackerlib/blob/0d9d0a6/src/lib/units.ts#L146)
