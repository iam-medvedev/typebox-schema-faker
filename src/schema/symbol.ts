import type { TSymbol } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for bigint schemas
 */
export const fakeSymbol: FakerFn<TSymbol> = (_schema, ctx) => {
  return Symbol(ctx.faker.lorem.word());
};
