import type { TUnknown } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for unknown schemas
 */
export const fakeUnknown: FakerFn<TUnknown> = (_schema, ctx) => {
  const generators = [
    () => ctx.faker.string.alphanumeric(8),
    () => ctx.faker.number.int({ min: 0, max: 1000 }),
    () => ctx.faker.datatype.boolean(),
    () => null,
    () => ({}),
    () => [],
  ];

  const randomGenerator = ctx.faker.helpers.arrayElement(generators);
  return randomGenerator();
};
