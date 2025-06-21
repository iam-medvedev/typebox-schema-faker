import type { TLiteral } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for literal schemas
 */
export const fakeLiteral: FakerFn<TLiteral> = (schema) => {
  return schema.const;
};
