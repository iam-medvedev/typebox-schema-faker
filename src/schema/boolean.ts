import type { TBoolean } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";

/**
 * Generates fake data for boolean schemas
 */
export const fakeBoolean: FakerFn<TBoolean> = () => {
  return faker.datatype.boolean();
};
