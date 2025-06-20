import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeIntersect", () => {
  it("merges properties from multiple objects", () => {
    const schema = Type.Intersect([
      Type.Object({ name: Type.String() }),
      Type.Object({ age: Type.Number() }),
      Type.Object({ active: Type.Boolean() }),
    ]);
    const result = fake(schema);

    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("age");
    expect(result).toHaveProperty("active");
    expect(typeof result.name).toBe("string");
    expect(typeof result.age).toBe("number");
    expect(typeof result.active).toBe("boolean");
  });

  it("handles overlapping properties (last wins)", () => {
    const schema = Type.Intersect([
      Type.Object({ id: Type.String(), value: Type.String() }),
      Type.Object({ id: Type.Number(), name: Type.String() }),
    ]);
    const result = fake(schema);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("name");
    expect(typeof result.id).toBe("number"); // Last one wins
    expect(typeof result.value).toBe("string");
    expect(typeof result.name).toBe("string");
  });

  it("works with nested objects", () => {
    const schema = Type.Intersect([
      Type.Object({
        user: Type.Object({
          name: Type.String(),
        }),
      }),
      Type.Object({
        user: Type.Object({
          email: Type.String({ format: "email" }),
        }),
        metadata: Type.Object({
          created: Type.Boolean(),
        }),
      }),
    ]);
    const result = fake(schema);

    expect(result).toHaveProperty("user");
    expect(result).toHaveProperty("metadata");
    expect(result.user).toHaveProperty("email");
    expect(result.metadata).toHaveProperty("created");
    expect(result.user.email).toMatch(/@/);
  });

  it("handles empty intersect", () => {
    const schema = Type.Intersect([]);

    expect(() => fake(schema)).toThrow();
  });
});
