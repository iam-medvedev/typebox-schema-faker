import type { TDate } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for date schemas
 */
export const fakeDate: FakerFn<TDate> = (schema, ctx) => {
  const from = schema.minimumTimestamp ?? new Date(-8.64e15);
  const to = schema.maximumTimestamp ?? new Date(8.64e15);

  return ctx.faker.date.between({ from, to });
};
