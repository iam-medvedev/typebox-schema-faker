import type { TArray } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for array schemas
 */
export const fakeArray: FakerFn<TArray> = (schema) => {
  const min = schema.minItems ?? 0;
  const max = schema.maxItems ?? Math.max(min + 3, 5);
  const length = faker.number.int({ min, max });

  return Array.from({ length }, () => fake(schema.items));
};
