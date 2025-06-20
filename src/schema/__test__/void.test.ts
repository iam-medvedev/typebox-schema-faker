import { describe, it, expect } from "bun:test";
import { Type } from "@sinclair/typebox";
import { fake } from "../../";

describe("fakeVoid", () => {
  it("always returns undefined", () => {
    const schema = Type.Void();
    const result = fake(schema);

    expect(result).toBe(undefined);
  });
});
