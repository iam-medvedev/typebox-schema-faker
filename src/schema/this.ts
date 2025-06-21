import { type TThis, type Static, TypeBoxError } from '@sinclair/typebox';
import type { FakerFn } from '../types';
import { rootFake } from '../root';

/**
 * Generates fake data for This schemas
 */
export const fakeThis: FakerFn<TThis> = (schema, ctx, options) => {
  const ref = schema.$ref;
  if (!ref) {
    throw new TypeBoxError('TThis schema must contain $ref');
  }

  const refSchema = ctx.refs.get(ref);
  if (!refSchema) {
    throw new TypeBoxError(`$ref with id ${ref} does not exist`);
  }

  // Increment current depth usage
  ctx.currentDepth++;
  return rootFake(refSchema, ctx, options) as Static<TThis>;
};
