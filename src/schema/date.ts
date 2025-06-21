import type { TDate } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";

/**
 * Generates fake data for date schemas
 */
export const fakeDate: FakerFn<TDate> = (schema) => {
  const from = schema.minimumTimestamp ?? new Date(-8.64e15);
  const to = schema.maximumTimestamp ?? new Date(8.64e15);

  return faker.date.between({ from, to });
};
