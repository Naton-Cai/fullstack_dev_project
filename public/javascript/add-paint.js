
/*
 * File: public/javascripts/add-paint.js
 *
 * Purpose:
 * 1. Read the paint name and hex value.
 * 2. Validate the hex color.
 * 3. Update the live color preview.
 * 4. Prevent invalid form submissions.
 *
 * This code runs in the user's browser.
 */

// Wait until the HTML page has finished loading.
document.addEventListener('DOMContentLoaded', () => {
  // Get the form and its input elements.
  const form = document.getElementById('paintForm');
  const nameInput = document.getElementById('paintName');
  const hexInput = document.getElementById('hexValue');

  // Get the preview and error elements.
  const colorPreview = document.getElementById('colorPreview');
  const previewHex = document.getElementById('previewHex');
  const hexError = document.getElementById('hexError');

  // Check whether a hex value has 3 or 6 valid digits.
  function isValidHex(hex) {
    const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexPattern.test(hex);
  }

  // Update the preview based on the entered hex value.
  function updatePreview() {
    // Read the value and remove extra spaces.
    const hex = hexInput.value.trim();

    if (isValidHex(hex)) {
      // Valid hex: display the selected color.
      colorPreview.style.backgroundColor = hex;

      // Show the hex code below the preview.
      previewHex.textContent = hex.toUpperCase();

      // Clear previous validation errors.
      hexError.textContent = '';
      hexInput.setCustomValidity('');
    } else {
      // Invalid hex: show a neutral preview.
      colorPreview.style.backgroundColor = '#ffffff';
      previewHex.textContent = 'Invalid color';

      // Display an error message.
      hexError.textContent =
        'Enter a valid hex color, such as #FF5733.';

      // Prevent invalid values from being submitted.
      hexInput.setCustomValidity('Invalid hex color');
    }
  }

  // Update the color immediately while the user types.
  hexInput.addEventListener('input', updatePreview);

  // Validate the form when the user clicks Save.
  form.addEventListener('submit', (event) => {
    const name = nameInput.value.trim();
    const hex = hexInput.value.trim();

    // Stop submission if the name or hex is invalid.
    if (!name || !isValidHex(hex)) {
      event.preventDefault();
      updatePreview();
      form.reportValidity();
      return;
    }

    // Clean up the values before submitting.
    nameInput.value = name;
    hexInput.value = hex.toUpperCase();

    // If valid, the browser submits the form.
    // Express handles saving the paint to MongoDB.
  });

  // Show the starting color when the page first loads.
  updatePreview();
});
