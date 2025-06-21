import { Faker, en } from '@faker-js/faker';
import type { FakerContext } from './types';

type CreateContextOptions = {
  seed?: number;
};

/**
 * Creates a new faker context for tracking schema references and recursion depth
 */
export function createContext({ seed }: CreateContextOptions): FakerContext {
  return {
    refs: new Map(),
    currentDepth: 0,
    faker: new Faker({ locale: [en], seed }),
  };
}
