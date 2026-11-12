/* eslint-disable no-undef */
const Color = require('../models/paint');

// a generic color mix for testing
const validColor = () => ({
  name: 'Sunset Orange',
  hexValue: '#ff8800',
  description: 'A warm orange',
  recipe: {
    paint1Hex: '#ff0000',
    paint1Percent: 60,
    paint2Hex: '#ffff00',
    paint2Percent: 40,
  },
});

describe('Paint model', () => {
  describe('sanity check', () => {
    it('passes validation with a complete, valid color', async () => {
      await expect(new Color(validColor()).validate()).resolves.toBeUndefined();
    });
    it('passes with only the required fields with no recipe', async () => {
      const color = new Color({ name: 'Plain', hexValue: '#abc' });
      await expect(color.validate()).resolves.toBeUndefined();
    });
    it('accepts 3 digit hex values', async () => {
      const color = new Color({ name: 'Short', hexValue: '#f00' });
      await expect(color.validate()).resolves.toBeUndefined();
    });
  });

  // tests hex values
  describe('hexValue', () => {
    // makes sure that the system is accepting hexvalues correctly
    it.each(['ff8800', '#ff88', '#gggggg', '#12345', '#1234567', ''])(
      'rejects invalid hex',
      async (bad) => {
        const color = new Color({ ...validColor(), hexValue: bad });
        await expect(color.validate()).rejects.toThrow();
      },
    );
  });
});
