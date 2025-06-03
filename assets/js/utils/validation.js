/**
 * Form validation utilities
 */

// Validate email format
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Validate phone number (Indonesian format)
function validatePhone(phone) {
  // Indonesian phone format: +62 or 0 followed by 8-12 digits
  const re = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
  return re.test(phone);
}

// Validate required field
function validateRequired(value) {
  return value.trim() !== "";
}

// Validate minimum length
function validateMinLength(value, minLength) {
  return value.length >= minLength;
}

// Validate maximum length
function validateMaxLength(value, maxLength) {
  return value.length <= maxLength;
}

// Validate numeric value
function validateNumeric(value) {
  return /^\d+$/.test(value);
}

// Validate ID card number (KTP)
function validateKTP(value) {
  // KTP is 16 digits
  return /^\d{16}$/.test(value);
}

// Validate file size
function validateFileSize(file, maxSizeMB) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

// Validate file type
function validateFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type);
}

// Validate password strength
function validatePasswordStrength(password) {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}

// Validate passwords match
function validatePasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Show validation error
function showValidationError(inputElement, message) {
  const formGroup = inputElement.closest(".form-group");
  const errorElement =
    formGroup.querySelector(".form-error-message") ||
    document.createElement("div");

  errorElement.className = "form-error-message";
  errorElement.textContent = message;

  if (!formGroup.querySelector(".form-error-message")) {
    formGroup.appendChild(errorElement);
  }

  inputElement.classList.add("error");
  inputElement.classList.remove("success");
}

// Clear validation error
function clearValidationError(inputElement) {
  const formGroup = inputElement.closest(".form-group");
  const errorElement = formGroup.querySelector(".form-error-message");

  if (errorElement) {
    errorElement.remove();
  }

  inputElement.classList.remove("error");
}

// Show validation success
function showValidationSuccess(inputElement) {
  inputElement.classList.add("success");
  inputElement.classList.remove("error");
}

// Export all functions
export {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumeric,
  validateKTP,
  validateFileSize,
  validateFileType,
  validatePasswordStrength,
  validatePasswordsMatch,
  showValidationError,
  clearValidationError,
  showValidationSuccess,
};
