import type { TTemplateLiteral, Static } from '@sinclair/typebox';
import { randexp } from 'randexp';
import type { FakerFn } from '../types';

/**
 * Generates fake data for template literal schemas
 */
export const fakeTemplateLiteral: FakerFn<TTemplateLiteral> = (schema) => {
  return randexp(schema.pattern) as Static<TTemplateLiteral>;
};
