import type { TOptional } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";
import { rootFake } from "../root";
import { unwrap } from "../unwrap";

/**
 * Generates fake data for optional schemas
 */
export const fakeOptional: FakerFn<TOptional<any>> = (schema, ctx, options) => {
  if (faker.datatype.boolean(options)) {
    return undefined;
  }

  return rootFake(unwrap(schema), ctx, options);
};
