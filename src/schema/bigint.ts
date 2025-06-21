import type { TBigInt } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";

/**
 * Generates fake data for bigint schemas
 */
export const fakeBigInt: FakerFn<TBigInt> = (schema) => {
  return BigInt(
    faker.number.bigInt({ min: schema.minimum, max: schema.maximum })
  );
};
