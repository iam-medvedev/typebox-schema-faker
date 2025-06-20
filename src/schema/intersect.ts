import type { TIntersect } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for intersect schemas
 */
export const fakeIntersect: FakerFn<TIntersect> = (schema) => {
  let result = {};

  for (const subSchema of schema.allOf) {
    const generated = fake(subSchema);

    // Only merge if it's an object (intersect typically uses objects)
    if (
      generated &&
      typeof generated === "object" &&
      !Array.isArray(generated)
    ) {
      result = { ...result, ...generated };
    }
  }

  return result;
};
