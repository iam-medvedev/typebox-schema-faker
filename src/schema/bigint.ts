import type { TBigInt } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for bigint schemas
 */
export const fakeBigInt: FakerFn<TBigInt> = (schema, ctx) => {
  return BigInt(ctx.faker.number.bigInt({ min: schema.minimum, max: schema.maximum }));
};
