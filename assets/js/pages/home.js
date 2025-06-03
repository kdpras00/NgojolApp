/**
 * Home page specific JavaScript
 */

import { initForms } from "../components/forms.js";
import { debounce } from "../utils/helpers.js";

// Initialize home page
function initHomePage() {
  // Initialize FAQ accordion
  initFaqAccordion();

  // Initialize contact form
  initForms();

  // Initialize animations
  initAnimations();

  // Initialize calculator if it exists
  if (document.getElementById("calculator")) {
    initCalculator();
  }
}

// Initialize FAQ accordion
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector("i");

      // Toggle answer visibility
      answer.classList.toggle("active");

      // Toggle icon
      if (icon) {
        icon.classList.toggle("fa-plus");
        icon.classList.toggle("fa-minus");
      }

      // Close other answers
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          const otherAnswer = otherQuestion.nextElementSibling;
          const otherIcon = otherQuestion.querySelector("i");

          if (otherAnswer.classList.contains("active")) {
            otherAnswer.classList.remove("active");

            if (otherIcon) {
              otherIcon.classList.remove("fa-minus");
              otherIcon.classList.add("fa-plus");
            }
          }
        }
      });
    });
  });
}

// Initialize animations for elements
function initAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const checkElementsInView = debounce(() => {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate__animated");
        element.classList.add(element.dataset.animation || "animate__fadeIn");
      }
    });
  }, 100);

  // Check on scroll
  window.addEventListener("scroll", checkElementsInView);

  // Initial check
  checkElementsInView();
}

// Initialize price calculator
function initCalculator() {
  const distanceInput = document.getElementById("distance");
  const weightInput = document.getElementById("weight");
  const calculateButton = document.getElementById("calculatePrice");
  const resultElement = document.getElementById("calculationResult");

  if (!distanceInput || !weightInput || !calculateButton || !resultElement)
    return;

  calculateButton.addEventListener("click", () => {
    const distance = parseFloat(distanceInput.value) || 0;
    const weight = parseFloat(weightInput.value) || 0;

    // Validate inputs
    if (distance <= 0 || weight <= 0) {
      resultElement.textContent = "Masukkan jarak dan berat yang valid";
      resultElement.classList.add("text-red-500");
      return;
    }

    // Calculate price (example formula)
    // Base price + (distance * rate) + (weight * rate)
    const basePrice = 10000;
    const distanceRate = 2000;
    const weightRate = 1000;

    const price = basePrice + distance * distanceRate + weight * weightRate;

    // Format and display result
    resultElement.textContent = `Estimasi biaya: ${formatCurrency(price)}`;
    resultElement.classList.remove("text-red-500");
    resultElement.classList.add("text-green-600", "font-semibold");
  });
}

// Format currency to IDR
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initHomePage);

// Export functions
export { initHomePage };
