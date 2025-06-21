import { type TString, type StringFormatOption, TypeBoxError } from '@sinclair/typebox';
import { faker } from '@faker-js/faker';
import { randexp } from 'randexp';
import type { FakerFn } from '../types';

type ExtractStringFormatOptions<T> = T extends string ? (string extends T ? never : T) : never;
type OnlyLiterals = ExtractStringFormatOptions<StringFormatOption>;

/**
 * Generates fake data for string schemas
 */
export const fakeString: FakerFn<TString> = (schema) => {
  const format = schema.format as OnlyLiterals | undefined;
  if (format) {
    switch (format) {
      case 'date-time':
        return faker.date.recent().toISOString();
      case 'time':
        return faker.date.recent().toTimeString().split(' ')[0] || '';
      case 'date':
        return faker.date.recent().toISOString().split('T')[0] || '';
      case 'idn-email':
      case 'email':
        return faker.internet.email();
      case 'idn-hostname':
      case 'hostname':
        return faker.internet.domainName();
      case 'ipv4':
        return faker.internet.ipv4();
      case 'ipv6':
        return faker.internet.ipv6();
      case 'uri-reference':
      case 'iri':
      case 'uri':
        return faker.internet.url();
      case 'uuid':
        return faker.string.uuid();
      case 'iri-reference':
        return faker.internet.url();
      case 'uri-template':
        return `${faker.internet.url()}/{${faker.lorem.word()}}`;
      case 'json-pointer':
        return `/${faker.lorem.words(2).split(' ').join('/')}`;
      case 'relative-json-pointer':
        return `${faker.number.int({ min: 0, max: 5 })}/${faker.lorem.word()}`;
      case 'regex':
        if (schema.pattern) {
          return randexp(schema.pattern);
        } else {
          throw new TypeBoxError('Cannot create regex TString without pattern');
        }
      default: {
        const exhaustiveCheck: never = format;
        throw new TypeBoxError(`Unhandled TString format: ${exhaustiveCheck}`);
      }
    }
  }

  const min = schema.minLength ?? 1;
  const max = schema.maxLength ?? min + 1;
  const length = faker.number.int({ min: min, max: max });

  return faker.string.alphanumeric(length);
};
