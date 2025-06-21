import type { TAny } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for any schemas
 */
export const fakeAny: FakerFn<TAny> = (_schema, { faker }) => {
  // Generate random data of various types
  const generators = [
    () => faker.string.alphanumeric(10),
    () => faker.number.float(),
    () => faker.datatype.boolean(),
    () => null,
    () => undefined,
    () => faker.date.recent(),
    () => ({ [faker.word.noun()]: faker.string.sample() }),
    () => faker.helpers.arrayElements([1, 2, 3, 4, 5]),
  ];

  const randomGenerator = faker.helpers.arrayElement(generators);
  return randomGenerator();
};
