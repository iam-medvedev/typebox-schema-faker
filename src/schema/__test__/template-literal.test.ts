import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeTemplateLiteral', () => {
  it('generates string matching template pattern', () => {
    // Type.TemplateLiteral('user-${string}')
    const schema = Type.TemplateLiteral([Type.Literal('user-'), Type.String()]);
    const result = fake(schema);

    expect(result).toMatch(/^user-.+$/);
  });

  it('works with literal unions in template', () => {
    // Type.TemplateLiteral('${admin|user}-${string}')
    const schema = Type.TemplateLiteral([
      Type.Union([Type.Literal('admin'), Type.Literal('user')]),
      Type.Literal('-'),
      Type.String(),
    ]);
    const result = fake(schema);

    expect(result).toMatch(/^(admin|user)-.+$/);
  });

  it('generates email-like pattern', () => {
    const schema = Type.TemplateLiteral([
      Type.String(),
      Type.Literal('@'),
      Type.String(),
      Type.Literal('.'),
      Type.Union([Type.Literal('com'), Type.Literal('org')]),
    ]);
    const result = fake(schema);

    expect(result).toMatch(/^.+@.+\.(.*)$/);
  });

  it('works with empty template', () => {
    const schema = Type.TemplateLiteral([]);
    const result = fake(schema);

    expect(result).toBe('');
  });
});
