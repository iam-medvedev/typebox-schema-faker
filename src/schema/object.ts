import type { TObject } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for object schemas
 */
export const fakeObject: FakerFn<TObject> = (schema) => {
  const result: any = {};

  // Generate fake data for each property
  for (const [key, propSchema] of Object.entries(schema.properties)) {
    result[key] = fake(propSchema);
  }

  return result;
};
