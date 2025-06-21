import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeUint8Array', () => {
  it('generates Uint8Array instance', () => {
    const schema = Type.Uint8Array();
    const result = fake(schema);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('respects minByteLength constraint', () => {
    const schema = Type.Uint8Array({ minByteLength: 10 });
    const result = fake(schema);

    expect(result.length).toBeGreaterThanOrEqual(10);
  });

  it('respects maxByteLength constraint', () => {
    const schema = Type.Uint8Array({ maxByteLength: 20 });
    const result = fake(schema);

    expect(result.length).toBeLessThanOrEqual(20);
  });

  it('generates array within byte length range', () => {
    const schema = Type.Uint8Array({ minByteLength: 5, maxByteLength: 10 });
    const results = Array.from({ length: 20 }, () => fake(schema));

    results.forEach((array) => {
      expect(array.length).toBeGreaterThanOrEqual(5);
      expect(array.length).toBeLessThanOrEqual(10);
    });

    // Should generate different lengths
    const lengths = new Set(results.map((a) => a.length));
    expect(lengths.size).toBeGreaterThan(1);
  });

  it('generates valid byte values (0-255)', () => {
    const schema = Type.Uint8Array({ minByteLength: 100 });
    const result = fake(schema);

    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(0);
      expect(result[i]).toBeLessThanOrEqual(255);
      expect(Number.isInteger(result[i])).toBe(true);
    }
  });

  it('generates different arrays each time', () => {
    const schema = Type.Uint8Array({ minByteLength: 10, maxByteLength: 10 });
    const result1 = fake(schema);
    const result2 = fake(schema);

    // Same length but different content
    expect(result1.length).toBe(result2.length);

    // Check that at least some bytes are different
    let hasDifference = false;
    for (let i = 0; i < result1.length; i++) {
      if (result1[i] !== result2[i]) {
        hasDifference = true;
        break;
      }
    }
    expect(hasDifference).toBe(true);
  });

  it('handles zero length', () => {
    const schema = Type.Uint8Array({ minByteLength: 0, maxByteLength: 0 });
    const result = fake(schema);

    expect(result.length).toBe(0);
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('can be converted to buffer operations', () => {
    const schema = Type.Uint8Array({ minByteLength: 4, maxByteLength: 4 });
    const result = fake(schema);

    // Can be used as buffer
    const view = new DataView(result.buffer);
    expect(() => view.getUint32(0)).not.toThrow();
  });
});
