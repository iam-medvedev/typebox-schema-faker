import type { TSymbol } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import type { FakerFn } from '../types';

/**
 * Generates fake data for bigint schemas
 */
export const fakeSymbol: FakerFn<TSymbol> = () => {
  return Symbol(faker.lorem.word());
};
