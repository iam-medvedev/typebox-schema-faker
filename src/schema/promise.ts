import type { TPromise } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for promise schemas
 */
export const fakePromise: FakerFn<TPromise> = (schema) => {
  const itemSchema = schema.item;

  return Promise.resolve(fake(itemSchema));
};
