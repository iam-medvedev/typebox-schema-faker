import type { TRegExp } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for RegExp schemas
 */
export const fakeRegExp: FakerFn<TRegExp> = (schema, ctx) => {
  return ctx.randexp(schema.source, schema.flags);
};
