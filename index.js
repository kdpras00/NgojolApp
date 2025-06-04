tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00bcd4",
          600: "#00acc1",
          700: "#0097a7",
          800: "#00838f",
          900: "#006064",
        },
        secondary: {
          50: "#fce4ec",
          100: "#f8bbd0",
          200: "#f48fb1",
          300: "#f06292",
          400: "#ec407a",
          500: "#e91e63",
          600: "#d81b60",
          700: "#c2185b",
          800: "#ad1457",
          900: "#880e4f",
        },
      },
      boxShadow: {
        neumorph: "20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff",
        "neumorph-sm": "10px 10px 30px #d1d1d1, -10px -10px 30px #ffffff",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backdropBlur: {
        glass: "4px",
      },
    },
  },
};

// Hide preloader when page is loaded
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }

  // Handle direct navigation to sections via URL hash
  if (window.location.hash) {
    setTimeout(() => {
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get navbar height for offset
        const navbarHeight = document.querySelector("nav").offsetHeight;

        // Calculate position with offset
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        // Scroll to the target section
        window.scrollTo({
          top: targetPosition,
          behavior: "auto", // Use 'auto' for initial load to prevent animation issues
        });

        // Highlight the correct navigation item
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach((link) => {
          link.classList.remove("active-nav-link");
          if (link.getAttribute("href") === targetId) {
            link.classList.add("active-nav-link");
          }
        });
      }
    }, 600); // Slight delay after preloader is hidden
  }
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  // Also hide preloader on DOMContentLoaded as a fallback
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }

  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    // Prevent animation glitches by tracking animation state
    let isAnimating = false;

    mobileMenuButton.addEventListener("click", function () {
      // Prevent multiple clicks during animation
      if (isAnimating) return;
      isAnimating = true;

      if (mobileMenu.classList.contains("hidden")) {
        // Opening menu
        mobileMenu.classList.remove("hidden");
        mobileMenu.style.opacity = "0";
        mobileMenu.style.transform = "scale(0.95)";

        // Force reflow to ensure animation works
        mobileMenu.offsetHeight;

        // Apply animation
        mobileMenu.style.opacity = "1";
        mobileMenu.style.transform = "scale(1)";
      } else {
        // Closing menu
        mobileMenu.style.opacity = "0";
        mobileMenu.style.transform = "scale(0.95)";

        // Hide after animation completes
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }

      // Reset animation lock after transition completes
      setTimeout(() => {
        isAnimating = false;
      }, 300);
    });
  }

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) {
        mobileMenu.style.opacity = "0";
        mobileMenu.style.transform = "scale(0.95)";

        // Hide after animation completes
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    });
  });
});

// Debounce function to limit how often a function can run
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Throttle function to limit execution rate
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Optimized scroll handler with throttling
const handleScroll = throttle(function () {
  const navbar = document.getElementById("navbar");
  const navbarTitle = document.getElementById("navbar-title");
  const navbarLinks = document.querySelectorAll(".navbar-link");
  const beranda = document.getElementById("beranda");
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

  // Find current section for navigation highlighting
  updateCurrentSection(scrollPosition);
}, 100); // Throttle to run at most every 100ms

// Add the optimized scroll event listener
window.addEventListener("scroll", handleScroll);

// Set navbar to transparent state
function setNavbarTransparent() {
  const navbar = document.getElementById("navbar");
  const navbarTitle = document.getElementById("navbar-title");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  if (!navbar) return;

  navbar.style.backgroundColor = "transparent";
  navbar.classList.remove("shadow-md");
  navbar.classList.remove("bg-white");
  navbar.classList.add("bg-transparent");

  if (navbarTitle) {
    navbarTitle.classList.remove("text-black");
    navbarTitle.classList.add("text-white");
  }

  navbarLinks.forEach((link) => {
    link.classList.remove("text-black");
    link.classList.add("text-white");
  });
}

// Set navbar to semi-transparent state
function setNavbarSemiTransparent() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  navbar.style.backgroundColor = "rgba(0, 188, 212, 0.9)";
  navbar.classList.add("shadow-md");
  navbar.classList.remove("bg-white", "bg-transparent");
}

