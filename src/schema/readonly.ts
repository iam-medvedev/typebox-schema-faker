import { type TReadonly, CloneType, ReadonlyKind } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { fake } from "..";

/**
 * Generates fake data for readonly schemas
 */
export const fakeReadonly: FakerFn<TReadonly<any>> = (schema) => {
  const clone = CloneType(schema);
  delete clone[ReadonlyKind];

  return Object.freeze(fake(clone));
};
