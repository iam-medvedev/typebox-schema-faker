import type { TString } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import type { FakerFn } from '../types';

/**
 * Generates fake data for string schemas
 */
export const fakeString: FakerFn<TString> = (schema) => {
  if (schema.format) {
    switch (schema.format) {
      case 'email':
        return faker.internet.email();
      case 'uuid':
        return faker.string.uuid();
      case 'url':
        return faker.internet.url();
      case 'date-time':
        return faker.date.recent().toISOString();
      default:
        break;
    }
  }

  const min = schema.minLength ?? 1;
  const max = schema.maxLength ?? min + 1;
  const length = faker.number.int({ min: min, max: max });

  return faker.string.alphanumeric(length);
};
