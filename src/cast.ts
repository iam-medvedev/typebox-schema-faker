import { type TSchema, Hint, Kind } from '@sinclair/typebox';

/**
 * A guard for schemas with type property
 */
function isSchemaWithType(schema: TSchema): schema is TSchema & { type: string } {
  return 'type' in schema;
}

/**
 * Function to cast schemas with unknown Kind to known using `schema.type` or `schema[Hint]`
 */
export function castSchema<T extends TSchema>(schema: T): TSchema | null {
  if (schema[Hint] === 'Enum') {
    return { ...schema, [Kind]: 'Union' };
  }

  if (!isSchemaWithType(schema)) {
    return null;
  }

  if (schema.type === 'string') {
    return { ...schema, [Kind]: 'String' };
  }
  if (schema.type === 'number') {
    return { ...schema, [Kind]: 'Number' };
  }
  if (schema.type === 'boolean') {
    return { ...schema, [Kind]: 'Boolean' };
  }
  if (schema.type === 'integer') {
    return { ...schema, [Kind]: 'Integer' };
  }
  if (schema.type === 'null') {
    return { ...schema, [Kind]: 'Null' };
  }
  if (schema.type === 'array') {
    return { ...schema, [Kind]: 'Array' };
  }
  if (schema.type === 'object') {
    return { ...schema, [Kind]: 'Object' };
  }
  if (schema.type === 'Uint8Array') {
    return { ...schema, [Kind]: 'Uint8Array' };
  }
  if (schema.type === 'Date') {
    return { ...schema, [Kind]: 'Date' };
  }
  if (schema.type === 'undefined') {
    return { ...schema, [Kind]: 'Undefined' };
  }
  if (schema.type === 'symbol') {
    return { ...schema, [Kind]: 'Symbol' };
  }
  if (schema.type === 'bigint') {
    return { ...schema, [Kind]: 'BigInt' };
  }
  if (schema.type === 'void') {
    return { ...schema, [Kind]: 'Void' };
  }

  return null;
}
