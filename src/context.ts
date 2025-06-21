import type { FakerContext } from "./types";

/**
 * Creates a new faker context for tracking schema references and recursion depth
 */
export function createContext(): FakerContext {
  return {
    refs: new Map(),
    currentDepth: 0,
  };
}