// Set navbar to solid state
function setNavbarSolid() {
  const navbar = document.getElementById("navbar");
  const navbarTitle = document.getElementById("navbar-title");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  if (!navbar) return;

  navbar.style.backgroundColor = "#06b6d4";
  navbar.classList.add("shadow-md");
  navbar.classList.remove("bg-transparent");

  if (navbarTitle) {
    // Keep the text color white instead of changing to black
    // navbarTitle.classList.remove("text-white");
    // navbarTitle.classList.add("text-black");
  }

  navbarLinks.forEach((link) => {
    link.classList.remove("text-white");
    link.classList.add("text-black");
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

// Update current section for navigation highlighting
function updateCurrentSection(scrollPosition) {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Add offset for navbar height
  const navbarHeight = document.querySelector("nav").offsetHeight;
  const scrollPosWithOffset = scrollPosition + navbarHeight + 50;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosWithOffset >= sectionTop &&
      scrollPosWithOffset <= sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-nav-link");
    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("active-nav-link");
    }
  });
}

// Fungsi untuk memeriksa lokasi hash saat ini
function checkCurrentHash() {
  if (window.location.hash !== "#beranda" && window.location.hash !== "") {
    setNavbarSolid(); // Jika hash bukan #beranda atau kosong
  } else {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const berandaHeight = beranda ? beranda.offsetHeight : 0;

    if (scrollTop < berandaHeight) {
      setNavbarTransparent(); // Jika berada di bagian atas beranda
    } else {
      setNavbarSolid(); // Jika sudah melewati beranda
    }
  }
}

