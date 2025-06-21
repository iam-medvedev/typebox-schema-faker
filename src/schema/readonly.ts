import type { TReadonly } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { rootFake } from "../root";
import { unwrap } from "../utils";

/**
 * Generates fake data for readonly schemas
 */
export const fakeReadonly: FakerFn<TReadonly<any>> = (schema, ctx, options) => {
  return Object.freeze(rootFake(unwrap(schema), ctx, options));
};
