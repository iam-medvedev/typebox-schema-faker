import type { TInteger } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";

/**
 * Generates fake data for integer schemas
 */
export const fakeInteger: FakerFn<TInteger> = (schema) => {
  const min = schema.minimum ?? 0;
  const max = schema.maximum ?? min + 100;

  return faker.number.int({ min, max });
};
