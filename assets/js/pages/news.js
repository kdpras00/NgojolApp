/**
 * News page specific JavaScript
 */

import { throttle } from "../utils/helpers.js";

// Initialize news page
function initNewsPage() {
  // Initialize reading progress bar
  initReadingProgress();

  // Initialize news search
  initNewsSearch();

  // Initialize category filtering
  initCategoryFilter();

  // Initialize pagination
  initPagination();
}

// Initialize reading progress bar
function initReadingProgress() {
  const progressBar = document.getElementById("readingProgress");
  if (!progressBar) return;

  const calculateReadingProgress = throttle(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
  }, 50);

  window.addEventListener("scroll", calculateReadingProgress);

  // Initial calculation
  calculateReadingProgress();
}

// Initialize news search
function initNewsSearch() {
  const searchInput = document.getElementById("newsSearch");
  const newsCards = document.querySelectorAll(".news-card");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    newsCards.forEach((card) => {
      const title = card
        .querySelector(".news-card-title")
        .textContent.toLowerCase();
      const excerpt =
        card.querySelector(".news-card-excerpt")?.textContent.toLowerCase() ||
        "";

      if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    // Update "no results" message
    updateNoResultsMessage(searchTerm);
  });
}

// Update "no results" message
function updateNoResultsMessage(searchTerm) {
  const noResultsMessage = document.getElementById("noResultsMessage");
  const visibleCards = document.querySelectorAll(".news-card:not(.hidden)");

  if (!noResultsMessage) return;

  if (visibleCards.length === 0 && searchTerm) {
    noResultsMessage.classList.remove("hidden");
    noResultsMessage.querySelector("span").textContent = searchTerm;
  } else {
    noResultsMessage.classList.add("hidden");
  }
}

// Initialize category filtering
function initCategoryFilter() {
  const categoryTags = document.querySelectorAll(".category-tag");
  const newsCards = document.querySelectorAll(".news-card");

  if (categoryTags.length === 0) return;

  categoryTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const category = tag.getAttribute("data-category");

      // Toggle active state
      if (category === "all") {
        // If "all" is clicked, deactivate all other filters
        categoryTags.forEach((t) => {
          if (t.getAttribute("data-category") === "all") {
            t.classList.add("active");
          } else {
            t.classList.remove("active");
          }
        });

        // Show all cards
        newsCards.forEach((card) => {
          card.classList.remove("hidden");
        });
      } else {
        // Deactivate "all" filter
        categoryTags.forEach((t) => {
          if (t.getAttribute("data-category") === "all") {
            t.classList.remove("active");
          }
        });

        // Toggle this category
        tag.classList.toggle("active");

        // Filter cards based on active categories
        filterNewsByCategories();
      }
    });
  });
}

// Filter news by selected categories
function filterNewsByCategories() {
  const activeCategories = Array.from(
    document.querySelectorAll(".category-tag.active")
  ).map((tag) => tag.getAttribute("data-category"));
  const newsCards = document.querySelectorAll(".news-card");

  // If no categories are selected, show all
  if (activeCategories.length === 0) {
    const allTag = document.querySelector('.category-tag[data-category="all"]');
    if (allTag) {
      allTag.classList.add("active");
    }

    newsCards.forEach((card) => {
      card.classList.remove("hidden");
    });
    return;
  }

  // Filter cards based on categories
  newsCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    if (activeCategories.includes(cardCategory)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

// Initialize pagination
function initPagination() {
  const paginationItems = document.querySelectorAll(".pagination-item");
  if (paginationItems.length === 0) return;

  paginationItems.forEach((item) => {
    item.addEventListener("click", () => {
      // In a real application, this would load new content
      // For demo purposes, we'll just toggle active class
      paginationItems.forEach((p) => p.classList.remove("active"));
      item.classList.add("active");

      // Scroll to top of news section
      const newsSection = document.querySelector(".news-grid");
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initNewsPage);

// Export functions
export { initNewsPage };
