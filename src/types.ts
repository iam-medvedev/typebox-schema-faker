import type { TSchema, Static } from '@sinclair/typebox';
import type { Faker } from '@faker-js/faker';

/**
 * Faker configuration options
 */
export interface FakerOptions {
  /** Chance (0-1) that optional fields are undefined (default: 0.5) */
  probability: number;
  /** Maximum recursion depth before stopping generation (default: 3) */
  maxDepth: number;
  /** The seed number can be used to generate reproducible values */
  seed?: number;
}

/**
 * Generic faker function type that takes a TypeBox schema and returns its static type
 */
export type FakerFn<T extends TSchema> = (schema: T, ctx: FakerContext, options: FakerOptions) => Static<T>;

type SchemaID = string;

/**
 * Faker context for tracking schema references and recursion depth
 */
export interface FakerContext {
  /** Map of schema IDs to their definitions for recursive resolution */
  refs: Map<SchemaID, TSchema>;
  /** Current nesting level to prevent infinite recursion */
  currentDepth: number;
  /** Faker.js instance */
  faker: Faker;
}
