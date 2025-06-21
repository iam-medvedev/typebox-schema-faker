import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeFunction', () => {
  it('returns a function', () => {
    const schema = Type.Function([Type.String(), Type.Number()], Type.Boolean());
    const result = fake(schema);

    expect(typeof result).toBe('function');
    const output = result('hello', 123);
    expect(typeof output).toBe('boolean');
  });

  it('works with void return', () => {
    const schema = Type.Function([], Type.Void());
    const result = fake(schema);

    const output = result();
    expect(output).toBe(undefined);
  });

  it('works with object return type', () => {
    const schema = Type.Function([], Type.Object({ name: Type.String() }));
    const result = fake(schema);

    const output = result();
    expect(output).toHaveProperty('name');
    expect(typeof output.name).toBe('string');
  });
});
