import type { TBoolean } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for boolean schemas
 */
export const fakeBoolean: FakerFn<TBoolean> = (_schema, ctx, options) => {
  return ctx.faker.datatype.boolean({ probability: options.probability });
};
