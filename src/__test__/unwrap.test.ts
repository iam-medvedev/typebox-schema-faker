import { describe, it, expect } from "bun:test";
import { Type, Kind, ReadonlyKind, TypeGuard } from "@sinclair/typebox";
import { unwrap } from "../unwrap";

describe("unwrap", () => {
  it("removes Readonly wrapper from schema", () => {
    const baseSchema = Type.String();
    const readonlySchema = Type.Readonly(baseSchema);
    expect(TypeGuard.IsReadonly(unwrap(readonlySchema))).toBeFalse();
  });

  it("removes Optional wrapper from schema", () => {
    const baseSchema = Type.Number();
    const optionalSchema = Type.Optional(baseSchema);
    expect(TypeGuard.IsOptional(unwrap(optionalSchema))).toBeFalse();
  });

  it("removes Recursive wrapper from schema", () => {
    const recursiveSchema = Type.Recursive(
      (This) =>
        Type.Object({
          id: Type.String(),
          children: Type.Array(This),
        }),
      { $id: "TreeNode" }
    );
    expect(TypeGuard.IsRecursive(unwrap(recursiveSchema))).toBeFalse();
  });

  it("returns schema unchanged when no wrappers present", () => {
    const baseSchema = Type.String({ minLength: 5 });
    const result = unwrap(baseSchema);

    expect(result[Kind]).toBe("String");
    expect(result.minLength).toBe(5);
    expect(result).not.toBe(baseSchema); // Should be cloned
  });

  it("preserves original schema properties after unwrapping", () => {
    const baseSchema = Type.String({
      minLength: 3,
      maxLength: 10,
      format: "email",
    });
    const readonlySchema = Type.Readonly(baseSchema);
    const result = unwrap(readonlySchema);

    expect(result.minLength).toBe(3);
    expect(result.maxLength).toBe(10);
    expect(result.format).toBe("email");
    expect(result[Kind]).toBe("String");
  });

  it("creates a clone and does not modify original schema", () => {
    const baseSchema = Type.String();
    const readonlySchema = Type.Readonly(baseSchema);
    expect(TypeGuard.IsReadonly(readonlySchema)).toBe(true);

    const result = unwrap(readonlySchema);
    expect(TypeGuard.IsReadonly(readonlySchema)).toBe(true);
    expect(TypeGuard.IsReadonly(result)).toBe(false);
  });
});
