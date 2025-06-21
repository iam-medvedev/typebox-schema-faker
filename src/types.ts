import type { TSchema, Static } from "@sinclair/typebox";

export type Options = {
  probability?: number;
  maxDepth?: number;
};

/**
 * Generic faker function type that takes a TypeBox schema and returns its static type
 */
export type FakerFn<T extends TSchema> = (
  schema: T,
  ctx: Context,
  options: Required<Options>
) => Static<T>;

type SchemaID = string;

export type Context = {
  refs: Map<SchemaID, TSchema>;
  currentDepth: number;
};
