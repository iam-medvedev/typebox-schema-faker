import type { TNull } from "@sinclair/typebox";
import type { FakerFn } from "../types";

/**
 * Generates fake data for null schemas
 */
export const fakeNull: FakerFn<TNull> = () => {
  return null;
};
