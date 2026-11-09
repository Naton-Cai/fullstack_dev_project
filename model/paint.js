const mongoose = require('mongoose');

const { Schema } = mongoose;

// we use regex to match our hexvalue
const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hexValue: {
      type: String,
      required: true,
      match: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    recipe: {
      paint1Hex: {
        type: String,
        match: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
        uppercase: true,
      },
      paint1Percent: {
        type: Number,
        min: 0,
        max: 100,
      },
      paint2Hex: {
        type: String,
        match: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
        uppercase: true,
      },
      paint2Percent: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  },
  { timestamps: true },
);

// validates our inputs to insure that recepie percentage adds up to 100%
colorSchema.pre('validate', function validatePaint() {
  const { paint1Percent, paint2Percent } = this.recipe || {};
  if (paint1Percent != null && paint2Percent != null) {
    if (Math.abs(paint1Percent + paint2Percent - 100) > 0.001) {
      this.invalidate(
        'recipe.paint2Percent',
        'Recipe percentages must add up to 100',
        paint2Percent,
      );
    }
  }
});

module.exports = mongoose.model('Color', colorSchema);
