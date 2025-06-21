import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../';

describe('fake', () => {
  const schema = Type.Object({
    string: Type.String(),
    boolean: Type.Boolean(),
    array: Type.Array(Type.Number(), { minItems: 2, maxItems: 2 }),
  });

  it('generates fake data', () => {
    const result = fake(schema);

    expect(typeof result.string).toEqual('string');
    expect(typeof result.boolean).toEqual('boolean');
    expect(result.array.length).toEqual(2);
    expect(typeof result.array[0]).toEqual('number');
  });

  it('generates fake with configured probability', () => {
    const result = fake(schema, { probability: 1 });
    expect(result.boolean).toEqual(true);
  });

  it('generates fake with seed', () => {
    const seed = Math.random();
    const results = Array.from({ length: 20 }, () => fake(schema, { seed }));
    const firstEl = results[0]?.string;
    expect(results.every((el) => el.string === firstEl)).toEqual(true);
  });
});