// Periksa hash saat halaman dimuat
window.addEventListener("load", checkCurrentHash);
window.addEventListener("hashchange", checkCurrentHash); // Periksa saat hash berubah

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("testimonialsSlider");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const paginationContainer = document.querySelector(".pagination-dots");

  const testimonials = slider.children;
  const testimonialsCount = testimonials.length;
  let currentIndex = 0;
  let visibleSlides = getVisibleSlides();

  // Get number of visible slides based on screen width
  function getVisibleSlides() {
    return window.innerWidth >= 1024
      ? 3 // Large screens: 3 cards
      : window.innerWidth >= 768
      ? 2 // Medium screens: 2 cards
      : 1; // Mobile: 1 card
  }

  // Initialize pagination dots
  function createPaginationDots() {
    paginationContainer.innerHTML = ""; // Clear existing dots
    const totalGroups = Math.ceil(testimonialsCount / visibleSlides);

    for (let i = 0; i < totalGroups; i++) {
      const dot = document.createElement("button");
      dot.classList.add(
        "w-3",
        "h-3",
        "rounded-full",
        "bg-gray-300",
        "focus:outline-none",
        "transition-all",
        "duration-300"
      );
      if (i === 0) {
        dot.classList.add("bg-primary-500", "scale-125");
      }
      dot.addEventListener("click", () => goToSlide(i * visibleSlides));
      paginationContainer.appendChild(dot);
    }
  }

  // Update active dot
  function updateDots() {
    const dots = paginationContainer.children;
    const activeGroup = Math.floor(currentIndex / visibleSlides);

    for (let i = 0; i < dots.length; i++) {
      if (i === activeGroup) {
        dots[i].classList.remove("bg-gray-300", "scale-100");
        dots[i].classList.add("bg-primary-500", "scale-125");
      } else {
        dots[i].classList.remove("bg-primary-500", "scale-125");
        dots[i].classList.add("bg-gray-300", "scale-100");
      }
    }
  }

  // Go to specific slide with smooth animation
  function goToSlide(index) {
    // Update visibleSlides based on screen size
    visibleSlides = getVisibleSlides();

    // Ensure index is within bounds
    const maxIndex = testimonialsCount - visibleSlides;
    currentIndex = Math.min(Math.max(0, index), maxIndex);

    // Calculate slide width based on container width and visible slides
    const slideWidth = slider.parentElement.clientWidth / visibleSlides;

    // Apply the transform with smooth transition
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  // Handle resize
  function handleResize() {
    // Recalculate visibleSlides and go to the current slide
    const oldVisibleSlides = visibleSlides;
    visibleSlides = getVisibleSlides();

    // If the number of visible slides changed, recreate dots
    if (oldVisibleSlides !== visibleSlides) {
      createPaginationDots();
    }

    goToSlide(currentIndex);
  }

  // Event listeners
  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - visibleSlides);
  });

  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + visibleSlides);
  });

  window.addEventListener("resize", handleResize);

  // Initialize
  createPaginationDots();
  handleResize();

  // Auto slide
  let autoSlideInterval = setInterval(() => {
    if (currentIndex >= testimonialsCount - visibleSlides) {
      goToSlide(0); // Go back to start
    } else {
      goToSlide(currentIndex + visibleSlides); // Go forward one group
    }
  }, 5000);

  // Pause auto-slide on hover
  const sliderContainer = slider.parentElement.parentElement;
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  sliderContainer.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => {
      if (currentIndex >= testimonialsCount - visibleSlides) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + visibleSlides);
      }
    }, 5000);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculate-btn");
  const resultContainer = document.getElementById("result-container");
  const emptyResult = document.getElementById("empty-result");
  const weightFeeContainer = document.getElementById("weight-fee-container");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", function () {
      // Get input values
      const serviceType = document.getElementById("service-type").value;
      const distance =
        parseFloat(document.getElementById("distance").value) || 0;
      const weight = parseFloat(document.getElementById("weight").value) || 0;

      if (distance <= 0) {
        alert("Mohon masukkan jarak yang valid");
        return;
      }

      // Base rates
      const baseRates = {
        motor: 5000,
        car: 10000,
        express: 7000,
        truck: 25000,
      };

      // Per km rates
      const kmRates = {
        motor: 2000,
        car: 3500,
        express: 2500,
        truck: 5000,
      };

      // Weight rates (per kg)
      const weightRates = {
        express: 1000,
        truck: 500,
      };

      // Calculate fees
      const baseFee = baseRates[serviceType];
      const distanceFee = kmRates[serviceType] * distance;
      let weightFee = 0;

      if (
        (serviceType === "express" || serviceType === "truck") &&
        weight > 0
      ) {
        weightFee = weightRates[serviceType] * weight;
        weightFeeContainer.classList.remove("hidden");
      } else {
        weightFeeContainer.classList.add("hidden");
      }

      const totalFee = baseFee + distanceFee + weightFee;

      // Format currency
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      });

      // Update UI
      document.getElementById("base-fee").textContent =
        formatter.format(baseFee);
      document.getElementById("distance-fee").textContent =
        formatter.format(distanceFee);
      document.getElementById("weight-fee").textContent =
        formatter.format(weightFee);
      document.getElementById("total-fee").textContent =
        formatter.format(totalFee);

      // Show result
      resultContainer.classList.remove("hidden");
      emptyResult.classList.add("hidden");
    });
  }

  // Handle cookie consent
  const cookieConsent = document.getElementById("cookieConsent");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieReject = document.getElementById("cookieReject");

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookieChoice");
  if (!cookieChoice && cookieConsent) {
    // Show cookie banner after a delay
    setTimeout(() => {
      cookieConsent.classList.remove("translate-y-full", "opacity-0");
    }, 2000);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener("click", function () {
      localStorage.setItem("cookieChoice", "accepted");
      hideCookieBanner();
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener("click", function () {
      localStorage.setItem("cookieChoice", "rejected");
      hideCookieBanner();
    });
  }
});

function hideCookieBanner() {
  const cookieConsent = document.getElementById("cookieConsent");
  if (cookieConsent) {
    cookieConsent.classList.add("translate-y-full", "opacity-0");
  }
}

