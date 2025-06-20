import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeUnion", () => {
  it("generates values from union types", () => {
    const schema = Type.Union([Type.String(), Type.Number(), Type.Boolean()]);

    const results = Array.from({ length: 20 }, () => fake(schema));
    const types = results.map((r) => typeof r);

    expect(types).toContain("string");
    expect(types).toContain("number");
    expect(types).toContain("boolean");
  });

  it("works with literal unions", () => {
    const schema = Type.Union([
      Type.Literal("active"),
      Type.Literal("inactive"),
      Type.Literal("pending"),
    ]);

    const result = fake(schema);
    expect(["active", "inactive", "pending"]).toContain(result);
  });

  it("works with enum", () => {
    enum Test {
      active = "active",
      inactive = "inactive",
      pending = "pending",
    }
    const schema = Type.Enum(Test);

    const result = fake(schema);
    expect(["active", "inactive", "pending"]).toContain(result);
  });

  it("handles complex union types", () => {
    const schema = Type.Union([
      Type.Object({ type: Type.Literal("user"), name: Type.String() }),
      Type.Object({ type: Type.Literal("admin"), role: Type.String() }),
    ]);

    const result = fake(schema);
    expect(result).toHaveProperty("type");
    expect(["user", "admin"]).toContain(result.type);
  });
});
