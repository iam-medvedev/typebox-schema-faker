import type { TUnion } from '@sinclair/typebox';
import type { FakerFn } from '../types';
import { rootFake } from '../root';

/**
 * Generates fake data for union schemas
 */
export const fakeUnion: FakerFn<TUnion> = (schema, ctx, options) => {
  const selectedSchema = ctx.faker.helpers.arrayElement(schema.anyOf);
  return rootFake(selectedSchema, ctx, options);
};
