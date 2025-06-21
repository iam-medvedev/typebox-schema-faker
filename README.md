# TypeBox Schema Faker

Generate fake data from [TypeBox](https://github.com/sinclairzx81/typebox) schemas for testing, prototyping and development.

- [TypeBox Schema Faker](#typebox-schema-faker)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Complex Objects](#complex-objects)
    - [Arrays and Unions](#arrays-and-unions)
    - [Recursive Schemas](#recursive-schemas)
    - [Configuration Options](#configuration-options)
  - [Supported TypeBox Schemas](#supported-typebox-schemas)
  - [String Formats](#string-formats)
  - [RegExp Support](#regexp-support)
  - [API](#api)
    - [`fake`](#fake)
      - [Parameters](#parameters)
      - [Options](#options)
  - [License](#license)

## Installation

```bash
bun add -D typebox-schema-faker @sinclair/typebox
# or
npm install -D typebox-schema-faker @sinclair/typebox
# or
yarn add -D typebox-schema-faker @sinclair/typebox
```

## Usage

### Basic Usage

```ts
import { Type } from '@sinclair/typebox';
import { fake } from 'typebox-schema-faker';

// Simple types
const name = fake(Type.String({ minLength: 3, maxLength: 10 }));
// "JvR"

const age = fake(Type.Integer({ minimum: 18, maximum: 65 }));
// 42

const isActive = fake(Type.Boolean());
// true

// Formatted strings
const email = fake(Type.String({ format: 'email' }));
// "john.doe@example.com"

const uuid = fake(Type.String({ format: 'uuid' }));
// "550e8400-e29b-41d4-a716-446655440000"
```

### Complex Objects

```ts
const userSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  email: Type.String({ format: 'email' }),
  age: Type.Integer({ minimum: 18, maximum: 100 }),
  isActive: Type.Boolean(),
  tags: Type.Array(Type.String(), { minItems: 1, maxItems: 5 }),
  metadata: Type.Optional(
    Type.Object({
      created: Type.Date(),
      lastLogin: Type.Optional(Type.Date()),
    }),
  ),
});

const fakeUser = fake(userSchema);
// {
//   id: "14b926d2-49da-43d3-95bc-3860cb63c6ef",
//   name: "5WEX6epIjCNOLfzYnmYqRCkOJaqVS8L6ZRs",
//   email: "john.doe@example.com",
//   age: 58,
//   isActive: true,
//   tags: [ "X" ],
//   metadata: undefined
// }
```

### Arrays and Unions

```ts
// Arrays with constraints
const numbers = fake(Type.Array(Type.Number(), { minItems: 3, maxItems: 6 }));
// [42.5, 17.8, 93.2, 11.7]

// Union types
const status = fake(Type.Union([Type.Literal('active'), Type.Literal('inactive'), Type.Literal('pending')]));
// "active"

// Tuples
const coordinates = fake(Type.Tuple([Type.Number(), Type.Number()]));
// [51.5074, -0.1278]
```

### Recursive Schemas

```ts
const treeNodeSchema = Type.Recursive(
  (This) =>
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      children: Type.Array(This, { minItems: 0, maxItems: 3 }),
    }),
  { $id: 'TreeNode' },
);

const tree = fake(treeNodeSchema);
// {
//   id: "abc123",
//   name: "Root",
//   children: [
//     {
//       id: "def456",
//       name: "Child 1",
//       children: [...]
//     }
//   ]
// }
```

### Configuration Options

```ts
const options = {
  maxDepth: 2, // Maximum recursion depth (default: 3)
  probability: 0.7, // Probability optional fields are defined (default: 0.5)
};

const result = fake(schema, options);
```

## Supported TypeBox Schemas

| Schema Type              | Status | Notes                                                 |
| ------------------------ | ------ | ----------------------------------------------------- |
| `Type.Any()`             | ✅     | Generates random primitive types, objects, arrays     |
| `Type.Array()`           | ✅     | Respects `minItems`, `maxItems` constraints           |
| `Type.BigInt()`          | ✅     | Supports `minimum`, `maximum` constraints             |
| `Type.Boolean()`         | ✅     | Generates `true`/`false` values                       |
| `Type.Date()`            | ✅     | Supports `minimumTimestamp`, `maximumTimestamp`       |
| `Type.Function()`        | ✅     | Returns function that generates fake return values    |
| `Type.Integer()`         | ✅     | Supports `minimum`, `maximum` constraints             |
| `Type.Intersect()`       | ✅     | Merges properties from multiple object schemas        |
| `Type.Literal()`         | ✅     | Returns exact literal value                           |
| `Type.Never()`           | ✅     | Throws TypeBoxError (as expected)                     |
| `Type.Null()`            | ✅     | Returns `null`                                        |
| `Type.Number()`          | ✅     | Supports `minimum`, `maximum`, `multipleOf`           |
| `Type.Object()`          | ✅     | Generates all properties, handles nesting             |
| `Type.Optional()`        | ✅     | Conditionally generates `undefined`                   |
| `Type.Promise()`         | ✅     | Returns Promise resolving to fake data                |
| `Type.Readonly()`        | ✅     | Freezes generated objects                             |
| `Type.Record()`          | ✅     | Generates object with dynamic keys/values             |
| `Type.Recursive()`       | ✅     | Handles recursive schemas with depth limiting         |
| `Type.RegExp()`          | ✅     | Generates strings matching regex patterns             |
| `Type.String()`          | ✅     | Supports formats: `email`, `uuid`, `url`, `date-time` |
| `Type.Symbol()`          | ✅     | Generates unique symbols with descriptions            |
| `Type.TemplateLiteral()` | ✅     | Generates strings matching template patterns          |
| `Type.This()`            | ✅     | Resolves recursive references                         |
| `Type.Tuple()`           | ✅     | Fixed-length arrays with typed elements               |
| `Type.Uint8Array()`      | ✅     | Supports `minByteLength`, `maxByteLength`             |
| `Type.Undefined()`       | ✅     | Returns `undefined`                                   |
| `Type.Union()`           | ✅     | Randomly selects from union members                   |
| `Type.Unknown()`         | ✅     | Generates various primitive types (no `undefined`)    |
| `Type.Void()`            | ✅     | Returns `undefined`                                   |
| `Type.Enum()`            | ✅     | Selects random enum value                             |
| `Type.Ref()`             | ❌     | Not yet implemented                                   |
| `Type.Transform()`       | ❌     | Not yet implemented                                   |
| `Type.Unsafe()`          | ❌     | Not yet implemented                                   |

## String Formats

| Format      | Example Output                           |
| ----------- | ---------------------------------------- |
| `email`     | `"john.doe@example.com"`                 |
| `uuid`      | `"550e8400-e29b-41d4-a716-446655440000"` |
| `url`       | `"https://example.com"`                  |
| `date-time` | `"2025-01-15T10:30:00.000Z"`             |

## RegExp Support

Generate strings that match regular expression patterns:

```ts
const phonePattern = fake(Type.RegExp(/^\+?[\d\s\-\(\)]{10,}$/));
// "+1 (555) 123-4567"

const emailPattern = fake(Type.RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
// "user@domain.com"

const uuidPattern = fake(Type.RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i));
// "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## API

### `fake`

`fake<T>(schema: T, options?: Options): Static<T>`

Generates fake data matching the provided TypeBox schema.

#### Parameters

- `schema`: TypeBox schema to generate data for
- `options`: Optional configuration object

#### Options

```ts
type Options = {
  probability?: number; // Chance optional fields are defined (0-1, default: 0.5)
  maxDepth?: number; // Maximum recursion depth (default: 3)
};
```

## License

MIT
