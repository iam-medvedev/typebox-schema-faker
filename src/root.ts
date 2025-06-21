import {
  type Static,
  type TSchema,
  Kind,
  TypeGuard,
  TypeBoxError,
} from "@sinclair/typebox";
import type { FakerContext, FakerOptions } from "./types";
import { fakeAny } from "./schema/any";
import { fakeArray } from "./schema/array";
import { fakeBigInt } from "./schema/bigint";
import { fakeBoolean } from "./schema/boolean";
import { fakeDate } from "./schema/date";
import { fakeFunction } from "./schema/function";
import { fakeInteger } from "./schema/integer";
import { fakeIntersect } from "./schema/intersect";
import { fakeLiteral } from "./schema/literal";
import { fakeNever } from "./schema/never";
import { fakeNull } from "./schema/null";
import { fakeNumber } from "./schema/number";
import { fakeObject } from "./schema/object";
import { fakeOptional } from "./schema/optional";
import { fakePromise } from "./schema/promise";
import { fakeReadonly } from "./schema/readonly";
import { fakeRecord } from "./schema/record";
import { fakeRecursive } from "./schema/recursive";
import { fakeRegExp } from "./schema/regexp";
import { fakeString } from "./schema/string";
import { fakeSymbol } from "./schema/symbol";
import { fakeTemplateLiteral } from "./schema/template-literal";
import { fakeThis } from "./schema/this";
import { fakeTuple } from "./schema/tuple";
import { fakeUint8Array } from "./schema/uint8array";
import { fakeUndefined } from "./schema/undefined";
import { fakeUnion } from "./schema/union";
import { fakeUnknown } from "./schema/unknown";
import { fakeVoid } from "./schema/void";

/**
 * Root fake data generator
 * Routes schema types to their specific faker implementations
 */
export function rootFake<T extends TSchema>(
  schema: T,
  ctx: FakerContext,
  opts: FakerOptions
): Static<T> {
  const options: Required<FakerOptions> = {
    maxDepth: 3,
    probability: 0.5,
    ...opts,
  };

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
  if (TypeGuard.IsArgument(schema)) {
    // return fakeArgument(schema, ctx, options);
  }
  if (TypeGuard.IsArray(schema)) {
    return fakeArray(schema, ctx, options);
  }
  if (TypeGuard.IsAsyncIterator(schema)) {
    // return fakeAsyncIterator(schema, ctx, options);
  }
  if (TypeGuard.IsBigInt(schema)) {
    return fakeBigInt(schema, ctx, options);
  }
  if (TypeGuard.IsBoolean(schema)) {
    return fakeBoolean(schema, ctx, options);
  }
  if (TypeGuard.IsComputed(schema)) {
    // return fakeComputed(schema, ctx, options);
  }
  if (TypeGuard.IsConstructor(schema)) {
    // return fakeConstructor(schema, ctx, options);
  }
  if (TypeGuard.IsDate(schema)) {
    return fakeDate(schema, ctx, options);
  }
  if (TypeGuard.IsFunction(schema)) {
    return fakeFunction(schema, ctx, options);
  }
  if (TypeGuard.IsImport(schema)) {
    // return fakeImport(schema, ctx, options);
  }
  if (TypeGuard.IsInteger(schema)) {
    return fakeInteger(schema, ctx, options);
  }
  if (TypeGuard.IsProperties(schema)) {
    // return fakeProperties(schema, ctx, options);
  }
  if (TypeGuard.IsIntersect(schema)) {
    return fakeIntersect(schema, ctx, options);
  }
  if (TypeGuard.IsIterator(schema)) {
    // return fakeIterator(schema, ctx, options);
  }
  // if (TypeGuard.IsKindOf(schema)) {
  //   // return fakeKindOf(schema, ctx, options);
  // }
  if (TypeGuard.IsLiteral(schema)) {
    return fakeLiteral(schema, ctx, options);
  }
  if (TypeGuard.IsLiteralValue(schema)) {
    // return fakeLiteralValue(schema, ctx, options);
  }
  if (TypeGuard.IsMappedKey(schema)) {
    // return fakeMappedKey(schema, ctx, options);
  }
  if (TypeGuard.IsMappedResult(schema)) {
    // return fakeMappedResult(schema, ctx, options);
  }
  if (TypeGuard.IsNever(schema)) {
    return fakeNever(schema, ctx, options);
  }
  if (TypeGuard.IsNot(schema)) {
    // return fakeNot(schema, ctx, options);
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
  if (TypeGuard.IsRef(schema)) {
    // return fakeRef(schema, ctx, options);
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
  if (TypeGuard.IsTransform(schema)) {
    // return fakeTransform(schema, ctx, options);
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
  // if (TypeGuard.IsUnsafe(schema)) {
  //   // return fakeUnsafe(schema, ctx, options);
  // }
  if (TypeGuard.IsVoid(schema)) {
    return fakeVoid(schema, ctx, options);
  }
  // if (TypeGuard.IsKind(schema)) {
  //   // return fakeKind(schema, ctx, options);
  // }
  // if (TypeGuard.IsSchema(schema)) {
  //   // return fakeSchema(schema, ctx, options);
  // }

  throw new TypeBoxError(`Unknown schema type: ${schema[Kind]}`);
}
