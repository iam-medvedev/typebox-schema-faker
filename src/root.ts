import { type Static, type TSchema, Kind, TypeGuard, TypeBoxError } from '@sinclair/typebox';
import type { FakerContext, FakerOptions } from './types';
import { castSchema } from './cast';
import { fakeAny } from './schema/any';
import { fakeArray } from './schema/array';
import { fakeBigInt } from './schema/bigint';
import { fakeBoolean } from './schema/boolean';
import { fakeDate } from './schema/date';
import { fakeFunction } from './schema/function';
import { fakeInteger } from './schema/integer';
import { fakeIntersect } from './schema/intersect';
import { fakeLiteral } from './schema/literal';
import { fakeNever } from './schema/never';
import { fakeNull } from './schema/null';
import { fakeNumber } from './schema/number';
import { fakeObject } from './schema/object';
import { fakeOptional } from './schema/optional';
import { fakePromise } from './schema/promise';
import { fakeReadonly } from './schema/readonly';
import { fakeRecord } from './schema/record';
import { fakeRecursive } from './schema/recursive';
import { fakeRegExp } from './schema/regexp';
import { fakeString } from './schema/string';
import { fakeSymbol } from './schema/symbol';
import { fakeTemplateLiteral } from './schema/template-literal';
import { fakeThis } from './schema/this';
import { fakeTuple } from './schema/tuple';
import { fakeUint8Array } from './schema/uint8array';
import { fakeUndefined } from './schema/undefined';
import { fakeUnion } from './schema/union';
import { fakeUnknown } from './schema/unknown';
import { fakeVoid } from './schema/void';

/**
 * Root fake data generator
 * Routes schema types to their specific faker implementations
 */
export function rootFake<T extends TSchema>(schema: T, ctx: FakerContext, opts: Partial<FakerOptions>): Static<T> {
  const options: FakerOptions = {
    maxDepth: 3,
    probability: 0.5,
    ...opts,
  };

  // Known kinds
  if (TypeGuard.IsRecursive(schema)) {
    return fakeRecursive(schema, ctx, options);
  }
  if (TypeGuard.IsThis(schema)) {
    return fakeThis(schema, ctx, options);
  }
  if (TypeGuard.IsReadonly(schema)) {
    return fakeReadonly(schema, ctx, options);
  }
  if (TypeGuard.IsOptional(schema)) {
    return fakeOptional(schema, ctx, options);
  }
  if (TypeGuard.IsAny(schema)) {
    return fakeAny(schema, ctx, options);
  }
  if (TypeGuard.IsArray(schema)) {
    return fakeArray(schema, ctx, options);
  }
  if (TypeGuard.IsBigInt(schema)) {
    return fakeBigInt(schema, ctx, options);
  }
  if (TypeGuard.IsBoolean(schema)) {
    return fakeBoolean(schema, ctx, options);
  }
  if (TypeGuard.IsDate(schema)) {
    return fakeDate(schema, ctx, options);
  }
  if (TypeGuard.IsFunction(schema)) {
    return fakeFunction(schema, ctx, options);
  }
  if (TypeGuard.IsInteger(schema)) {
    return fakeInteger(schema, ctx, options);
  }
  if (TypeGuard.IsIntersect(schema)) {
    return fakeIntersect(schema, ctx, options);
  }
  if (TypeGuard.IsLiteral(schema)) {
    return fakeLiteral(schema, ctx, options);
  }
  if (TypeGuard.IsNever(schema)) {
    return fakeNever(schema, ctx, options);
  }
  if (TypeGuard.IsNull(schema)) {
    return fakeNull(schema, ctx, options);
  }
  if (TypeGuard.IsNumber(schema)) {
    return fakeNumber(schema, ctx, options);
  }
  if (TypeGuard.IsObject(schema)) {
    return fakeObject(schema, ctx, options);
  }
  if (TypeGuard.IsPromise(schema)) {
    return fakePromise(schema, ctx, options);
  }
  if (TypeGuard.IsRecord(schema)) {
    return fakeRecord(schema, ctx, options);
  }
  if (TypeGuard.IsRegExp(schema)) {
    return fakeRegExp(schema, ctx, options);
  }
  if (TypeGuard.IsString(schema)) {
    return fakeString(schema, ctx, options);
  }
  if (TypeGuard.IsSymbol(schema)) {
    return fakeSymbol(schema, ctx, options);
  }
  if (TypeGuard.IsTemplateLiteral(schema)) {
    return fakeTemplateLiteral(schema, ctx, options);
  }
  if (TypeGuard.IsTuple(schema)) {
    return fakeTuple(schema, ctx, options);
  }
  if (TypeGuard.IsUndefined(schema)) {
    return fakeUndefined(schema, ctx, options);
  }
  if (TypeGuard.IsUnion(schema)) {
    return fakeUnion(schema, ctx, options);
  }
  if (TypeGuard.IsUint8Array(schema)) {
    return fakeUint8Array(schema, ctx, options);
  }
  if (TypeGuard.IsUnknown(schema)) {
    return fakeUnknown(schema, ctx, options);
  }
  if (TypeGuard.IsVoid(schema)) {
    return fakeVoid(schema, ctx, options);
  }

  // Unknown kinds, but known types, we can cast it
  const castedSchema = castSchema(schema);
  if (castedSchema) {
    return rootFake(castedSchema, ctx, options);
  }

  throw new TypeBoxError(`Unknown or unsupported schema type: ${schema[Kind]}`);
}
