/* eslint-disable no-undef */

const {
  isValidHex,
  isValidPercentage,
  validateInputs,
} = require('../public/javascripts/mixer');

describe('Paint Mixer', () => {
  // Test function 1: Hex color validation.
  describe('isValidHex', () => {
    it('accepts a valid six-digit hex color', () => {
      expect(isValidHex('#FF0000')).toBe(true);
    });

    it('accepts a valid three-digit hex color', () => {
      expect(isValidHex('#abc')).toBe(true);
    });

    it('rejects an invalid hex color', () => {
      expect(isValidHex('#XYZ123')).toBe(false);
    });

    it('rejects a hex color without #', () => {
      expect(isValidHex('FF0000')).toBe(false);
    });
  });

  // Test function 2: Percentage validation.
  describe('isValidPercentage', () => {
    it('accepts percentages that add up to 100', () => {
      expect(isValidPercentage(60, 40)).toBe(true);
    });

    it('rejects percentages that exceed 100', () => {
      expect(isValidPercentage(70, 50)).toBe(false);
    });

    it('rejects negative percentages', () => {
      expect(isValidPercentage(-10, 110)).toBe(false);
    });

    it('accepts boundary percentages', () => {
      expect(isValidPercentage(0, 100)).toBe(true);
    });

    it('rejects an empty percentage', () => {
      expect(isValidPercentage('', 100)).toBe(false);
    });
  });

  // Test function 3: Complete input validation.
  describe('validateInputs', () => {
    it('accepts valid colors and percentages', () => {
      expect(
        validateInputs('#FF0000', '#0000FF', 50, 50),
      ).toBe('');
    });

    it('rejects invalid hex colors', () => {
      expect(
        validateInputs('#XYZ123', '#0000FF', 50, 50),
      ).toBe('Please enter valid hex colors.');
    });

    it('rejects invalid percentages', () => {
      expect(
        validateInputs('#FF0000', '#0000FF', 60, 60),
      ).toBe(
        'Both percentages must be between 0 and 100 and add up to 100%.',
      );
    });
  });
});
