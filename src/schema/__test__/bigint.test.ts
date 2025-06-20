import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeBigInt", () => {
  it("generates BigInt values", () => {
    const schema = Type.BigInt();
    const result = fake(schema);

    expect(typeof result).toBe("bigint");
  });

  it("respects minimum constraint", () => {
    const schema = Type.BigInt({ minimum: 100n });
    const result = fake(schema);

    expect(result).toBeGreaterThanOrEqual(100n);
  });

  it("respects maximum constraint", () => {
    const schema = Type.BigInt({ maximum: 1000n });
    const result = fake(schema);

    expect(result).toBeLessThanOrEqual(1000n);
  });

  it("generates within range", () => {
    const schema = Type.BigInt({ minimum: 10n, maximum: 20n });
    const results = Array.from({ length: 20 }, () => fake(schema));

    results.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(10n);
      expect(value).toBeLessThanOrEqual(20n);
    });

    // Should generate different values
    const uniqueValues = new Set(results.map((v) => v.toString()));
    expect(uniqueValues.size).toBeGreaterThan(1);
  });

  it("handles large BigInt values", () => {
    const schema = Type.BigInt({
      minimum: 1000000000000000n,
      maximum: 9999999999999999n,
    });
    const result = fake(schema);

    expect(result).toBeGreaterThanOrEqual(1000000000000000n);
    expect(result).toBeLessThanOrEqual(9999999999999999n);
  });

  it("works with negative values", () => {
    const schema = Type.BigInt({ minimum: -100n, maximum: -10n });
    const result = fake(schema);

    expect(result).toBeGreaterThanOrEqual(-100n);
    expect(result).toBeLessThanOrEqual(-10n);
  });
});
