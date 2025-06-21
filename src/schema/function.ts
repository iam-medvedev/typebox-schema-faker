import type { TFunction } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { rootFake } from "../root";

/**
 * Generates fake data for function schemas
 */
export const fakeFunction: FakerFn<TFunction> = (schema, ctx, options) => {
  const returnSchema = schema.returns;

  return (..._args: any[]) => {
    return rootFake(returnSchema, ctx, options);
  };
};