// Back to Top Button
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
      } else {
        backToTopButton.classList.add("opacity-0", "invisible");
        backToTopButton.classList.remove("opacity-100", "visible");
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Live Chat Functionality with Gemini AI
document.addEventListener("DOMContentLoaded", function () {
  // Initialize chat elements
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatLanguageButton = document.getElementById("chatLanguageButton");
  const chatLanguageMenu = document.getElementById("chatLanguageMenu");

  // Check if chat elements exist
  if (!chatToggle || !chatWindow || !chatMessages) {
    console.error("Chat elements not found in the DOM");
    return; // Exit if elements don't exist
  }

  // Gemini API Key
  const API_KEY = "AIzaSyC-if6ei1E11uPPPs2JOAmfquSXCHPMtCo";

  // Default language
  let currentLanguage = "id"; // Default to Indonesian

  // AI chat history
  let conversationHistory = [];

  // Welcome messages in different languages
  const welcomeMessages = {
    id: "Halo! Selamat datang di layanan chat NG-OJOL. Ada yang bisa kami bantu?",
    en: "Hello! Welcome to NG-OJOL chat service. How can I help you?",
    zh: "你好！欢迎使用 NG-OJOL 聊天服务。我能为您做些什么？",
    ar: "مرحبًا! مرحبًا بك في خدمة دردشة NG-OJOL. كيف يمكنني مساعدتك؟",
    es: "¡Hola! Bienvenido al servicio de chat de NG-OJOL. ¿Cómo puedo ayudarte?",
    fr: "Bonjour! Bienvenue sur le service de chat NG-OJOL. Comment puis-je vous aider?",
    de: "Hallo! Willkommen beim NG-OJOL-Chat-Service. Wie kann ich Ihnen helfen?",
    ja: "こんにちは！NG-OJOLチャットサービスへようこそ。どのようにお手伝いできますか？",
    ko: "안녕하세요! NG-OJOL 채팅 서비스에 오신 것을 환영합니다. 어떻게 도와드릴까요?",
    ru: "Здравствуйте! Добро пожаловать в чат-сервис NG-OJOL. Чем я могу вам помочь?",
  };

  // Update welcome message based on selected language
  function updateWelcomeMessage() {
    // Clear existing messages
    chatMessages.innerHTML = "";

    // Add welcome message in selected language
    addBotMessage(welcomeMessages[currentLanguage] || welcomeMessages.en);
  }

  // Toggle chat window visibility
  if (chatToggle) {
    chatToggle.addEventListener("click", function () {
      // Prevent multiple clicks during animation
      if (chatToggle.dataset.animating === "true") return;

      chatToggle.dataset.animating = "true";

      console.log("Chat toggle clicked"); // Debug
      if (chatWindow.classList.contains("scale-0")) {
        // Opening the chat
        chatWindow.classList.remove("scale-0");
        chatWindow.classList.add("scale-100");

        // Only reset messages if the window was previously closed
        if (chatMessages.querySelectorAll(".flex").length === 0) {
          updateWelcomeMessage();
        }
      } else {
        // Closing the chat
        chatWindow.classList.remove("scale-100");
        chatWindow.classList.add("scale-0");
      }

      // Reset animation lock after transition completes
      setTimeout(() => {
        chatToggle.dataset.animating = "false";
      }, 300);
    });
  }

  // Close chat window
  if (chatClose) {
    chatClose.addEventListener("click", function () {
      chatWindow.classList.remove("scale-100");
      chatWindow.classList.add("scale-0");
    });
  }

  // Toggle language menu
  if (chatLanguageButton && chatLanguageMenu) {
    chatLanguageButton.addEventListener("click", function () {
      chatLanguageMenu.classList.toggle("hidden");
    });
  }

  // Handle language selection
  const languageOptions = document.querySelectorAll(".language-option");
  if (languageOptions.length > 0) {
    languageOptions.forEach((option) => {
      option.addEventListener("click", function () {
        currentLanguage = this.getAttribute("data-lang");
        chatLanguageMenu.classList.add("hidden");

        // Update welcome message when language changes
        updateWelcomeMessage();

        // Reset conversation history
        conversationHistory = [];
      });
    });
  }

  // Close language menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      chatLanguageButton &&
      chatLanguageMenu &&
      !chatLanguageButton.contains(e.target) &&
      !chatLanguageMenu.contains(e.target)
    ) {
      chatLanguageMenu.classList.add("hidden");
    }
  });

  // Handle chat form submission
  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!chatInput) return;

      const message = chatInput.value.trim();
      if (message) {
        addUserMessage(message);
        chatInput.value = "";
        // Simulate AI response
        setTimeout(() => {
          getAIResponse(message);
        }, 500);
      }
    });
  }

  // Add a user message to the chat
  function addUserMessage(message) {
    const messageTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageHTML = `
      <div class="flex mb-4 justify-end">
        <div class="mr-2 bg-[#00BCD4] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%]">
          <p class="text-sm text-white">${message}</p>
          <span class="text-xs text-white text-opacity-80 mt-1 block text-right">${messageTime}</span>
        </div>
        <div class="w-8 h-8 bg-[#00BCD4] rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas fa-user text-white text-sm"></i>
        </div>
      </div>
    `;

    chatMessages.insertAdjacentHTML("beforeend", messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add message to conversation history
    conversationHistory.push({ role: "user", parts: message });
  }

  // Add a bot message to the chat
  function addBotMessage(message) {
    const messageTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageHTML = `
      <div class="flex mb-4">
        <div class="w-8 h-8 bg-[#E3F2FD] rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas fa-headset text-[#00BCD4] text-sm"></i>
        </div>
        <div class="ml-2 bg-[#E3F2FD] p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
          <p class="text-sm text-gray-700">${message}</p>
          <span class="text-xs text-gray-400 mt-1 block">${messageTime}</span>
        </div>
      </div>
    `;

    chatMessages.insertAdjacentHTML("beforeend", messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to get AI response from Gemini
  async function getAIResponse(message) {
    // Add typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "flex mb-4";
    typingIndicator.innerHTML = `
      <div class="w-8 h-8 bg-[#E3F2FD] rounded-full flex items-center justify-center flex-shrink-0">
        <i class="fas fa-headset text-[#00BCD4] text-sm"></i>
      </div>
      <div class="ml-2 bg-[#E3F2FD] p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Update conversation history
      conversationHistory.push({ role: "user", parts: message });

      // API endpoint for Gemini 1.5 Flash
      const endpoint =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

      // Create system message based on selected language
      let systemPrompt = "";

      switch (currentLanguage) {
        case "id":
          systemPrompt =
            "Kamu adalah asisten chatbot untuk aplikasi ride-sharing bernama NG-OJOL. Berikan jawaban yang sopan, informatif, dan ringkas dalam Bahasa Indonesia. Fokus pada layanan transportasi, pengiriman, dan makanan yang ditawarkan NG-OJOL.";
          break;
        case "en":
          systemPrompt =
            "You are a chatbot assistant for a ride-sharing app called NG-OJOL. Provide polite, informative, and concise answers in English. Focus on transportation, delivery, and food services offered by NG-OJOL.";
          break;
        default:
          systemPrompt =
            "You are a chatbot assistant for a ride-sharing app called NG-OJOL. Provide polite, informative, and concise answers. Focus on transportation, delivery, and food services offered by NG-OJOL.";
      }

      // Request body for Gemini API
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Saya memahami. Saya akan memberikan respons yang sopan, informatif, dan ringkas tentang layanan NG-OJOL.",
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      };

      // Add conversation history to request body
      conversationHistory.forEach((item) => {
        requestBody.contents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.parts }],
        });
      });

      // Make API request
      const response = await fetch(`${endpoint}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      let aiResponse = "Maaf, saya tidak dapat memberikan respons saat ini.";

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }

      // Add AI response to conversation history
      conversationHistory.push({ role: "assistant", parts: aiResponse });

      // Remove typing indicator
      chatMessages.removeChild(typingIndicator);

      // Add bot message with AI response
      addBotMessage(aiResponse);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Remove typing indicator
      if (chatMessages.contains(typingIndicator)) {
        chatMessages.removeChild(typingIndicator);
      }

      // Use fallback response if API fails
      const fallbackResponses = {
        id: {
          halo: "Halo! Selamat datang di layanan NG-OJOL. Ada yang bisa saya bantu?",
          "cara pesan":
            "Untuk memesan layanan NG-OJOL, Anda cukup buka aplikasi kami, pilih layanan yang diinginkan (Motor, Mobil, Express, atau Truk), tentukan lokasi penjemputan dan tujuan, lalu klik 'Pesan'. Driver terdekat akan segera menghubungi Anda.",
          harga:
            "Tarif NG-OJOL dimulai dari Rp5.000 untuk layanan Motor, Rp10.000 untuk Mobil, Rp7.000 untuk Express, dan Rp25.000 untuk Truk, ditambah biaya per kilometer. Untuk mengetahui estimasi biaya, Anda bisa menggunakan kalkulator di aplikasi kami.",
          lokasi:
            "Saat ini NG-OJOL tersedia di 25+ kota besar di Indonesia. Silakan buka aplikasi untuk melihat jangkauan area di kota Anda.",
          driver:
            "Untuk menjadi driver NG-OJOL, Anda bisa mendaftar melalui halaman 'Daftar Driver' di website kami atau langsung di aplikasi. Persyaratannya meliputi KTP, SIM yang sesuai, STNK, dan dokumen pendukung lainnya.",
        },
        en: {
          hello: "Hello! Welcome to NG-OJOL service. How can I help you?",
          order:
            "To order NG-OJOL services, simply open our app, select the desired service (Motorcycle, Car, Express, or Truck), specify pickup and destination locations, then click 'Order'. The nearest driver will contact you soon.",
          price:
            "NG-OJOL rates start from Rp5,000 for Motorcycle service, Rp10,000 for Car, Rp7,000 for Express, and Rp25,000 for Truck, plus per kilometer charges. To know the cost estimate, you can use the calculator in our app.",
          location:
            "NG-OJOL is currently available in 25+ major cities in Indonesia. Please open the app to see coverage in your city.",
          driver:
            "To become an NG-OJOL driver, you can register through the 'Register Driver' page on our website or directly in the app. Requirements include ID card, appropriate driver's license, vehicle registration, and other supporting documents.",
        },
      };

      // Try to find fallback response based on keywords in message
      const userLang = currentLanguage === "id" ? "id" : "en";
      let fallbackResponse = null;

      const userMsg = message.toLowerCase();
      const responses = fallbackResponses[userLang];

      for (const [keyword, response] of Object.entries(responses)) {
        if (userMsg.includes(keyword)) {
          fallbackResponse = response;
          break;
        }
      }

      // If no matching response, use default error message
      if (!fallbackResponse) {
        const errorMessages = {
          id: "Maaf, saya tidak dapat terhubung ke server saat ini. Silakan coba lagi nanti atau hubungi layanan pelanggan kami di support@ngojol.id.",
          en: "Sorry, I cannot connect to the server at the moment. Please try again later or contact our customer service at support@ngojol.id.",
        };

        fallbackResponse = errorMessages[currentLanguage] || errorMessages.en;
      }

      // Add fallback response to conversation history
      conversationHistory.push({ role: "assistant", parts: fallbackResponse });

      // Show fallback response
      addBotMessage(fallbackResponse);
    }
  }

  // Initialize welcome message on page load
  updateWelcomeMessage();
});

