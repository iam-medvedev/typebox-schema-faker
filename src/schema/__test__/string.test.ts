import { describe, it, expect } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { fake } from '../../';

describe('fakeString', () => {
  it('generates email format', () => {
    const schema = Type.String({ format: 'email' });
    const result = fake(schema);

    expect(result).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('generates idn-email format', () => {
    const schema = Type.String({ format: 'idn-email' });
    const result = fake(schema);

    expect(result).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('generates uuid format', () => {
    const schema = Type.String({ format: 'uuid' });
    const result = fake(schema);

    expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  });

  it('generates uri format', () => {
    const schema = Type.String({ format: 'uri' });
    const result = fake(schema);

    expect(result).toMatch(/^https?:\/\//);
  });

  it('generates uri-reference format', () => {
    const schema = Type.String({ format: 'uri-reference' });
    const result = fake(schema);

    expect(result).toMatch(/^https?:\/\//);
  });

  it('generates iri format', () => {
    const schema = Type.String({ format: 'iri' });
    const result = fake(schema);

    expect(result).toMatch(/^https?:\/\//);
  });

  it('generates iri-reference format', () => {
    const schema = Type.String({ format: 'iri-reference' });
    const result = fake(schema);

    expect(result).toMatch(/^https?:\/\//);
  });

  it('generates hostname format', () => {
    const schema = Type.String({ format: 'hostname' });
    const result = fake(schema);

    expect(result).toMatch(
      /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/,
    );
  });

  it('generates idn-hostname format', () => {
    const schema = Type.String({ format: 'idn-hostname' });
    const result = fake(schema);

    expect(result).toMatch(
      /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/,
    );
  });

  it('generates ipv4 format', () => {
    const schema = Type.String({ format: 'ipv4' });
    const result = fake(schema);

    expect(result).toMatch(/^(\d{1,3}\.){3}\d{1,3}$/);
    // Validate each octet is between 0-255
    const octets = result.split('.');
    octets.forEach((octet) => {
      const num = parseInt(octet, 10);
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThanOrEqual(255);
    });
  });

  it('generates ipv6 format', () => {
    const schema = Type.String({ format: 'ipv6' });
    const result = fake(schema);

    // Basic IPv6 pattern (simplified)
    expect(result).toMatch(/^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i);
  });

  it('generates date-time format', () => {
    const schema = Type.String({ format: 'date-time' });
    const result = fake(schema);

    expect(() => new Date(result)).not.toThrow();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(new Date(result).toISOString()).toBeTruthy();
  });

  it('generates time format', () => {
    const schema = Type.String({ format: 'time' });
    const result = fake(schema);

    expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('generates date format', () => {
    const schema = Type.String({ format: 'date' });
    const result = fake(schema);

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(() => new Date(result)).not.toThrow();
  });

  it('generates uri-template format', () => {
    const schema = Type.String({ format: 'uri-template' });
    const result = fake(schema);

    expect(result).toMatch(/^https?:\/\/.*\/\{.+\}$/);
  });

  it('generates json-pointer format', () => {
    const schema = Type.String({ format: 'json-pointer' });
    const result = fake(schema);

    expect(result).toMatch(/^\/[\w\/]+$/);
  });

  it('generates relative-json-pointer format', () => {
    const schema = Type.String({ format: 'relative-json-pointer' });
    const result = fake(schema);

    expect(result).toMatch(/^\d+\/\w+$/);
  });
});
