import type { TRegExp } from '@sinclair/typebox';
import { randexp } from 'randexp';
import type { FakerFn } from '../types';

/**
 * Generates fake data for RegExp schemas
 */
export const fakeRegExp: FakerFn<TRegExp> = (schema) => {
  return randexp(schema.source, schema.flags);
};
