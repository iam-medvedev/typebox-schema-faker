import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeObject', () => {
  it('generates object with all properties', () => {
    const schema = Type.Object({
      name: Type.String(),
      age: Type.Number(),
      active: Type.Boolean(),
    });

    const result = fake(schema);

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('age');
    expect(result).toHaveProperty('active');
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');
    expect(typeof result.active).toBe('boolean');
  });

  it('handles nested objects', () => {
    const schema = Type.Object({
      user: Type.Object({
        id: Type.String(),
        profile: Type.Object({
          firstName: Type.String(),
          lastName: Type.String(),
        }),
      }),
    });

    const result = fake(schema);

    expect(result.user).toBeDefined();
    expect(result.user.profile).toBeDefined();
    expect(typeof result.user.profile.firstName).toBe('string');
    expect(typeof result.user.profile.lastName).toBe('string');
  });

  it('works with optional properties', () => {
    const schema = Type.Object({
      required: Type.String(),
      optional: Type.Optional(Type.Number()),
    });

    const results = Array.from({ length: 10 }, () => fake(schema));

    results.forEach((result) => {
      expect(result).toHaveProperty('required');
      expect(typeof result.required).toBe('string');
    });

    const hasOptional = results.some((r) => r.optional !== undefined);
    const hasUndefined = results.some((r) => r.optional === undefined);

    expect(hasOptional).toBe(true);
    expect(hasUndefined).toBe(true);
  });
});
