/**
 * Forms component
 * Handles form validation and submission
 */

import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateKTP,
  validateFileSize,
  validateFileType,
  showValidationError,
  clearValidationError,
  showValidationSuccess,
} from "../utils/validation.js";

// Initialize forms
function initForms() {
  // Initialize registration form if it exists
  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    initRegistrationForm();
  }

  // Initialize contact form if it exists
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    initContactForm();
  }

  // Initialize all file inputs
  initFileInputs();
}

// Initialize registration form
function initRegistrationForm() {
  const form = document.getElementById("registrationForm");
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");
  const formSections = document.querySelectorAll(".form-section");
  const steps = document.querySelectorAll(".registration-step");
  let currentStep = 0;

  // Initialize map if it exists
  if (document.getElementById("map")) {
    initMap();
  }

  // Handle next button clicks
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Validate current section before proceeding
      if (validateSection(currentStep)) {
        // Hide current section
        formSections[currentStep].classList.remove("active");
        // Mark current step as completed
        steps[currentStep].classList.add("completed");
        // Show next section
        currentStep++;
        formSections[currentStep].classList.add("active");
        steps[currentStep].classList.add("active");
        // Scroll to top of form
        form.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Handle previous button clicks
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hide current section
      formSections[currentStep].classList.remove("active");
      // Remove active class from current step
      steps[currentStep].classList.remove("active");
      // Show previous section
      currentStep--;
      formSections[currentStep].classList.add("active");
      // Scroll to top of form
      form.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Handle form submission
  form.addEventListener("submit", handleRegistrationSubmit);
}

// Initialize contact form
function initContactForm() {
  const form = document.getElementById("contactForm");

  // Add input validation listeners
  const emailInput = form.querySelector('input[name="email"]');
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      validateInput(
        emailInput,
        validateEmail(emailInput.value),
        "Email tidak valid"
      );
    });
  }

  const nameInput = form.querySelector('input[name="name"]');
  if (nameInput) {
    nameInput.addEventListener("blur", () => {
      validateInput(
        nameInput,
        validateRequired(nameInput.value),
        "Nama harus diisi"
      );
    });
  }

  const messageInput = form.querySelector('textarea[name="message"]');
  if (messageInput) {
    messageInput.addEventListener("blur", () => {
      validateInput(
        messageInput,
        validateRequired(messageInput.value),
        "Pesan harus diisi"
      );
    });
  }

  // Handle form submission
  form.addEventListener("submit", handleContactSubmit);
}

// Initialize file inputs
function initFileInputs() {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  fileInputs.forEach((input) => {
    const wrapper = input.closest(".file-upload-wrapper");
    if (!wrapper) return;

    input.addEventListener("change", () => {
      if (input.files.length > 0) {
        const fileName = input.files[0].name;
        wrapper.setAttribute("data-text", fileName);

        // Validate file size (max 5MB)
        if (!validateFileSize(input.files[0], 5)) {
          showValidationError(input, "Ukuran file maksimal 5MB");
        } else {
          // Validate file type (images and PDFs)
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf",
          ];
          if (!validateFileType(input.files[0], allowedTypes)) {
            showValidationError(input, "Format file harus JPG, PNG, atau PDF");
          } else {
            clearValidationError(input);
            showValidationSuccess(input);
          }
        }
      }
    });
  });
}

// Initialize map
function initMap() {
  // Check if Leaflet is available
  if (typeof L === "undefined") return;

  // Initialize map centered on Indonesia
  const map = L.map("map").setView([-6.2, 106.816666], 13);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add marker for selected location
  let marker;

  // Add click event to map
  map.on("click", function (e) {
    // Remove existing marker if any
    if (marker) {
      map.removeLayer(marker);
    }

    // Add new marker
    marker = L.marker(e.latlng).addTo(map);

    // Update hidden inputs with coordinates
    document.getElementById("latitude").value = e.latlng.lat;
    document.getElementById("longitude").value = e.latlng.lng;
  });

  // Try to get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 15);

      // Add marker at current location
      marker = L.marker([latitude, longitude]).addTo(map);

      // Update hidden inputs with coordinates
      document.getElementById("latitude").value = latitude;
      document.getElementById("longitude").value = longitude;
    });
  }
}

// Validate form section
function validateSection(sectionIndex) {
  const section = document.querySelectorAll(".form-section")[sectionIndex];
  const inputs = section.querySelectorAll("input, select, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    // Skip hidden inputs and buttons
    if (
      input.type === "hidden" ||
      input.type === "button" ||
      input.type === "submit"
    ) {
      return;
    }

    // Validate based on input type
    let validationResult = true;
    let errorMessage = "";

    if (input.required) {
      if (input.type === "file") {
        validationResult = input.files.length > 0;
        errorMessage = "File harus diunggah";
      } else {
        validationResult = validateRequired(input.value);
        errorMessage = "Field ini harus diisi";
      }
    }

    // Additional validation based on input name
    if (validationResult && input.name === "email") {
      validationResult = validateEmail(input.value);
      errorMessage = "Email tidak valid";
    } else if (validationResult && input.name === "phone") {
      validationResult = validatePhone(input.value);
      errorMessage = "Nomor telepon tidak valid";
    } else if (validationResult && input.name === "ktp") {
      validationResult = validateKTP(input.value);
      errorMessage = "Nomor KTP harus 16 digit";
    }

    // Show validation result
    if (!validationResult) {
      showValidationError(input, errorMessage);
      isValid = false;
    } else {
      clearValidationError(input);
      showValidationSuccess(input);
    }
  });

  return isValid;
}

// Handle registration form submission
function handleRegistrationSubmit(e) {
  e.preventDefault();

  // Validate all sections
  let isValid = true;
  const formSections = document.querySelectorAll(".form-section");

  for (let i = 0; i < formSections.length; i++) {
    if (!validateSection(i)) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    // Show success message
    const formContainer = document.querySelector(".registration-form");
    const successMessage = document.querySelector(".success-message");

    if (formContainer && successMessage) {
      formContainer.style.display = "none";
      successMessage.style.display = "block";

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.type !== "hidden" && input.type !== "submit") {
      if (input.name === "email") {
        if (!validateEmail(input.value)) {
          showValidationError(input, "Email tidak valid");
          isValid = false;
        }
      } else if (input.required && !validateRequired(input.value)) {
        showValidationError(input, "Field ini harus diisi");
        isValid = false;
      }
    }
  });

  if (isValid) {
    // Show success message
    Swal.fire({
      title: "Terima Kasih!",
      text: "Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#00bcd4",
    });

    // Reset form
    form.reset();
  }
}

// Validate a single input
function validateInput(input, isValid, errorMessage) {
  if (!isValid) {
    showValidationError(input, errorMessage);
  } else {
    clearValidationError(input);
    showValidationSuccess(input);
  }
}

// Export functions
export { initForms, validateInput };
