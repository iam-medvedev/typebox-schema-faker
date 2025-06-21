import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeOptional', () => {
  it('returns undefined', () => {
    const schema = Type.Optional(Type.String());
    const result = fake(schema, { probability: 1 });
    expect(result).toBe(undefined!);
  });

  it('returns value', () => {
    const schema = Type.Optional(Type.String());
    const result = fake(schema, { probability: 0 });
    expect(typeof result).toBe('string');
  });
});
