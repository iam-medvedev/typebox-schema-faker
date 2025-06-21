import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeRecord', () => {
  it('generates object with string keys and typed values', () => {
    const schema = Type.Record(Type.String(), Type.Number());
    const result = fake(schema);

    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBeGreaterThan(0);

    Object.entries(result).forEach(([key, value]) => {
      expect(typeof key).toBe('string');
      expect(typeof value).toBe('number');
    });
  });

  it('generates multiple entries', () => {
    const schema = Type.Record(Type.String(), Type.Boolean());
    const result = fake(schema);

    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result).length).toBeLessThanOrEqual(5);
  });

  it('works with complex value types', () => {
    const schema = Type.Record(
      Type.String(),
      Type.Object({
        id: Type.String(),
        active: Type.Boolean(),
      }),
    );

    const result = fake(schema);

    Object.values(result).forEach((value) => {
      expect(value).toHaveProperty('id');
      expect(value).toHaveProperty('active');
      expect(typeof value.id).toBe('string');
      expect(typeof value.active).toBe('boolean');
    });
  });
});
