
import { describe, it, expect } from 'vitest';
import { timeToInt } from './utils'; // Update the path as needed

describe('timeToInt', () => {
  it('should convert time string "12:34" to an integer 1234', () => {
    const result = timeToInt('12:34');
    expect(result).toBe(1234);
  });

  it('should convert time string "07:45" to an integer 745', () => {
    const result = timeToInt('07:45');
    expect(result).toBe(745);
  });

  it('should convert time string "00:00" to an integer 0', () => {
    const result = timeToInt('00:00');
    expect(result).toBe(0);
  });

  it('should convert time string "23:59" to an integer 2359', () => {
    const result = timeToInt('23:59');
    expect(result).toBe(2359);
  });
  
});
