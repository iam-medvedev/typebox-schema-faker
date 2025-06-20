import type { TNumber } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";

/**
 * Generates fake data for number schemas
 */
export const fakeNumber: FakerFn<TNumber> = (schema) => {
  const min = schema.minimum ?? 0;
  const max = schema.maximum ?? min + 100;

  const value = faker.number.float({ min, max });

  if (schema.multipleOf) {
    return Math.round(value / schema.multipleOf) * schema.multipleOf;
  }

  return value;
};
