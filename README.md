# Opzet - JavaScript object validation

![](https://github.com/kevtiq/opzet/workflows/test/badge.svg)
[![Node version](https://img.shields.io/npm/v/opzet.svg?style=flat)](https://www.npmjs.com/package/opzet)
[![NPM Downloads](https://img.shields.io/npm/dm/opzet.svg?style=flat)](https://www.npmjs.com/package/opzet)
[![Minified size](https://img.shields.io/bundlephobia/min/opzet?label=minified)](https://www.npmjs.com/package/opzet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight library that allows for object schema validation. A schema is an object where the keys match the keys of the object you want to validate. Within the schema, each key has an array of 'rules' attached. A rule is simply something that returns nothing or a 'string' indicating the error.

```ts
type ValidationError = { error: string; description?: unknown };
type Rule = (value: unknown, obj?: object) => ValidationError | null;
type Schema = Record<string, Rule[]>;
```

**Opzet** validates each individual rule in the schema. If a key of an object does not comply with one or more rules, all error messages are returned. This allows you to add an order to the rules as well.

```js
import { validate, string, required } from 'opzet';
const obj = { key: 'value' };
const schema = { key: [string.type], required: [required, string.type] };
validate(obj, schema);
// returns { required: ['required', 'type'] };
```

## Default rules

Opzet has a set of default rules build in.

```js
import { string, number, boolean, object, array, required } from 'opzet';
```

- `required`: checks if the value exists or not. If invalid, returns '_required_';
- `<string|number|boolean|object|array|datetime>.type`: checks if the value is of the correct type. If invalid, returns 'type';
- `<string|number|array|datetime>.min(num: number | date)`: checks the (inclusive) minimum value/length (e.g. `array.length <= num`). Should be applied as `array.min(3)`. If invalid, returns '_min_';
- `<string|number|array|datetime>.max(num: number | date)`: checks the (inclusive) maximum value/length (e.g. `array.length <= num`). Should be applied as `array.max(3)`. If invalid, returns '_max_';
- `string.<email|url|uuid|iban>`: checks if the value is within the correct format. If invalid, returns '_format_';
- `string.enum(allowed: string[])`: checks if the value is one of the allowed string values. If invalid, returns '_enum_';

For examples, check the [tests](./tests/index.tests.ts).
