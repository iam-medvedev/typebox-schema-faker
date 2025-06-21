import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeReadonly', () => {
  it('freezes primitive', () => {
    const schema = Type.Readonly(Type.Object({}));
    const result = fake(schema);
    expect(Object.isFrozen(result)).toBe(true);
  });
});
