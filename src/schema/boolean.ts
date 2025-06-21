import type { TBoolean } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import type { FakerFn } from '../types';

/**
 * Generates fake data for boolean schemas
 */
export const fakeBoolean: FakerFn<TBoolean> = (_schema, _ctx, options) => {
  return faker.datatype.boolean({ probability: options.probability });
};
