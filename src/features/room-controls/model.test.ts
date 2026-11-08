import { describe, expect, it } from 'vitest';
import { MAX_TEMPERATURE_C, MIN_TEMPERATURE_C, nextTemperature } from './model';

describe('nextTemperature', () => {
  it('steps up one degree', () => {
    expect(nextTemperature(22)).toBe(23);
  });

  it('wraps back to the minimum after the maximum', () => {
    expect(nextTemperature(MAX_TEMPERATURE_C)).toBe(MIN_TEMPERATURE_C);
  });
});
