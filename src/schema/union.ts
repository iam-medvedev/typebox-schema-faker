import type { TUnion } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for union schemas
 */
export const fakeUnion: FakerFn<TUnion> = (schema) => {
  const selectedSchema = faker.helpers.arrayElement(schema.anyOf);
  return fake(selectedSchema);
};
