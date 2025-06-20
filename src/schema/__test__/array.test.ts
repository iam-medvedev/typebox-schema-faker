import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeArray", () => {
  it("generates array within length constraints", () => {
    const schema = Type.Array(Type.String(), { minItems: 2, maxItems: 4 });
    const result = fake(schema);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);
    expect(result.every((item) => typeof item === "string")).toBe(true);
  });

  it("generates nested arrays", () => {
    const schema = Type.Array(Type.Array(Type.Number()));
    const result = fake(schema);

    expect(Array.isArray(result)).toBe(true);
    expect(result.every((item) => Array.isArray(item))).toBe(true);
    expect(
      result.every((item) => item.every((num) => typeof num === "number"))
    ).toBe(true);
  });
});
