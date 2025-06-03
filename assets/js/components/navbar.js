/**
 * Navbar component
 * Handles navbar functionality and appearance
 */

import { throttle } from "../utils/helpers.js";

// Initialize navbar
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Setup mobile menu
  setupMobileMenu();

  // Setup scroll behavior
  setupNavbarScroll();

  // Setup language selector
  setupLanguageSelector();
}

// Setup mobile menu functionality
function setupMobileMenu() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");

    // Add animation when opening
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("animate__animated", "animate__fadeInDown");
    }
  });

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Setup navbar scroll behavior
function setupNavbarScroll() {
  const navbar = document.getElementById("navbar");
  const navbarTitle = document.getElementById("navbar-title");
  const navbarLinks = document.querySelectorAll(".navbar-link");
  const beranda = document.getElementById("beranda");

  if (!navbar) return;

  // Optimized scroll handler with throttling
  const handleScroll = throttle(function () {
    const scrollPosition = window.scrollY;
    const berandaHeight = beranda ? beranda.offsetHeight : 0;

    // Apply navbar styles based on scroll position
    if (scrollPosition < 50) {
      setNavbarTransparent();
    } else if (scrollPosition < berandaHeight) {
      setNavbarSemiTransparent();
    } else {
      setNavbarSolid();
    }

    // Back to top button visibility
    updateBackToTopButton(scrollPosition);
  }, 100); // Throttle to run at most every 100ms

  // Add the optimized scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Initial call to set correct state
  handleScroll();
}

// Set navbar to transparent state
function setNavbarTransparent() {
  const navbar = document.getElementById("navbar");
  const navbarTitle = document.getElementById("navbar-title");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  if (!navbar) return;

  navbar.style.backgroundColor = "transparent";
  navbar.classList.remove("shadow-md");

  if (navbarTitle) {
    navbarTitle.classList.remove("text-black");
    navbarTitle.classList.add("text-white");
  }

  navbarLinks.forEach((link) => {
    link.style.color = "white";
    link.classList.remove("hover:text-blue-600");
    link.classList.add("hover:text-white");
  });
}

// Set navbar to semi-transparent state
function setNavbarSemiTransparent() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  navbar.style.backgroundColor = "rgba(0, 188, 212, 0.9)";
  navbar.classList.add("shadow-md");
}

// Set navbar to solid state
function setNavbarSolid() {
  const navbar = document.getElementById("navbar");
  const navbarTitle = document.getElementById("navbar-title");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  if (!navbar) return;

  navbar.style.backgroundColor = "#06b6d4";
  navbar.classList.add("shadow-md");

  if (navbarTitle) {
    navbarTitle.classList.remove("text-white");
    navbarTitle.classList.add("text-black");
  }

  navbarLinks.forEach((link) => {
    link.style.color = "black";
    link.classList.remove("hover:text-white");
    link.classList.add("hover:text-gray-200");
  });
}

// Update back to top button visibility
function updateBackToTopButton(scrollPosition) {
  const backToTopButton = document.getElementById("backToTop");

  if (!backToTopButton) return;

  if (scrollPosition > 300) {
    if (!backToTopButton.classList.contains("opacity-100")) {
      backToTopButton.classList.remove("opacity-0", "invisible");
      backToTopButton.classList.add("opacity-100", "visible");
    }
  } else {
    if (!backToTopButton.classList.contains("opacity-0")) {
      backToTopButton.classList.add("opacity-0", "invisible");
      backToTopButton.classList.remove("opacity-100", "visible");
    }
  }
}

// Setup language selector dropdown
function setupLanguageSelector() {
  const languageToggle = document.getElementById("languageToggle");
  const languageDropdown = document.getElementById("languageDropdown");

  if (!languageToggle || !languageDropdown) return;

  languageToggle.addEventListener("click", function () {
    languageDropdown.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !languageToggle.contains(event.target) &&
      !languageDropdown.contains(event.target)
    ) {
      languageDropdown.classList.add("hidden");
    }
  });

  // Language selection
  const languageOptions = document.querySelectorAll(".language-option");
  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      // Here you would implement language switching logic
      console.log("Language selected:", lang);
      languageDropdown.classList.add("hidden");
    });
  });
}

// Export functions
export { initNavbar };