// Initialize AOS with better configuration
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    anchorPlacement: "top-bottom",
    disable: "mobile",
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("bg-primary-600", "bg-opacity-95", "shadow-lg");
  } else {
    nav.classList.remove("bg-primary-600", "bg-opacity-95", "shadow-lg");
  }
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    // Skip if href is just "#" (empty anchor)
    if (targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      // Get navbar height for offset
      const navbarHeight = document.querySelector("nav").offsetHeight;

      // Calculate position with offset
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        (navbarHeight + 20);

      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Dark Mode Toggle with improved animation and local storage
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeIcon = document.getElementById("darkModeIcon");
  const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
  const darkModeIconMobile = document.getElementById("darkModeIconMobile");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");

  // Apply transitions to all elements for smoother mode changes
  document.documentElement.style.transition = "background-color 0.5s ease";
  document.body.style.transition =
    "background-color 0.5s ease, color 0.5s ease";

  // Only apply dark mode if explicitly saved as dark
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    updateDarkModeIcons(true);
    updateNavbarForDarkMode(true);
  } else {
    // Ensure light mode is default
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateDarkModeIcons(false);
    updateNavbarForDarkMode(false);
  }

  // Function to update all dark mode icons
  function updateDarkModeIcons(isDark) {
    if (isDark) {
      if (darkModeIcon) {
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");
      }
      if (darkModeIconMobile) {
        darkModeIconMobile.classList.remove("fa-moon");
        darkModeIconMobile.classList.add("fa-sun");
      }
    } else {
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

  // Function to update navbar for dark mode
  function updateNavbarForDarkMode(isDark) {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (isDark) {
      navbar.style.backgroundColor = "rgba(10, 25, 41, 0.95)";
      navbar.classList.add("dark-navbar");
    } else {
      // Check current scroll position to determine appropriate navbar style
      const scrollPosition = window.scrollY;
      if (scrollPosition < 50) {
        setNavbarTransparent();
      } else if (
        scrollPosition < document.getElementById("beranda")?.offsetHeight ||
        0
      ) {
        setNavbarSemiTransparent();
      } else {
        setNavbarSolid();
      }
      navbar.classList.remove("dark-navbar");
    }
  }

  // Function to toggle dark mode with enhanced transitions
  function toggleDarkMode() {
    // Add animation class to icons
    if (darkModeIcon) darkModeIcon.classList.add("animate-rotate");
    if (darkModeIconMobile) darkModeIconMobile.classList.add("animate-rotate");

    // Toggle dark mode class
    const wasDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark");

    // Update meta theme-color for browser UI
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", !wasDark ? "#0a1929" : "#00bcd4");
    }

    // Update icons and save preference
    const isDark = document.documentElement.classList.contains("dark");
    updateDarkModeIcons(isDark);
    updateNavbarForDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Remove animation class after animation completes
    setTimeout(function () {
      if (darkModeIcon) darkModeIcon.classList.remove("animate-rotate");
      if (darkModeIconMobile)
        darkModeIconMobile.classList.remove("animate-rotate");
    }, 500);
  }

  // Toggle dark mode on click
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }

  // Sync mobile dark mode toggle
  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener("click", toggleDarkMode);
  }
});

