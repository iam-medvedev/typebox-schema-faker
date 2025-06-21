import { type TRecursive, type TSchema, TypeBoxError } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { rootFake } from "../root";
import { unwrap } from "../utils";

/**
 * Generates fake data for recursive schemas
 */
export const fakeRecursive: FakerFn<TRecursive<TSchema>> = (
  schema,
  ctx,
  options
) => {
  const unwrapped = unwrap(schema);
  const id = unwrapped.$id;
  if (!id) {
    throw new TypeBoxError("TRecursive schema must contain $id");
  }

  // Cache ref
  if (!ctx.refs.has(id)) {
    ctx.refs.set(id, unwrapped);
  }

  // Reset current depth
  ctx.currentDepth = 0;

  return rootFake(unwrapped, ctx, options);
};
