import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeNumber", () => {
  it("generates number within range", () => {
    const schema = Type.Number({ minimum: 10, maximum: 20 });
    const result = fake(schema);

    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThanOrEqual(10);
    expect(result).toBeLessThanOrEqual(20);
  });

  it("respects multipleOf constraint", () => {
    const schema = Type.Number({ multipleOf: 0.5, minimum: 0, maximum: 10 });
    const result = fake(schema);

    expect(result % 0.5).toBe(0);
  });

  it("uses default range when not specified", () => {
    const schema = Type.Number();
    const result = fake(schema);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});
