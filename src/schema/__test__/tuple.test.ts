import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeTuple", () => {
  it("generates fixed-length array with correct types", () => {
    const schema = Type.Tuple([Type.String(), Type.Number(), Type.Boolean()]);
    const result = fake(schema);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(typeof result[0]).toBe("string");
    expect(typeof result[1]).toBe("number");
    expect(typeof result[2]).toBe("boolean");
  });

  it("handles empty tuple", () => {
    const schema = Type.Tuple([]);
    const result = fake(schema);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it("works with complex types in tuple", () => {
    const schema = Type.Tuple([
      Type.Object({ id: Type.String() }),
      Type.Array(Type.Number()),
      Type.Union([Type.Literal("A"), Type.Literal("B")]),
    ]);
    const result = fake(schema);

    expect(result.length).toBe(3);
    expect(result[0]).toHaveProperty("id");
    expect(typeof result[0].id).toBe("string");
    expect(Array.isArray(result[1])).toBe(true);
    expect(["A", "B"]).toContain(result[2]);
  });

  it("preserves type constraints in tuple elements", () => {
    const schema = Type.Tuple([
      Type.String({ minLength: 5, maxLength: 10 }),
      Type.Number({ minimum: 0, maximum: 100 }),
      Type.Array(Type.String(), { minItems: 2, maxItems: 2 }),
    ]);
    const result = fake(schema);

    expect(result[0].length).toBeGreaterThanOrEqual(5);
    expect(result[0].length).toBeLessThanOrEqual(10);
    expect(result[1]).toBeGreaterThanOrEqual(0);
    expect(result[1]).toBeLessThanOrEqual(100);
    expect(result[2].length).toBe(2);
  });
});
