import { type TRecord, TypeBoxError } from "@sinclair/typebox";
import { faker } from "@faker-js/faker";
import type { FakerFn } from "../types";
import { fake } from "../";

/**
 * Generates fake data for record schemas
 */
export const fakeRecord: FakerFn<TRecord> = (schema) => {
  const result: any = {};

  // Generate X random entries
  const entryCount = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < entryCount; i++) {
    // Generate key based on the key schema
    const key = generateRecordKey(schema);

    // Generate value based on the pattern schema
    const patternKey = Object.keys(schema.patternProperties)[0];
    if (!patternKey) {
      throw new TypeBoxError("Cannot fake TRecord type");
    }

    const patternSchema = schema.patternProperties[patternKey];
    if (!patternSchema) {
      throw new TypeBoxError("Cannot fake TRecord type");
    }

    result[key] = fake(patternSchema);
  }

  return result;
};

/**
 * Generates a key for a record based on the key pattern
 */
function generateRecordKey(schema: TRecord): string {
  const keyPattern = Object.keys(schema.patternProperties)[0];

  // Handle numeric patterns
  if (keyPattern === "^(0|[1-9][0-9]*)$") {
    return faker.number.int({ min: 0, max: 999 }).toString();
  }

  // Default to random word for string keys
  return faker.word.noun();
}
