import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeRecursive', () => {
  it('generates finite tree structures', () => {
    // Define a recursive tree node schema
    const TreeNode = Type.Recursive(
      (This) =>
        Type.Object({
          id: Type.String(),
          name: Type.String(),
          children: Type.Array(This, { minItems: 1 }),
        }),
      { $id: 'TreeNode' },
    );

    const result = fake(TreeNode);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(typeof result.id).toBe('string');
    expect(typeof result.name).toBe('string');
    expect(result.children.length).toBeGreaterThan(0);
    expect(result.children[0]?.children.length).toBeGreaterThan(0);
  });
});
