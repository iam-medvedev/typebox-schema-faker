import type { TNumber } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for number schemas
 */
export const fakeNumber: FakerFn<TNumber> = (schema, ctx) => {
  const min = schema.minimum ?? 0;
  const max = schema.maximum ?? min + 100;
  const value = ctx.faker.number.float({ min, max });

  if (schema.multipleOf && schema.multipleOf > 0) {
    return Math.round(value / schema.multipleOf) * schema.multipleOf;
  }

  return value;
};
