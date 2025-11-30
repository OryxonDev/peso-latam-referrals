import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(500)).toBe('$500');
    expect(formatCurrency(0)).toBe('$0');
  });

  it('should format large numbers correctly', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000');
    expect(formatCurrency(1234567)).toBe('$1,234,567');
  });

  it('should format decimal numbers without decimals', () => {
    expect(formatCurrency(100.99)).toBe('$101');
    expect(formatCurrency(50.5)).toBe('$51');
  });
});

