/*
 * Our porpuse
 * 1. Read the paint name and hex value.
 * 2. Validate hex colors (3 or 6 digits).
 * 3. Synchronize the color picker and hex input.
 * 4. Update the live color preview.
 * 5. Prevent invalid form submissions.
 *
 * This JavaScript runs in the user's browser.
 */

// Wait until the page has finished loading.
document.addEventListener('DOMContentLoaded', () => {
  // Get the form and its input fields.
  const form = document.getElementById('paintForm');
  const nameInput = document.getElementById('paintName');
  const hexInput = document.getElementById('hexValue');
  const hexPicker = document.getElementById('hexPicker');

  // Get the preview and error message elements.
  const colorPreview = document.getElementById('colorPreview');
  const previewHex = document.getElementById('previewHex');
  const hexError = document.getElementById('hexError');

  // Check that all required HTML elements exist.
  if (!form || !nameInput || !hexInput || !hexPicker || !colorPreview || !previewHex || !hexError) {
    console.error('Add Paint: Missing required HTML elements.');
    return;
  }

  // Check whether the hex value has 3 or 6 valid digits.
  function isValidHex(hex) {
    const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexPattern.test(hex);
  }

  // Convert a 3-digit hex value to a 6-digit hex value.
  // Example: #F53 becomes #FF5533.
  function expandHex(hex) {
    if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
      return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    return hex;
  }

  // Update the color preview and validation message.
  function updatePreview() {
    // Read the hex input and remove extra spaces.
    const hex = hexInput.value.trim();

    if (isValidHex(hex)) {
      // Display the selected color.
      colorPreview.style.backgroundColor = hex;

      // Display the hex value below the preview.
      previewHex.textContent = hex.toUpperCase();

      // Synchronize the visual color picker.
      hexPicker.value = expandHex(hex).toUpperCase();

      // Clear previous validation errors.
      hexError.textContent = '';
      hexInput.setCustomValidity('');
    } else {
      // Show a white preview when the hex is invalid.
      colorPreview.style.backgroundColor = '#ffffff';
      previewHex.textContent = 'Invalid color';

      // Display a helpful validation message.
      hexError.textContent = 'Enter a valid hex color, such as #FF5733 or #F53.';

      // Prevent submission of invalid hex values.
      hexInput.setCustomValidity('Invalid hex color');
    }
  }

  // Update the preview when the user types a hex value.
  hexInput.addEventListener('input', updatePreview);

  // Update the hex input when the user selects a color.
  hexPicker.addEventListener('input', () => {
    // Read the color selected from the picker.
    const selectedColor = hexPicker.value.toUpperCase();

    // Copy the selected color into the hex input.
    hexInput.value = selectedColor;

    // Update the preview and clear any validation errors.
    updatePreview();
  });

  // Validate the form when the user clicks Save Paint.
  form.addEventListener('submit', (event) => {
    // Read and clean the entered values.
    const name = nameInput.value.trim();
    const hex = hexInput.value.trim();

    // Check that the name is not empty.
    if (!name) {
      event.preventDefault();
      nameInput.value = name;
      nameInput.reportValidity();
      return;
    }

    // Check that the hex value is valid.
    if (!isValidHex(hex)) {
      event.preventDefault();
      updatePreview();
      hexInput.reportValidity();
      return;
    }

    // Clean up the values before submitting.
    nameInput.value = name;
    hexInput.value = hex.toUpperCase();

    // If valid, the form submits to the Express backend.
    // The controller handles saving the paint to MongoDB.
  });

  // Display the starting color when the page first loads.
  updatePreview();
});
