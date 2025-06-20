import type { TFunction } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for function schemas
 */
export const fakeFunction: FakerFn<TFunction> = (schema) => {
  const returnSchema = schema.returns;

  return (..._args: any[]) => {
    return fake(returnSchema);
  };
};
