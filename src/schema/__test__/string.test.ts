import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeString", () => {
  it("generates string within length constraints", () => {
    const schema = Type.String({ minLength: 5, maxLength: 10 });
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("generates email format", () => {
    const schema = Type.String({ format: "email" });
    const result = fake(schema);

    expect(result).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("generates uuid format", () => {
    const schema = Type.String({ format: "uuid" });
    const result = fake(schema);

    expect(result).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  it("generates url format", () => {
    const schema = Type.String({ format: "url" });
    const result = fake(schema);

    expect(result).toMatch(/^https?:\/\//);
  });

  it("generates date-time format", () => {
    const schema = Type.String({ format: "date-time" });
    const result = fake(schema);

    expect(() => new Date(result)).not.toThrow();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
