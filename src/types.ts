import type { TSchema, Static } from "@sinclair/typebox";

/**
 * Generic faker function type that takes a TypeBox schema and returns its static type
 */
export type FakerFn<T extends TSchema, Options = never> = (
  schema: T,
  options?: Options
) => Static<T>;
