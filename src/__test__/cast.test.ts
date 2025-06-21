import { describe, it, expect } from 'bun:test';
import { CreateType, TypeGuard, Type, Kind, type TSchema } from '@sinclair/typebox';
import { castSchema } from '../cast';

const customKind = Symbol.for('testKind');
function createCustomSchema(schema: TSchema): TSchema {
  return CreateType({ ...schema, [Kind]: customKind }) as TSchema;
}

describe('castSchema', () => {
  it('returns null for schemas without type property', () => {
    const schema = { [Kind]: customKind };
    // @ts-expect-error for test
    const result = castSchema(schema);
    expect(result).toBeNull();
  });

  it('casts string schema', () => {
    const schema = createCustomSchema(Type.String());
    expect(TypeGuard.IsString(schema)).toBe(false);
    expect(TypeGuard.IsString(castSchema(schema))).toBe(true);
  });

  it('casts number schema', () => {
    const schema = createCustomSchema(Type.Number());
    expect(TypeGuard.IsNumber(schema)).toBe(false);
    expect(TypeGuard.IsNumber(castSchema(schema))).toBe(true);
  });

  it('casts boolean schema', () => {
    const schema = createCustomSchema(Type.Boolean());
    expect(TypeGuard.IsBoolean(schema)).toBe(false);
    expect(TypeGuard.IsBoolean(castSchema(schema))).toBe(true);
  });

  it('casts integer schema', () => {
    const schema = createCustomSchema(Type.Integer());
    expect(TypeGuard.IsInteger(schema)).toBe(false);
    expect(TypeGuard.IsInteger(castSchema(schema))).toBe(true);
  });

  it('casts null schema', () => {
    const schema = createCustomSchema(Type.Null());
    expect(TypeGuard.IsNull(schema)).toBe(false);
    expect(TypeGuard.IsNull(castSchema(schema))).toBe(true);
  });

  it('casts array schema', () => {
    const schema = createCustomSchema(Type.Array(Type.String()));
    expect(TypeGuard.IsArray(schema)).toBe(false);
    expect(TypeGuard.IsArray(castSchema(schema))).toBe(true);
  });

  it('casts object schema', () => {
    const schema = createCustomSchema(Type.Object({}));
    expect(TypeGuard.IsObject(schema)).toBe(false);
    expect(TypeGuard.IsObject(castSchema(schema))).toBe(true);
  });

  it('casts Uint8Array schema', () => {
    const schema = createCustomSchema(Type.Uint8Array());
    expect(TypeGuard.IsUint8Array(schema)).toBe(false);
    expect(TypeGuard.IsUint8Array(castSchema(schema))).toBe(true);
  });

  it('casts date schema', () => {
    const schema = createCustomSchema(Type.Date());
    expect(TypeGuard.IsDate(schema)).toBe(false);
    expect(TypeGuard.IsDate(castSchema(schema))).toBe(true);
  });

  it('casts undefined schema', () => {
    const schema = createCustomSchema(Type.Undefined());
    expect(TypeGuard.IsUndefined(schema)).toBe(false);
    expect(TypeGuard.IsUndefined(castSchema(schema))).toBe(true);
  });

  it('casts symbol schema', () => {
    const schema = createCustomSchema(Type.Symbol());
    expect(TypeGuard.IsSymbol(schema)).toBe(false);
    expect(TypeGuard.IsSymbol(castSchema(schema))).toBe(true);
  });

  it('casts bigint schema', () => {
    const schema = createCustomSchema(Type.BigInt());
    expect(TypeGuard.IsBigInt(schema)).toBe(false);
    expect(TypeGuard.IsBigInt(castSchema(schema))).toBe(true);
  });

  it('casts void schema', () => {
    const schema = createCustomSchema(Type.Void());
    expect(TypeGuard.IsVoid(schema)).toBe(false);
    expect(TypeGuard.IsVoid(castSchema(schema))).toBe(true);
  });

  it('casts enum schema', () => {
    enum Test {
      active = 'active',
      inactive = 'inactive',
      pending = 'pending',
    }
    const schema = createCustomSchema(Type.Enum(Test));
    expect(TypeGuard.IsUnion(schema)).toBe(false);
    expect(TypeGuard.IsUnion(castSchema(schema))).toBe(true);
  });
});
