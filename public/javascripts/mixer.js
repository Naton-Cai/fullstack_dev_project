// Check whether the hex color is valid.
function isValidHex(hex) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

// Check whether both percentages are valid.
function isValidPercentage(value1, value2) {
  const percent1 = Number(value1);
  const percent2 = Number(value2);

  return (
    String(value1).trim() !== ''
    && String(value2).trim() !== ''
    && Number.isFinite(percent1)
    && Number.isFinite(percent2)
    && percent1 >= 0
    && percent1 <= 100
    && percent2 >= 0
    && percent2 <= 100
    && Math.abs(percent1 + percent2 - 100) <= 0.001
  );
}

// Validate hex values and mixing percentages.
function validateInputs(hex1, hex2, percent1, percent2) {
  if (!isValidHex(hex1.trim()) || !isValidHex(hex2.trim())) {
    return 'Please enter valid hex colors.';
  }

  if (!isValidPercentage(percent1, percent2)) {
    return 'Both percentages must be between 0 and 100 and add up to 100%.';
  }

  return '';
}

// Run frontend functionality in the browser.
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const paint1Hex = document.getElementById('paint1Hex');
    const paint2Hex = document.getElementById('paint2Hex');

    const paint1Preview = document.getElementById('paint1Preview');
    const paint2Preview = document.getElementById('paint2Preview');

    const paint1Percent = document.getElementById('paint1Percent');
    const paint2Percent = document.getElementById('paint2Percent');

    const percentageError = document.getElementById('percentageError');
    const mixButton = document.getElementById('mixButton');

    // Get the mixing ratio slider.
    const mixRatio = document.getElementById('mixRatio');

    // Display validation results.
    function showValidation() {
      const error = validateInputs(
        paint1Hex.value,
        paint2Hex.value,
        paint1Percent.value,
        paint2Percent.value,
      );

      percentageError.textContent = error;
      mixButton.disabled = error !== '';
    }

    // Update both paint color previews.
    function updatePreview() {
      const hex1 = paint1Hex.value.trim();
      const hex2 = paint2Hex.value.trim();

      paint1Preview.style.backgroundColor = isValidHex(hex1)
        ? hex1 : '#FFFFFF';

      paint2Preview.style.backgroundColor = isValidHex(hex2)
        ? hex2 : '#FFFFFF';

      showValidation();
    }

    // Automatically update both percentages using the slider.
    function updateRatio() {
      const ratio = Number(mixRatio.value);

      paint1Percent.value = ratio;
      paint2Percent.value = 100 - ratio;

      showValidation();
    }

    // Update previews when hex values change.
    paint1Hex.addEventListener('input', updatePreview);
    paint2Hex.addEventListener('input', updatePreview);

    // Update percentages when the slider moves.
    mixRatio.addEventListener('input', updateRatio);

    // Display the initial percentages and color previews.
    updateRatio();
    updatePreview();
  });
}

// Export functions for unit testing.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidHex,
    isValidPercentage,
    validateInputs,
  };
}