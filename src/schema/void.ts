import type { TVoid } from "@sinclair/typebox";
import type { FakerFn } from "../types";

/**
 * Generates fake data for void schemas
 */
export const fakeVoid: FakerFn<TVoid> = () => {
  return;
};
