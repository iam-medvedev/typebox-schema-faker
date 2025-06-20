import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeNull", () => {
  it("always returns null", () => {
    const schema = Type.Null();
    const result = fake(schema);

    expect(result).toBe(null);
    expect(result).not.toBe(undefined);
  });
});
