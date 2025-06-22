import type { TTemplateLiteral, Static } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for template literal schemas
 */
export const fakeTemplateLiteral: FakerFn<TTemplateLiteral> = (schema, ctx) => {
  return ctx.randexp(schema.pattern) as Static<TTemplateLiteral>;
};
