/**
 * Dark Mode component
 * Handles dark mode toggle functionality
 */

// Initialize dark mode
function initDarkMode() {
  // Check for saved theme preference or respect OS preference
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    updateDarkModeIcons(true);
  } else {
    document.documentElement.classList.remove("dark");
    updateDarkModeIcons(false);
  }

  // Setup dark mode toggle buttons
  setupDarkModeToggle();
}

// Setup dark mode toggle functionality
function setupDarkModeToggle() {
  // Desktop dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }

  // Mobile dark mode toggle
  const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener("click", toggleDarkMode);
  }
}

// Toggle dark mode
function toggleDarkMode() {
  // Add animation class
  const darkModeIcon = document.getElementById("darkModeIcon");
  const darkModeIconMobile = document.getElementById("darkModeIconMobile");

  if (darkModeIcon) {
    darkModeIcon.classList.add("animate-rotate");
  }

  if (darkModeIconMobile) {
    darkModeIconMobile.classList.add("animate-rotate");
  }

  // Toggle dark class
  document.documentElement.classList.toggle("dark");

  // Update localStorage preference
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    updateDarkModeIcons(true);
  } else {
    localStorage.setItem("theme", "light");
    updateDarkModeIcons(false);
  }

  // Remove animation class after animation completes
  setTimeout(function () {
    if (darkModeIcon) {
      darkModeIcon.classList.remove("animate-rotate");
    }
    if (darkModeIconMobile) {
      darkModeIconMobile.classList.remove("animate-rotate");
    }
  }, 500);
}

// Update dark mode icons
function updateDarkModeIcons(isDark) {
  const darkModeIcon = document.getElementById("darkModeIcon");
  const darkModeIconMobile = document.getElementById("darkModeIconMobile");

  if (isDark) {
    // Update to sun icon
    if (darkModeIcon) {
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
    }

    if (darkModeIconMobile) {
      darkModeIconMobile.classList.remove("fa-moon");
      darkModeIconMobile.classList.add("fa-sun");
    }
  } else {
    // Update to moon icon
    if (darkModeIcon) {
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
    }

    if (darkModeIconMobile) {
      darkModeIconMobile.classList.remove("fa-sun");
      darkModeIconMobile.classList.add("fa-moon");
    }
  }
}

// Export functions
export { initDarkMode, toggleDarkMode };
