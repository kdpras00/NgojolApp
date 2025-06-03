/**
 * Main JavaScript file
 * Imports and initializes all components
 */

// Import components
import { initNavbar } from "./components/navbar.js";
import { initDarkMode } from "./components/darkMode.js";
import { initSlider } from "./components/slider.js";
import { initNotifications } from "./components/notifications.js";

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize core components
  initNavbar();
  initDarkMode();

  // Initialize page-specific components
  if (document.getElementById("testimonialsSlider")) {
    initSlider();
  }

  // Initialize browser notifications
  initNotifications();

  // Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }

  // Register service worker for PWA support
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered successfully");
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }
});

// Handle back to top button
const backToTopButton = document.getElementById("backToTop");
if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Export any functions that might be needed elsewhere
export {};
