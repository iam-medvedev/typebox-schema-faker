import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeLiteral", () => {
  it("returns exact literal value", () => {
    const schema = Type.Literal("active");
    const result = fake(schema);

    expect(result).toBe("active");
  });

  it("works with number literals", () => {
    const schema = Type.Literal(42);
    const result = fake(schema);

    expect(result).toBe(42);
  });

  it("works with boolean literals", () => {
    const schema = Type.Literal(true);
    const result = fake(schema);

    expect(result).toBe(true);
  });
});
