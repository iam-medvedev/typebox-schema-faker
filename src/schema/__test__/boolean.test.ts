import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeBoolean', () => {
  it('generates boolean values', () => {
    const schema = Type.Boolean();
    const result = fake(schema);

    expect(typeof result).toBe('boolean');
    expect([true, false]).toContain(result);
  });

  it('generates both true and false over multiple runs', () => {
    const schema = Type.Boolean();
    const results = Array.from({ length: 20 }, () => fake(schema));

    expect(results).toContain(true);
    expect(results).toContain(false);
  });
});
