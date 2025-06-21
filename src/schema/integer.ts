import type { TInteger } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for integer schemas
 */
export const fakeInteger: FakerFn<TInteger> = (schema, ctx) => {
  const min = schema.minimum ?? 0;
  const max = schema.maximum ?? min + 100;

  return ctx.faker.number.int({ min, max });
};
