import type { TPromise } from '@sinclair/typebox';
import type { FakerFn } from '../types';
import { rootFake } from '../root';

/**
 * Generates fake data for promise schemas
 */
export const fakePromise: FakerFn<TPromise> = (schema, ctx, options) => {
  const itemSchema = schema.item;

  return Promise.resolve(rootFake(itemSchema, ctx, options));
};
