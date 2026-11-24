
document.addEventListener('DOMContentLoaded', () => {
  const paint1Hex = document.getElementById('paint1Hex');
  const paint2Hex = document.getElementById('paint2Hex');

  const paint1Preview = document.getElementById('paint1Preview');
  const paint2Preview = document.getElementById('paint2Preview');

  const paint1Percent = document.getElementById('paint1Percent');
  const paint2Percent = document.getElementById('paint2Percent');

  const percentageError = document.getElementById('percentageError');
  const mixButton = document.getElementById('mixButton');

  // Check whether the hex color is valid.
  function isValidHex(hex) {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
  }

  // Update both paint color previews.
  function updatePreview() {
    const hex1 = paint1Hex.value.trim();
    const hex2 = paint2Hex.value.trim();

    paint1Preview.style.backgroundColor =
      isValidHex(hex1) ? hex1 : '#FFFFFF';

    paint2Preview.style.backgroundColor =
      isValidHex(hex2) ? hex2 : '#FFFFFF';

    validateInputs();
  }

  // Validate hex values and mixing percentages.
  function validateInputs() {
    const percent1 = Number(paint1Percent.value);
    const percent2 = Number(paint2Percent.value);

    if (!isValidHex(paint1Hex.value.trim()) ||
        !isValidHex(paint2Hex.value.trim())) {
      percentageError.textContent = 'Please enter valid hex colors.';
      mixButton.disabled = true;
    } else if (
      paint1Percent.value === '' ||
      paint2Percent.value === '' ||
      percent1 < 0 || percent1 > 100 ||
      percent2 < 0 || percent2 > 100 ||
      Math.abs(percent1 + percent2 - 100) > 0.001
    ) {
      percentageError.textContent =
        'Both percentages must be between 0 and 100 and add up to 100%.';
      mixButton.disabled = true;
    } else {
      percentageError.textContent = '';
      mixButton.disabled = false;
    }
  }

  // Update previews when hex values change.
  paint1Hex.addEventListener('input', updatePreview);
  paint2Hex.addEventListener('input', updatePreview);

  // Validate when percentages change.
  paint1Percent.addEventListener('input', validateInputs);
  paint2Percent.addEventListener('input', validateInputs);

  // Display the initial previews.
  updatePreview();
});
