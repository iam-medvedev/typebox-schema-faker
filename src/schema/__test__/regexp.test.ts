import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeRegExp", () => {
  it("generates string matching the regex pattern", () => {
    const schema = Type.RegExp(/[a-z]+/);
    const result = fake(schema);

    expect(typeof result).toBe("string");
  });

  it("preserves pattern from simple regex", () => {
    const pattern = /hello/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("preserves pattern with flags", () => {
    const pattern = /test/gi;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(new RegExp(pattern.source, pattern.flags));
  });

  it("handles character classes", () => {
    const pattern = /[a-zA-Z0-9]/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles quantifiers", () => {
    const pattern = /a{2,5}/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles word boundaries", () => {
    const pattern = /\bword\b/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles anchors", () => {
    const pattern = /^start.*end$/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles alternation", () => {
    const pattern = /cat|dog|bird/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles escape sequences", () => {
    const pattern = /\d+\.\d+/; // decimal numbers
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles email regex pattern", () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles phone number regex pattern", () => {
    const pattern = /^\+?[\d\s\-\(\)]{10,}$/;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles UUID regex pattern", () => {
    const pattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles date format regex", () => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("handles time format regex", () => {
    const pattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // HH:MM:SS
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toMatch(pattern);
  });

  it("works in object properties", () => {
    const schema = Type.Object({
      pattern: Type.RegExp(/test-\d+/),
      name: Type.String(),
    });

    const result = fake(schema);

    expect(result).toHaveProperty("pattern");
    expect(result).toHaveProperty("name");
    expect(typeof result.pattern).toBe("string");
    expect(result.pattern).toMatch(/test-\d+/);
    expect(typeof result.name).toBe("string");
  });

  it("works in arrays", () => {
    const schema = Type.Array(Type.RegExp(/[a-z]{3}/), {
      minItems: 2,
      maxItems: 4,
    });
    const result = fake(schema);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);

    result.forEach((str) => {
      expect(typeof str).toBe("string");
      expect(str).toMatch(/[a-z]{3}/);
    });
  });

  it("handles empty pattern gracefully", () => {
    const pattern = new RegExp("");
    const schema = Type.RegExp(pattern);
    const result = fake(schema);

    expect(typeof result).toBe("string");
    expect(result).toBe("");
  });
});
