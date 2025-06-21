import type { TArray } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import type { FakerFn } from '../types';
import { rootFake } from '../root';
import { EmptyRecursiveItem } from '../symbols';

/**
 * Generates fake data for array schemas
 */
export const fakeArray: FakerFn<TArray> = (schema, ctx, options) => {
  const min = schema.minItems ?? 0;
  const max = schema.maxItems ?? Math.max(min + 3, 5);
  const length = faker.number.int({ min, max });

  return Array.from({ length }, () => rootFake(schema.items, ctx, options)).filter((el) => el !== EmptyRecursiveItem);
};
