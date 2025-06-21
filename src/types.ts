import type { TSchema, Static } from "@sinclair/typebox";

/**
 * Faker configuration options
 */
export type FakerOptions = {
  /** Chance (0-1) that optional fields are undefined (default: 0.5) */
  probability?: number;
  /** Maximum recursion depth before stopping generation (default: 3) */
  maxDepth?: number;
};

/**
 * Generic faker function type that takes a TypeBox schema and returns its static type
 */
export type FakerFn<T extends TSchema> = (
  schema: T,
  ctx: FakerContext,
  options: Required<FakerOptions>
) => Static<T>;

type SchemaID = string;

/**
 * Faker context for tracking schema references and recursion depth
 */
export type FakerContext = {
  /** Map of schema IDs to their definitions for recursive resolution */
  refs: Map<SchemaID, TSchema>;
  /** Current nesting level to prevent infinite recursion */
  currentDepth: number;
};
