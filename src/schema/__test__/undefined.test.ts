import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeUndefined', () => {
  it('always returns undefined', () => {
    const schema = Type.Undefined();
    const result = fake(schema);

    expect(result).toBe(undefined);
    expect(result).not.toBe(null);
  });
});
