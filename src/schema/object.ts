import type { TObject } from '@sinclair/typebox';
import type { FakerFn } from '../types';
import { rootFake } from '../root';
import { EmptyRecursiveItem } from '../symbols';

/**
 * Generates fake data for object schemas
 */
export const fakeObject: FakerFn<TObject> = (schema, ctx, options) => {
  const result: any = {};

  // Break deep recursive processing
  if (ctx.currentDepth >= options.maxDepth) {
    return EmptyRecursiveItem;
  }

  // Generate fake data for each property
  for (const [key, propSchema] of Object.entries(schema.properties)) {
    result[key] = rootFake(propSchema, ctx, options);
  }

  return result;
};
