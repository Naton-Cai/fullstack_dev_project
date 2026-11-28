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
if (typeof document !== 'undefined') {document.addEventListener('DOMContentLoaded', () => {
  const paint1Name = document.getElementById('paint1Name');
  const paint2Name = document.getElementById('paint2Name');

  const paint1Hex = document.getElementById('paint1Hex');
  const paint2Hex = document.getElementById('paint2Hex');

    const paint1Picker = document.getElementById('paint1Picker');
  const paint2Picker = document.getElementById('paint2Picker');

  const paint1Preview = document.getElementById('paint1Preview');
  const paint2Preview = document.getElementById('paint2Preview');

    const paint1Percent = document.getElementById('paint1Percent');
    const paint2Percent = document.getElementById('paint2Percent');

  const percentageError = document.getElementById('percentageError');

  const mixedHex = document.getElementById('mixedHex');
  const mixPreview = document.getElementById('mixedColorPreview');
  const mixButton = document.getElementById('mixButton');

    const saveForm = document.getElementById('saveForm');
  const saveMixButton = document.getElementById('saveMixButton');

  let mixedHexValue = null;

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

    if (isValidHex(hex1)) {
      // Display the selected color.
      paint1Preview.style.backgroundColor = isValidHex(hex1) ? hex1 : '#FFFFFF';

      // Synchronize the visual color picker.
      paint1Picker.value = expandHex(hex1).toUpperCase();
    }

    if (isValidHex(hex2)) {
      // Display the selected color.
      paint2Preview.style.backgroundColor = isValidHex(hex2) ? hex2 : '#FFFFFF';

      // Synchronize the visual color picker.
      paint2Picker.value = expandHex(hex2).toUpperCase();
    }

    showValidation();
  }

    // Convert a 3-digit hex value to a 6-digit hex value.
  // Example: #F53 becomes #FF5533.
    function expandHex(hex) {
      if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
      return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    return hex;
  }

  function hexToRgb(hex) {
  // Remove leading '#' if present
    let cleanHex = hex.replace(/^#/, '');

      // Expand 3-digit shorthand (e.g., "03F" -> "0033FF")
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split('')
        .map((char) => char + char)
        .join('');
    }

      showValidation();
    }

    // Automatically update both percentages using the slider.
    function updateRatio() {
    // Any input change invalidates the previous mix.
    mixedHexValue = null;
    saveMixButton.disabled = true;

    const ratio = Number(mixRatio.value);

    if (!isValidHex(paint1Hex.value.trim())
      || !isValidHex(paint2Hex.value.trim())) {
      percentageError.textContent = 'Please enter valid hex colors.';
      mixButton.disabled = true;
      saveMixButton.disabled = true;
    } else if (
      paint1Percent.value === ''
      || paint2Percent.value === ''
      || percent1 < 0 || percent1 > 100
      || percent2 < 0 || percent2 > 100
      || Math.abs(percent1 + percent2 - 100) > 0.001
    ) {
      percentageError.textContent = 'Both percentages must be between 0 and 100 and add up to 100%.';
      saveMixButton.disabled = true;
      mixButton.disabled = true;
    } else {
      percentageError.textContent = '';
      mixButton.disabled = false;
      saveMixButton.disabled = false;
      paint1Percent.value = ratio;
      paint2Percent.value = 100 - ratio;

      showValidation();
    }
  }


  function mixColors() {
    const rgb1 = hexToRgb(paint1Hex.value.trim());
    const rgb2 = hexToRgb(paint2Hex.value.trim());

    if (!rgb1 || !rgb2) {
      return;
    }

    const t = Number(paint2Percent.value) / 100;
    const hex = rgbStringToHex(mixbox.lerp(rgb1, rgb2, t));

    mixPreview.style.backgroundColor = hex;
    mixedHex.textContent = hex;
    mixedHexValue = hex;
    saveMixButton.disabled = false;
  }

  // Update the hex input when the user selects a color.
  paint1Picker.addEventListener('input', () => {
    // Read the color selected from the picker.
    const selectedColor = paint1Picker.value.toUpperCase();

    // Copy the selected color into the hex input.
    paint1Hex.value = selectedColor;

    // Update the preview and clear any validation errors.
    updatePreview();
  });

  // Update the hex input when the user selects a color.
  paint2Picker.addEventListener('input', () => {
    // Read the color selected from the picker.
    const selectedColor = paint2Picker.value.toUpperCase();

    // Copy the selected color into the hex input.
    paint2Hex.value = selectedColor;

    // Update the preview and clear any validation errors.
    updatePreview();
  });

  // Fill the hidden fields right before the form posts to /paints/add.
  saveForm.addEventListener('submit', (event) => {
    if (!mixedHexValue) {
      event.preventDefault();
      percentageError.textContent = 'Mix the colors before saving.';
      return;
    }

    const name1 = paint1Name.value.trim();
    const name2 = paint2Name.value.trim();
    const hex1 = paint1Hex.value.trim();
    const hex2 = paint2Hex.value.trim();

    const { elements } = saveForm;
    elements.hexValue.value = mixedHexValue;
    elements.paint1Name.value = name1;
    elements.paint1Hex.value = hex1;
    elements.paint1Percent.value = paint1Percent.value;
    elements.paint2Name.value = name2;
    elements.paint2Hex.value = hex2;
    elements.paint2Percent.value = paint2Percent.value;
  });

    // Update previews when hex values change.
    paint1Hex.addEventListener('input', updatePreview);
    paint2Hex.addEventListener('input', updatePreview);

    // Update percentages when the slider moves.
    mixRatio.addEventListener('input', updateRatio);

    mixButton.addEventListener('click', mixColors);

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
