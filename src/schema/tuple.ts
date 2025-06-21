import type { TTuple, Static } from '@sinclair/typebox';
import type { FakerFn } from '../types';
import { rootFake } from '../root';

/**
 * Generates fake data for tuple schemas
 */
export const fakeTuple: FakerFn<TTuple> = (schema, ctx, options) => {
  if (!schema.items) {
    return [];
  }

  // Map over each schema in the tuple and generate fake data
  return schema.items.map((itemSchema) => rootFake(itemSchema, ctx, options)) as Static<TTuple>;
};
