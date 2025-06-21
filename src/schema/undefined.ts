import type { TUndefined } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for undefined schemas
 */
export const fakeUndefined: FakerFn<TUndefined> = () => {
  return undefined;
};
