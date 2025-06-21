import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeUnknown', () => {
  it('generates various primitive types', () => {
    const schema = Type.Unknown();
    const results = Array.from({ length: 20 }, () => fake(schema));

    const hasString = results.some((r) => typeof r === 'string');
    const hasNumber = results.some((r) => typeof r === 'number');
    const hasBoolean = results.some((r) => typeof r === 'boolean');
    const hasNull = results.some((r) => r === null);

    expect(hasString || hasNumber || hasBoolean || hasNull).toBe(true);
  });

  it('never returns undefined', () => {
    const schema = Type.Unknown();
    const results = Array.from({ length: 10 }, () => fake(schema));

    expect(results).not.toContain(undefined);
  });
});
