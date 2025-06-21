import type { TUnknown } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import type { FakerFn } from '../types';

/**
 * Generates fake data for unknown schemas
 */
export const fakeUnknown: FakerFn<TUnknown> = () => {
  // Ensure we never return undefined
  const generators = [
    () => faker.string.alphanumeric(8),
    () => faker.number.int({ min: 0, max: 1000 }),
    () => faker.datatype.boolean(),
    () => null,
    () => ({}), // empty object
    () => [], // empty array
  ];

  const randomGenerator = faker.helpers.arrayElement(generators);
  return randomGenerator();
};
