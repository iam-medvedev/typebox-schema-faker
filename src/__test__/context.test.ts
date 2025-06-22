import { describe, it, expect } from 'bun:test';
import { createContext } from '../context';

describe('createContext', () => {
  it('returns context with defaults', () => {
    const ctx = createContext();
    expect(ctx.currentDepth).toEqual(0);
    expect(ctx.refs.size).toEqual(0);
    expect(typeof ctx.faker).toEqual('object');
    expect(typeof ctx.randexp).toEqual('function');
  });

  it('handles custom seed', () => {
    const seed = Math.random();
    const results = Array.from({ length: 20 }, () => {
      const ctx = createContext({ seed });
      return { faker: ctx.faker.number.int(), randexp: ctx.randexp('[a-z]+', 'i') };
    });
    expect(results.every((el) => el.faker === results[0]?.faker && el.randexp === results[0]?.randexp)).toEqual(true);
  });
});
