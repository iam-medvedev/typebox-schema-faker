import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeDate", () => {
  it("generates Date instance", () => {
    const schema = Type.Date();
    const result = fake(schema);

    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).not.toBeNaN();
  });

  it("respects minimum constraint", () => {
    const minDate = new Date("2025-01-01");
    const schema = Type.Date({ minimumTimestamp: minDate.getTime() });
    const result = fake(schema);

    expect(result.getTime()).toBeGreaterThanOrEqual(minDate.getTime());
  });

  it("respects maximum constraint", () => {
    const maxDate = new Date("2025-12-31");
    const schema = Type.Date({ maximumTimestamp: maxDate.getTime() });
    const result = fake(schema);

    expect(result.getTime()).toBeLessThanOrEqual(maxDate.getTime());
  });

  it("generates date within range", () => {
    const minDate = new Date("2025-01-01");
    const maxDate = new Date("2025-01-31");
    const schema = Type.Date({
      minimumTimestamp: minDate.getTime(),
      maximumTimestamp: maxDate.getTime(),
    });

    const results = Array.from({ length: 10 }, () => fake(schema));

    results.forEach((date) => {
      expect(date.getTime()).toBeGreaterThanOrEqual(minDate.getTime());
      expect(date.getTime()).toBeLessThanOrEqual(maxDate.getTime());
    });
  });
});
