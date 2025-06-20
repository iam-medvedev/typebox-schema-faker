import type { TSymbol } from "@sinclair/typebox";
import type { FakerFn } from "../types";
import { faker } from "@faker-js/faker";

/**
 * Generates fake data for bigint schemas
 */
export const fakeSymbol: FakerFn<TSymbol> = () => {
  return Symbol(faker.lorem.word());
};
