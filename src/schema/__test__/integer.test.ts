import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeInteger', () => {
  it('generates integer within range', () => {
    const schema = Type.Integer({ minimum: 5, maximum: 15 });
    const result = fake(schema);

    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(5);
    expect(result).toBeLessThanOrEqual(15);
  });

  it('generates whole numbers only', () => {
    const schema = Type.Integer({ minimum: 0, maximum: 100 });
    const results = Array.from({ length: 10 }, () => fake(schema));

    results.forEach((result) => {
      expect(Number.isInteger(result)).toBe(true);
    });
  });
});
