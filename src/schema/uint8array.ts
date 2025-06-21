import type { TUint8Array } from '@sinclair/typebox';
import type { FakerFn } from '../types';

/**
 * Generates fake data for Uint8Array schemas
 */
export const fakeUint8Array: FakerFn<TUint8Array> = (schema, ctx) => {
  const min = schema.minByteLength ?? 0;
  const max = schema.maxByteLength ?? min + 32;

  // Generate random length within constraints
  const length = ctx.faker.number.int({ min, max });

  // Create Uint8Array with random bytes
  const array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = ctx.faker.number.int({ min: 0, max: 255 });
  }

  return array;
};
