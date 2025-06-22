import { Faker, en } from '@faker-js/faker';
import RandExp from 'randexp';
import type { FakerContext } from './types';

type CreateContextOptions = {
  seed?: number;
};

/**
 * Creates a new faker context for tracking schema references and recursion depth
 */
export function createContext(options: CreateContextOptions = {}): FakerContext {
  const seed = options.seed || Math.random() * Math.pow(2, 32) + Date.now();

  return {
    refs: new Map(),
    currentDepth: 0,
    faker: new Faker({ locale: [en], seed: seed }),
    randexp(pattern, flags) {
      const instance = new RandExp(pattern, flags);

      let currentSeed = seed;
      instance.randInt = (a, b) => {
        currentSeed = Math.pow(currentSeed, 2) % 94906249;
        return (currentSeed % (1 + b - a)) + a;
      };

      return instance.gen();
    },
  };
}
