import type { Static, TSchema } from "@sinclair/typebox";
import { createContext } from "./context";
import { rootFake } from "./root";
import type { FakerOptions } from "./types";

/**
 * Generates fake data matching the provided TypeBox schema
 *
 * @template T — The TypeBox schema type
 * @param schema — The TypeBox schema to generate fake data for
 * @returns Fake data matching the schema's static type
 * @throws {TypeBoxError} When the schema type is not supported
 *
 * @example
 * ```ts
 * const nameSchema = Type.String({ minLength: 3, maxLength: 10 });
 * fake(nameSchema); // "a7B9x2"
 * ```
 */
export function fake<T extends TSchema>(
  schema: T,
  options: FakerOptions = {}
): Static<T> {
  return rootFake(schema, createContext(), options);
}
