import type { Context } from "./types";

export function createContext(): Context {
  return {
    refs: new Map(),
    currentDepth: 0,
  };
}
