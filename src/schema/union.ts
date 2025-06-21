import type { TUnion } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import type { FakerFn } from '../types';
import { rootFake } from '../root';

/**
 * Generates fake data for union schemas
 */
export const fakeUnion: FakerFn<TUnion> = (schema, ctx, options) => {
  const selectedSchema = faker.helpers.arrayElement(schema.anyOf);
  return rootFake(selectedSchema, ctx, options);
};
