import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeAny", () => {
  it("generates various types", () => {
    const schema = Type.Any();
    const results = Array.from({ length: 30 }, () => fake(schema));

    const types = new Set(
      results.map((r) => {
        if (r === null) return "null";
        if (r === undefined) return "undefined";
        if (Array.isArray(r)) return "array";
        return typeof r;
      })
    );

    expect(types.size).toBeGreaterThan(2);
  });

  it("can generate objects", () => {
    const schema = Type.Any();
    const results = Array.from({ length: 20 }, () => fake(schema));

    const hasObject = results.some(
      (r) =>
        r !== null &&
        typeof r === "object" &&
        !Array.isArray(r) &&
        r !== undefined
    );

    expect(hasObject).toBe(true);
  });

  it("can generate dates", () => {
    const schema = Type.Any();
    const results = Array.from({ length: 20 }, () => fake(schema));

    const hasDate = results.some((r) => r instanceof Date);
    expect(hasDate).toBe(true);
  });
});
