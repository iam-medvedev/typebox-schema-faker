import {
  type TSchema,
  type TReadonly,
  type TOptional,
  type TRecursive,
  OptionalKind,
  ReadonlyKind,
  Hint,
  CloneType,
  TypeGuard,
} from "@sinclair/typebox";

export function unwrap<T extends TSchema>(schema: TReadonly<T>): T;
export function unwrap<T extends TSchema>(schema: TOptional<T>): T;
export function unwrap<T extends TSchema>(schema: TRecursive<T>): T;
export function unwrap<T extends TSchema>(schema: T): T;
export function unwrap<T extends TSchema>(schema: T): TSchema {
  const clone = CloneType(schema);

  if (TypeGuard.IsReadonly(schema)) {
    delete clone[ReadonlyKind];
  }

  if (TypeGuard.IsOptional(schema)) {
    delete clone[OptionalKind];
  }

  if (TypeGuard.IsRecursive(schema)) {
    delete clone[Hint];
  }

  return clone;
}
