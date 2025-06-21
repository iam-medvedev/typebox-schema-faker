import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakePromise', () => {
  it('returns a promise that resolves to expected type', async () => {
    const schema = Type.Promise(Type.String());
    const result = fake(schema);

    expect(result).toBeInstanceOf(Promise);

    const value = await result;
    expect(typeof value).toBe('string');
  });

  it('resolves to object structure', async () => {
    const schema = Type.Promise(
      Type.Object({
        user: Type.String(),
        score: Type.Number(),
      }),
    );
    const result = fake(schema);

    const value = await result;
    expect(value).toHaveProperty('user');
    expect(typeof value.user).toBe('string');
    expect(typeof value.score).toBe('number');
  });
});