// Language Selector
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("languageToggle");
  const languageDropdown = document.getElementById("languageDropdown");
  const languageOptions = document.querySelectorAll(".language-option");

  // Toggle language dropdown
  languageToggle.addEventListener("click", function () {
    languageDropdown.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !languageToggle.contains(e.target) &&
      !languageDropdown.contains(e.target)
    ) {
      languageDropdown.classList.add("hidden");
    }
  });

  // Handle language selection
  languageOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");

      // Show "feature not available" notification instead of changing language
      const notification = document.createElement("div");
      notification.className =
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center";
      notification.innerHTML = `
              <i class="fas fa-exclamation-triangle mr-2"></i>
              <span>Fitur multi-bahasa belum tersedia. Menunggu implementasi back-end.</span>
            `;
      document.body.appendChild(notification);

      // Close language dropdown
      languageDropdown.classList.add("hidden");

      // Remove notification after a delay
      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translate(-50%, 20px)";
        notification.style.transition = "opacity 0.5s, transform 0.5s";

        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    });
  });
});

// Smooth Scrolling Enhancement
document.addEventListener("DOMContentLoaded", function () {
  // Apply initial state to all sections
  const sections = document.querySelectorAll(".section-transition");

  // Improved intersection observer for smooth section transitions
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Add animation classes when section is in viewport
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.classList.add("visible");
        } else {
          // Only reset animation for sections far from viewport
          if (Math.abs(entry.boundingClientRect.top) > window.innerHeight) {
            entry.target.style.opacity = "0.8";
            entry.target.style.transform = "translateY(20px)";
            entry.target.classList.remove("visible");
          }
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "-50px",
    }
  );

  sections.forEach((section) => {
    // Set initial state with hardware acceleration
    section.style.opacity = "0.8";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
    section.style.willChange = "opacity, transform";
    sectionObserver.observe(section);
  });

  // Optimize AOS initialization
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true, // Only animate once to improve performance
      mirror: false,
      disable: window.innerWidth < 768 ? true : false, // Disable on mobile for better performance
      throttleDelay: 99, // Increase throttle delay for better performance
      startEvent: "DOMContentLoaded", // Start earlier
    });
  }

  // Enhanced smooth scrolling with better offset calculation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      // Skip if href is just "#" (empty anchor)
      if (targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        const mobileMenu = document.querySelector(".mobile-menu");
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }

        // Get navbar height for offset
        const navbarHeight = document.querySelector("nav").offsetHeight;

        // Calculate position with offset
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        // Smooth scroll with better performance
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL hash without scrolling
        history.pushState(null, null, targetId);

        // Update active state in navbar
        updateActiveNavItem(targetId.substring(1));
      }
    });
  });

  // Function to update active nav item
  function updateActiveNavItem(sectionId) {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href === `#${sectionId}`) {
        link.classList.add("active-nav-link");
        // Add styles to active nav link
        link.style.fontWeight = "600";
        link.style.opacity = "1";
      } else {
        link.classList.remove("active-nav-link");
        // Reset styles
        link.style.fontWeight = "400";
        link.style.opacity = "0.9";
      }
    });
  }

  // Update active section on scroll
  const handleScroll = throttle(() => {
    let currentSection = "";
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // Find the current section based on scroll position
    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <= sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    // Update active nav item
    if (currentSection) {
      updateActiveNavItem(currentSection);
    }
  }, 100);

  window.addEventListener("scroll", handleScroll);

  // Initial call to set correct active section
  setTimeout(handleScroll, 100);
});

