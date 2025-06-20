import { type TNever, TypeBoxError } from "@sinclair/typebox";
import type { FakerFn } from "../types";

/**
 * Generates fake data for never schemas
 */
export const fakeNever: FakerFn<TNever> = () => {
  throw new TypeBoxError("Type TNever reached");
};
