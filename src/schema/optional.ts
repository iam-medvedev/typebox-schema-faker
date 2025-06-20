import { type TOptional, CloneType, OptionalKind } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";
import { fake } from "../";

type Options = {
  probability?: number;
};

/**
 * Generates fake data for optional schemas
 */
export const fakeOptional: FakerFn<TOptional<any>, Options> = (
  schema,
  options = { probability: 0.5 }
) => {
  // 50% chance of returning undefined for optional fields
  if (faker.datatype.boolean(options)) {
    return undefined;
  }

  const clone = CloneType(schema);
  delete clone[OptionalKind];

  return fake(clone);
};
