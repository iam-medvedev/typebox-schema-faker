import type { Static, TSchema } from "@sinclair/typebox";
import { Kind, TypeGuard, TypeBoxError } from "@sinclair/typebox";
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
import { fakeString } from "./schema/string";
import { fakeSymbol } from "./schema/symbol";
import { fakeTemplateLiteral } from "./schema/template-literal";
import { fakeTuple } from "./schema/tuple";
import { fakeUint8Array } from "./schema/uint8array";
import { fakeUndefined } from "./schema/undefined";
import { fakeUnion } from "./schema/union";
import { fakeUnknown } from "./schema/unknown";
import { fakeVoid } from "./schema/void";

type Options = {
  probability?: number;
};

/**
 * Generates fake data matching the provided TypeBox schema
 *
 * @template T — The TypeBox schema type
 * @param schema — The TypeBox schema to generate fake data for
 * @returns Fake data matching the schema's static type
 * @throws {TypeBoxError} When the schema type is not supported
 *
 * @example
 * ```ts
 * const nameSchema = Type.String({ minLength: 3, maxLength: 10 });
 * fake(nameSchema); // "a7B9x2"
 * ```
 */
export function fake<T extends TSchema>(
  schema: T,
  options: Options = {}
): Static<T> {
  if (TypeGuard.IsReadonly(schema)) {
    return fakeReadonly(schema);
  }
  if (TypeGuard.IsOptional(schema)) {
    return fakeOptional(schema, { probability: options.probability });
  }
  if (TypeGuard.IsAny(schema)) {
    return fakeAny(schema);
  }
  if (TypeGuard.IsArgument(schema)) {
    // return fakeArgument(schema);
  }
  if (TypeGuard.IsArray(schema)) {
    return fakeArray(schema);
  }
  if (TypeGuard.IsAsyncIterator(schema)) {
    // return fakeAsyncIterator(schema);
  }
  if (TypeGuard.IsBigInt(schema)) {
    return fakeBigInt(schema);
  }
  if (TypeGuard.IsBoolean(schema)) {
    return fakeBoolean(schema);
  }
  if (TypeGuard.IsComputed(schema)) {
    // return fakeComputed(schema);
  }
  if (TypeGuard.IsConstructor(schema)) {
    // return fakeConstructor(schema);
  }
  if (TypeGuard.IsDate(schema)) {
    return fakeDate(schema);
  }
  if (TypeGuard.IsFunction(schema)) {
    return fakeFunction(schema);
  }
  if (TypeGuard.IsImport(schema)) {
    // return fakeImport(schema);
  }
  if (TypeGuard.IsInteger(schema)) {
    return fakeInteger(schema);
  }
  if (TypeGuard.IsProperties(schema)) {
    // return fakeProperties(schema);
  }
  if (TypeGuard.IsIntersect(schema)) {
    return fakeIntersect(schema);
  }
  if (TypeGuard.IsIterator(schema)) {
    // return fakeIterator(schema);
  }
  // if (TypeGuard.IsKindOf(schema)) {
  //   // return fakeKindOf(schema);
  // }
  if (TypeGuard.IsLiteral(schema)) {
    return fakeLiteral(schema);
  }
  if (TypeGuard.IsLiteralValue(schema)) {
    // return fakeLiteralValue(schema);
  }
  if (TypeGuard.IsMappedKey(schema)) {
    // return fakeMappedKey(schema);
  }
  if (TypeGuard.IsMappedResult(schema)) {
    // return fakeMappedResult(schema);
  }
  if (TypeGuard.IsNever(schema)) {
    return fakeNever(schema);
  }
  if (TypeGuard.IsNot(schema)) {
    // return fakeNot(schema);
  }
  if (TypeGuard.IsNull(schema)) {
    return fakeNull(schema);
  }
  if (TypeGuard.IsNumber(schema)) {
    return fakeNumber(schema);
  }
  if (TypeGuard.IsObject(schema)) {
    return fakeObject(schema);
  }
  if (TypeGuard.IsPromise(schema)) {
    return fakePromise(schema);
  }
  if (TypeGuard.IsRecord(schema)) {
    return fakeRecord(schema);
  }
  if (TypeGuard.IsRecursive(schema)) {
    // return fakeRecursive(schema);
  }
  if (TypeGuard.IsRef(schema)) {
    // return fakeRef(schema);
  }
  if (TypeGuard.IsRegExp(schema)) {
    // return fakeRegExp(schema);
  }
  if (TypeGuard.IsString(schema)) {
    return fakeString(schema);
  }
  if (TypeGuard.IsSymbol(schema)) {
    return fakeSymbol(schema);
  }
  if (TypeGuard.IsTemplateLiteral(schema)) {
    return fakeTemplateLiteral(schema);
  }
  if (TypeGuard.IsThis(schema)) {
    // return fakeThis(schema);
  }
  if (TypeGuard.IsTransform(schema)) {
    // return fakeTransform(schema);
  }
  if (TypeGuard.IsTuple(schema)) {
    return fakeTuple(schema);
  }
  if (TypeGuard.IsUndefined(schema)) {
    return fakeUndefined(schema);
  }
  if (TypeGuard.IsUnion(schema)) {
    return fakeUnion(schema);
  }
  if (TypeGuard.IsUint8Array(schema)) {
    return fakeUint8Array(schema);
  }
  if (TypeGuard.IsUnknown(schema)) {
    return fakeUnknown(schema);
  }
  // if (TypeGuard.IsUnsafe(schema)) {
  //   // return fakeUnsafe(schema);
  // }
  if (TypeGuard.IsVoid(schema)) {
    return fakeVoid(schema);
  }
  // if (TypeGuard.IsKind(schema)) {
  //   // return fakeKind(schema);
  // }
  // if (TypeGuard.IsSchema(schema)) {
  //   // return fakeSchema(schema);
  // }

  throw new TypeBoxError(`Unknown schema type: ${schema[Kind]}`);
}
