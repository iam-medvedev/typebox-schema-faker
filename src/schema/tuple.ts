import type { TTuple, Static } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for tuple schemas
 */
export const fakeTuple: FakerFn<TTuple> = (schema) => {
  if (!schema.items) {
    return [];
  }

  // Map over each schema in the tuple and generate fake data
  return schema.items.map((itemSchema) => fake(itemSchema)) as Static<TTuple>;
};
