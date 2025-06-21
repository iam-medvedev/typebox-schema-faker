import { type TString, type StringFormatOption, TypeBoxError } from '@sinclair/typebox';
import { randexp } from 'randexp';
import type { FakerFn } from '../types';

type ExtractStringFormatOptions<T> = T extends string ? (string extends T ? never : T) : never;
type OnlyLiterals = ExtractStringFormatOptions<StringFormatOption>;

/**
 * Generates fake data for string schemas
 */
export const fakeString: FakerFn<TString> = (schema, ctx) => {
  const format = schema.format as OnlyLiterals | undefined;
  if (format) {
    switch (format) {
      case 'date-time':
        return ctx.faker.date.recent().toISOString();
      case 'time':
        return ctx.faker.date.recent().toTimeString().split(' ')[0] || '';
      case 'date':
        return ctx.faker.date.recent().toISOString().split('T')[0] || '';
      case 'idn-email':
      case 'email':
        return ctx.faker.internet.email();
      case 'idn-hostname':
      case 'hostname':
        return ctx.faker.internet.domainName();
      case 'ipv4':
        return ctx.faker.internet.ipv4();
      case 'ipv6':
        return ctx.faker.internet.ipv6();
      case 'uri-reference':
      case 'iri':
      case 'uri':
        return ctx.faker.internet.url();
      case 'uuid':
        return ctx.faker.string.uuid();
      case 'iri-reference':
        return ctx.faker.internet.url();
      case 'uri-template':
        return `${ctx.faker.internet.url()}/{${ctx.faker.lorem.word()}}`;
      case 'json-pointer':
        return `/${ctx.faker.lorem.words(2).split(' ').join('/')}`;
      case 'relative-json-pointer':
        return `${ctx.faker.number.int({ min: 0, max: 5 })}/${ctx.faker.lorem.word()}`;
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
  const length = ctx.faker.number.int({ min: min, max: max });

  return ctx.faker.string.alphanumeric(length);
};
