/**
 * Slider component
 * Handles testimonial slider functionality
 */

// Initialize slider
function initSlider() {
  const slider = document.getElementById("testimonialsSlider");
  if (!slider) return;

  const sliderContainer = slider.querySelector("div");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  if (!sliderContainer || !prevButton || !nextButton) return;

  // Get slides and calculate values
  const slides = sliderContainer.querySelectorAll(".testimonial-card");
  let currentIndex = 0;
  const visibleSlides = getVisibleSlides();
  const maxIndex = Math.max(0, slides.length - visibleSlides);

  // Create pagination dots
  createPaginationDots(slides.length, visibleSlides);

  // Initial update
  updateSliderPosition();

  // Add event listeners
  prevButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSliderPosition();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateSliderPosition();
  });

  // Add touch support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  // Handle window resize
  window.addEventListener("resize", handleResize);

  // Get number of visible slides based on screen size
  function getVisibleSlides() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }

  // Create pagination dots
  function createPaginationDots(totalSlides, visibleSlides) {
    const dotsContainer = document.querySelector(".pagination-dots");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    const dotsCount = Math.max(1, totalSlides - visibleSlides + 1);

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add(
        "w-3",
        "h-3",
        "rounded-full",
        "bg-gray-300",
        "mx-1",
        "cursor-pointer",
        "transition-all"
      );
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSliderPosition();
      });
      dotsContainer.appendChild(dot);
    }

    // Initial active dot
    updateDots();
  }

  // Update pagination dots
  function updateDots() {
    const dots = document.querySelectorAll(".pagination-dots span");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-primary-500", "scale-110");
      } else {
        dot.classList.remove("bg-primary-500", "scale-110");
        dot.classList.add("bg-gray-300");
      }
    });
  }

  // Update slider position
  function updateSliderPosition() {
    const slideWidth =
      slides[0].offsetWidth +
      parseInt(window.getComputedStyle(slides[0]).marginLeft) +
      parseInt(window.getComputedStyle(slides[0]).marginRight);
    sliderContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;

    // Update button states
    prevButton.classList.toggle("opacity-50", currentIndex === 0);
    nextButton.classList.toggle("opacity-50", currentIndex === maxIndex);

    // Update dots
    updateDots();
  }

  // Handle swipe gesture
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left, go next
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateSliderPosition();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right, go prev
      currentIndex = Math.max(0, currentIndex - 1);
      updateSliderPosition();
    }
  }

  // Handle window resize
  function handleResize() {
    const newVisibleSlides = getVisibleSlides();
    if (newVisibleSlides !== visibleSlides) {
      // Recalculate slider
      location.reload();
    } else {
      updateSliderPosition();
    }
  }
}

// Export functions
export { initSlider };
