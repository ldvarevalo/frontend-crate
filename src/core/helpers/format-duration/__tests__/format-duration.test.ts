import { formatDuration } from '../format-duration';

/**
 * formatDuration
 */

describe('formatDuration', () => {
  it('should return --:-- for null', () => {
    expect(formatDuration(null)).toBe('--:--');
  });

  it('should return --:-- for undefined', () => {
    expect(formatDuration(undefined as unknown as null)).toBe('--:--');
  });

  it('should format zero seconds', () => {
    expect(formatDuration(0)).toBe('0:00');
  });

  it('should format seconds less than a minute', () => {
    expect(formatDuration(45)).toBe('0:45');
  });

  it('should zero-pad single-digit seconds', () => {
    expect(formatDuration(7)).toBe('0:07');
  });

  it('should format exact minute', () => {
    expect(formatDuration(60)).toBe('1:00');
  });

  it('should format minutes and seconds', () => {
    expect(formatDuration(185)).toBe('3:05');
  });

  it('should format large values', () => {
    expect(formatDuration(7384)).toBe('123:04');
  });

  it('should round down fractional seconds', () => {
    expect(formatDuration(90.7)).toBe('1:30');
  });
});