// Custom Scripts
document.addEventListener("DOMContentLoaded", function () {
  // ... existing code ...

  // Live Driver Tracking Map Initialization
  if (document.getElementById("liveMap")) {
    // Initialize the map
    const map = L.map("liveMap").setView([-6.2088, 106.8456], 15); // Jakarta coordinates

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom marker icon for driver
    const driverIcon = L.icon({
      iconUrl: "img/delivery.png", // Use your driver icon
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
      className: "driver-icon",
    });

    // Custom marker icon for destination
    const destinationIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1180/1180058.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });

    // Add destination marker
    const destinationMarker = L.marker([-6.2088, 106.8456], {
      icon: destinationIcon,
    })
      .addTo(map)
      .bindPopup("Lokasi Tujuan");

    // Driver's initial position
    let driverPosition = [-6.2188, 106.8356]; // Slightly offset from destination

    // Add driver marker
    const driverMarker = L.marker(driverPosition, { icon: driverIcon })
      .addTo(map)
      .bindPopup("Driver Anda");

    // Add a polyline to show the route
    const routePoints = [
      driverPosition,
      [-6.2158, 106.8386],
      [-6.2138, 106.8416],
      [-6.2118, 106.8436],
      [-6.2088, 106.8456], // Destination
    ];

    const routeLine = L.polyline(routePoints, {
      color: "#00bcd4",
      weight: 5,
      opacity: 0.7,
      dashArray: "10, 10",
      lineJoin: "round",
    }).addTo(map);

    // Animation function to move the driver along the route
    let currentPointIndex = 0;

    function animateDriver() {
      if (currentPointIndex < routePoints.length - 1) {
        currentPointIndex++;

        // Update driver position
        driverMarker.setLatLng(routePoints[currentPointIndex]);

        // Update ETA based on remaining points
        const remainingPoints = routePoints.length - 1 - currentPointIndex;
        const eta = remainingPoints * 1; // 1 minute per point
        document.querySelector(".bg-primary-50 .text-lg").textContent =
          eta === 0 ? "Telah tiba" : `${eta} menit`;

        // Update status text
        if (eta === 0) {
          document.querySelector(".text-xs.text-gray-500.ml-2").textContent =
            "Telah tiba di lokasi Anda";
        } else {
          document.querySelector(".text-xs.text-gray-500.ml-2").textContent =
            "Sedang menuju ke lokasi Anda";
        }
      }
    }

    // Simulate driver movement every 3 seconds
    const driverInterval = setInterval(animateDriver, 3000);

    // Clean up interval when leaving the page
    window.addEventListener("beforeunload", function () {
      clearInterval(driverInterval);
    });
  }

  // Mobile Navigation Accordion
  const accordionButtons = document.querySelectorAll(".accordion-btn");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle the active class on the button
      this.classList.toggle("active");

      // Toggle the rotation of the chevron icon
      const icon = this.querySelector(".fa-chevron-down");
      if (icon.style.transform === "rotate(180deg)") {
        icon.style.transform = "rotate(0)";
      } else {
        icon.style.transform = "rotate(180deg)";
      }

      // Toggle the content visibility
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.add("hidden");
      } else {
        content.classList.remove("hidden");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Reset all accordions when menu is closed
      if (mobileMenu.classList.contains("hidden")) {
        accordionButtons.forEach((button) => {
          const icon = button.querySelector(".fa-chevron-down");
          if (icon.style.transform === "rotate(180deg)") {
            icon.style.transform = "rotate(0)";
          }

          const content = button.nextElementSibling;
          content.style.maxHeight = null;
          content.classList.add("hidden");
        });
      }
    });
  }
});
