import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeSymbol', () => {
  it('generates Symbol values', () => {
    const schema = Type.Symbol();
    const result = fake(schema);

    expect(typeof result).toBe('symbol');
  });

  it('generates unique symbols', () => {
    const schema = Type.Symbol();
    const results = Array.from({ length: 10 }, () => fake(schema));

    // All symbols should be unique
    const uniqueSymbols = new Set(results);
    expect(uniqueSymbols.size).toBe(10);

    // No two symbols should be equal
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        expect(results[i]).not.toBe(results[j]);
      }
    }
  });

  it('generates symbols with descriptions', () => {
    const schema = Type.Symbol();
    const result = fake(schema);

    // Symbol should have a description
    expect(result.description).toBeDefined();
    expect(typeof result.description).toBe('string');
  });

  it('works in objects', () => {
    const schema = Type.Object({
      id: Type.Symbol(),
      name: Type.String(),
    });
    const result = fake(schema);

    expect(typeof result.id).toBe('symbol');
    expect(typeof result.name).toBe('string');
  });

  it('works in arrays', () => {
    const schema = Type.Array(Type.Symbol(), { minItems: 3 });
    const result = fake(schema);

    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result.every((item) => typeof item === 'symbol')).toBe(true);

    // All symbols in array should be unique
    const uniqueSymbols = new Set(result);
    expect(uniqueSymbols.size).toBe(result.length);
  });
});
