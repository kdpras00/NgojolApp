/**
 * Registration page specific JavaScript
 */

import { initForms } from "../components/forms.js";

// Initialize registration page
function initRegistrationPage() {
  // Initialize forms (includes registration form)
  initForms();

  // Initialize vehicle type selector
  initVehicleTypeSelector();

  // Initialize experience level selector
  initExperienceLevelSelector();
}

// Initialize vehicle type selector
function initVehicleTypeSelector() {
  const vehicleTypeCards = document.querySelectorAll(".vehicle-type-card");
  const vehicleTypeInput = document.getElementById("vehicleType");

  if (!vehicleTypeCards.length || !vehicleTypeInput) return;

  vehicleTypeCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      vehicleTypeCards.forEach((c) =>
        c.classList.remove("border-primary-500", "bg-primary-50")
      );

      // Add active class to selected card
      card.classList.add("border-primary-500", "bg-primary-50");

      // Update hidden input value
      const vehicleType = card.getAttribute("data-vehicle-type");
      vehicleTypeInput.value = vehicleType;

      // Show/hide vehicle-specific fields
      toggleVehicleSpecificFields(vehicleType);
    });
  });
}

// Toggle vehicle-specific fields based on selected vehicle type
function toggleVehicleSpecificFields(vehicleType) {
  const motorcycleFields = document.getElementById("motorcycleFields");
  const carFields = document.getElementById("carFields");

  if (!motorcycleFields || !carFields) return;

  if (vehicleType === "motorcycle") {
    motorcycleFields.classList.remove("hidden");
    carFields.classList.add("hidden");
  } else if (vehicleType === "car") {
    motorcycleFields.classList.add("hidden");
    carFields.classList.remove("hidden");
  }
}

// Initialize experience level selector
function initExperienceLevelSelector() {
  const experienceLevels = document.querySelectorAll(".experience-level");
  const experienceLevelInput = document.getElementById("experienceLevel");

  if (!experienceLevels.length || !experienceLevelInput) return;

  experienceLevels.forEach((level) => {
    level.addEventListener("click", () => {
      // Remove active class from all levels
      experienceLevels.forEach((l) => {
        l.classList.remove("border-primary-500");
        l.querySelector(".experience-check").classList.add("hidden");
      });

      // Add active class to selected level
      level.classList.add("border-primary-500");
      level.querySelector(".experience-check").classList.remove("hidden");

      // Update hidden input value
      experienceLevelInput.value = level.getAttribute("data-experience");
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initRegistrationPage);

// Export functions
export { initRegistrationPage };
