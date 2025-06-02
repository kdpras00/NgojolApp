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

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

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

  // Sync mobile and desktop dark mode toggles
  const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
  const darkModeIconMobile = document.getElementById("darkModeIconMobile");

  darkModeToggleMobile.addEventListener("click", function () {
    darkModeIconMobile.classList.add("animate-rotate");

    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      darkModeIconMobile.classList.remove("fa-moon");
      darkModeIconMobile.classList.add("fa-sun");

      // Sync desktop icon
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");

      localStorage.setItem("theme", "dark");
    } else {
      darkModeIconMobile.classList.remove("fa-sun");
      darkModeIconMobile.classList.add("fa-moon");

      // Sync desktop icon
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");

      localStorage.setItem("theme", "light");
    }

    setTimeout(function () {
      darkModeIconMobile.classList.remove("animate-rotate");
    }, 500);
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
    navbar.style.backgroundColor = "transparent";
    navbar.classList.remove("shadow-md");
  } else if (scrollPosition < berandaHeight) {
    navbar.style.backgroundColor = "rgba(0, 188, 212, 0.9)";
    navbar.classList.add("shadow-md");
  } else {
    navbar.style.backgroundColor = "#06b6d4";
    navbar.classList.add("shadow-md");
  }

  // Text color adjustments
  if (scrollPosition < berandaHeight) {
    if (!navbarTitle.classList.contains("text-white")) {
      navbarTitle.classList.remove("text-black");
      navbarTitle.classList.add("text-white");
      navbarLinks.forEach((link) => {
        link.style.color = "white";
        link.classList.remove("hover:text-blue-600");
        link.classList.add("hover:text-white");
      });
    }
  } else {
    if (!navbarTitle.classList.contains("text-black")) {
      navbarTitle.classList.remove("text-white");
      navbarTitle.classList.add("text-black");
      navbarLinks.forEach((link) => {
        link.style.color = "black";
        link.classList.remove("hover:text-white");
        link.classList.add("hover:#EEEEEE");
      });
    }
  }

  // Back to top button visibility
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
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
}, 100); // Throttle to run at most every 100ms

// Add the optimized scroll event listener
window.addEventListener("scroll", handleScroll);

const navbar = document.getElementById("navbar");
const navbarTitle = document.getElementById("navbar-title");
const navbarLinks = document.querySelectorAll(".navbar-link");
const beranda = document.getElementById("beranda");

let isTransparent = true; // Menyimpan status transparansi navbar

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

// Fungsi untuk membuat navbar transparan
function setNavbarTransparent() {
  if (!isTransparent) {
    navbar.classList.remove("bg-white", "shadow-md");
    navbar.classList.add("bg-transparent");
    navbarTitle.classList.remove("text-black");
    navbarTitle.classList.add("text-white");
    navbarLinks.forEach((link) => {
      link.classList.remove("text-black");
      link.classList.add("text-white");
    });
    isTransparent = true; // Set status transparansi menjadi true
  }
}

// Fungsi untuk membuat navbar solid (putih dengan teks hitam)
function setNavbarSolid() {
  if (isTransparent) {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-white", "shadow-md");
    navbarTitle.classList.remove("text-white");
    navbarTitle.classList.add("text-black");
    navbarLinks.forEach((link) => {
      link.classList.remove("text-white");
      link.classList.add("text-black");
    });
    isTransparent = false; // Set status transparansi menjadi false
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

  calculateBtn.addEventListener("click", function () {
    // Get input values
    const serviceType = document.getElementById("service-type").value;
    const distance = parseFloat(document.getElementById("distance").value) || 0;
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

    if ((serviceType === "express" || serviceType === "truck") && weight > 0) {
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
    document.getElementById("base-fee").textContent = formatter.format(baseFee);
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
});

// Cookie Consent
document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookieConsent");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieReject = document.getElementById("cookieReject");

  // Check if user has already made a choice
  if (!localStorage.getItem("cookieChoice")) {
    // Show banner after a short delay with animation
    setTimeout(() => {
      cookieConsent.style.transform = "translateY(0)";
      cookieConsent.style.opacity = "1";
      cookieConsent.style.transition =
        "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
    }, 1000);
  }

  // Function to hide cookie banner with animation
  function hideCookieBanner() {
    cookieConsent.style.transform = "translateY(100%)";
    cookieConsent.style.opacity = "0";

    // Optional: remove from DOM after animation completes
    setTimeout(() => {
      cookieConsent.style.display = "none";
    }, 500);
  }

  cookieAccept.addEventListener("click", function () {
    localStorage.setItem("cookieChoice", "accepted");
    hideCookieBanner();
  });

  cookieReject.addEventListener("click", function () {
    localStorage.setItem("cookieChoice", "rejected");
    hideCookieBanner();
  });
});

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");
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

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Hanya register service worker jika protokolnya didukung (http atau https)
    if (
      window.location.protocol === "http:" ||
      window.location.protocol === "https:"
    ) {
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
    } else {
      console.warn(
        "Service Worker tidak dapat didaftarkan: Protokol tidak didukung. Gunakan http:// atau https:// untuk fitur PWA."
      );
    }
  });
}

// Live Chat Functionality with Gemini AI
document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatLanguageButton = document.getElementById("chatLanguageButton");
  const chatLanguageMenu = document.getElementById("chatLanguageMenu");
  const languageOptions = document.querySelectorAll(".language-option");

  // Gemini API Key
  const API_KEY = "AIzaSyC-if6ei1E11uPPPs2JOAmfquSXCHPMtCo";

  // Default language
  let currentLanguage = "id"; // Default to Indonesian

  // Toggle language menu
  chatLanguageButton.addEventListener("click", function () {
    chatLanguageMenu.classList.toggle("hidden");
  });

  // Handle language selection
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

  // Close language menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !chatLanguageButton.contains(e.target) &&
      !chatLanguageMenu.contains(e.target)
    ) {
      chatLanguageMenu.classList.add("hidden");
    }
  });

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

  // AI chat history
  let conversationHistory = [];

  // Update welcome message based on selected language
  function updateWelcomeMessage() {
    // Clear existing messages
    chatMessages.innerHTML = "";

    // Add welcome message in selected language
    addBotMessage(welcomeMessages[currentLanguage] || welcomeMessages.en);
  }

  // Toggle chat window visibility
  chatToggle.addEventListener("click", function () {
    if (chatWindow.classList.contains("scale-0")) {
      chatWindow.classList.remove("scale-0");
      chatWindow.classList.add("scale-100");

      // Only reset messages if the window was previously closed
      if (chatMessages.querySelectorAll(".flex").length === 0) {
        updateWelcomeMessage();
      }
    } else {
      chatWindow.classList.remove("scale-100");
      chatWindow.classList.add("scale-0");
    }
  });

  // Close chat window
  chatClose.addEventListener("click", function () {
    chatWindow.classList.remove("scale-100");
    chatWindow.classList.add("scale-0");
  });

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

  // Add a user message to the chat
  function addUserMessage(message) {
    const messageTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageHTML = `
      <div class="flex mb-4 justify-end">
        <div class="mr-2 bg-[#00BCD4] p-3 rounded-lg rounded-tr-none shadow-sm text-white max-w-[85%]">
          <p class="text-sm">${message}</p>
          <span class="text-xs text-[#B2EBF2] mt-1 block">${messageTime}</span>
        </div>
        <div class="w-8 h-8 bg-[#00ACC1] rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas fa-user text-white text-sm"></i>
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

      // API endpoint untuk Gemini 2.0 Flash
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
        case "zh":
          systemPrompt =
            "您是一个名为 NG-OJOL 的共享出行应用的聊天机器人助手。用中文提供礼貌、信息丰富且简洁的回答。专注于 NG-OJOL 提供的交通、配送和食品服务。";
          break;
        case "ar":
          systemPrompt =
            "أنت مساعد روبوت دردشة لتطبيق مشاركة الركوب يسمى NG-OJOL. قدم إجابات مهذبة ومفيدة وموجزة باللغة العربية. ركز على خدمات النقل والتوصيل والطعام التي يقدمها NG-OJOL.";
          break;
        case "es":
          systemPrompt =
            "Eres un asistente chatbot para una aplicación de transporte compartido llamada NG-OJOL. Proporciona respuestas educadas, informativas y concisas en español. Concéntrate en los servicios de transporte, entrega y alimentación que ofrece NG-OJOL.";
          break;
        case "fr":
          systemPrompt =
            "Vous êtes un assistant chatbot pour une application de covoiturage appelée NG-OJOL. Fournissez des réponses polies, informatives et concises en français. Concentrez-vous sur les services de transport, de livraison et de restauration proposés par NG-OJOL.";
          break;
        case "de":
          systemPrompt =
            "Sie sind ein Chatbot-Assistent für eine Mitfahr-App namens NG-OJOL. Geben Sie höfliche, informative und präzise Antworten auf Deutsch. Konzentrieren Sie sich auf Transport-, Liefer- und Lebensmitteldienstleistungen, die von NG-OJOL angeboten werden.";
          break;
        case "ja":
          systemPrompt =
            "あなたはNG-OJOLという配車アプリのチャットボットアシスタントです。日本語で丁寧で有益かつ簡潔な回答を提供してください。NG-OJOLが提供する交通、配達、食品サービスに焦点を当ててください。";
          break;
        case "ko":
          systemPrompt =
            "당신은 NG-OJOL이라는 라이드 쉐어링 앱을 위한 챗봇 어시스턴트입니다. 한국어로 정중하고 유익하며 간결한 답변을 제공하세요. NG-OJOL이 제공하는 교통, 배달 및 음식 서비스에 중점을 두세요.";
          break;
        case "ru":
          systemPrompt =
            "Вы чат-бот-помощник для приложения совместных поездок под названием NG-OJOL. Предоставляйте вежливые, информативные и краткие ответы на русском языке. Сосредоточьтесь на услугах транспорта, доставки и питания, предлагаемых NG-OJOL.";
          break;
        default:
          systemPrompt =
            "You are a chatbot assistant for a ride-sharing app called NG-OJOL. Provide polite, informative, and concise answers. Focus on transportation, delivery, and food services offered by NG-OJOL.";
      }

      // Request body - mengikuti format Gemini 2.0 Flash yang benar
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

      // Tambahkan percakapan sebelumnya ke request body
      conversationHistory.forEach((item) => {
        requestBody.contents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.parts }],
        });
      });

      console.log(
        "Sending request to Gemini API:",
        JSON.stringify(requestBody)
      );

      // Make API request
      const response = await fetch(`${endpoint}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

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
      chatMessages.removeChild(typingIndicator);

      // Coba menggunakan respons lokal jika API gagal
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

      // Coba cari respons fallback berdasarkan kata kunci dalam pesan
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

      // Jika tidak ada respons yang cocok, gunakan pesan error default
      if (!fallbackResponse) {
        const errorMessages = {
          id: "Maaf, saya tidak dapat terhubung ke server saat ini. Silakan coba lagi nanti atau hubungi layanan pelanggan kami di support@ngojol.id.",
          en: "Sorry, I cannot connect to the server at the moment. Please try again later or contact our customer service at support@ngojol.id.",
          zh: "抱歉，我目前无法连接到服务器。请稍后再试或联系我们的客户服务：support@ngojol.id。",
          ar: "عذرا، لا يمكنني الاتصال بالخادم في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بخدمة العملاء لدينا على support@ngojol.id.",
          es: "Lo siento, no puedo conectarme al servidor en este momento. Inténtelo de nuevo más tarde o póngase en contacto con nuestro servicio de atención al cliente en support@ngojol.id.",
          fr: "Désolé, je ne peux pas me connecter au serveur pour le moment. Veuillez réessayer plus tard ou contacter notre service client à support@ngojol.id.",
          de: "Entschuldigung, ich kann im Moment keine Verbindung zum Server herstellen. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie unseren Kundendienst unter support@ngojol.id.",
          ja: "申し訳ありませんが、現在サーバーに接続できません。後でもう一度お試しいただくか、support@ngojol.idのカスタマーサービスにお問い合わせください。",
          ko: "죄송합니다. 현재 서버에 연결할 수 없습니다. 나중에 다시 시도하거나 support@ngojol.id의 고객 서비스에 문의하십시오.",
          ru: "Извините, я не могу подключиться к серверу в данный момент. Пожалуйста, повторите попытку позже или свяжитесь с нашей службой поддержки клиентов по адресу support@ngojol.id.",
        };

        fallbackResponse = errorMessages[currentLanguage] || errorMessages.en;
      }

      // Tambahkan fallback response ke conversation history
      conversationHistory.push({ role: "assistant", parts: fallbackResponse });

      // Tampilkan respons fallback
      addBotMessage(fallbackResponse);
    }
  }

  // Handle chat form submission
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();

    if (message) {
      addUserMessage(message);
      chatInput.value = "";

      // Get AI response
      getAIResponse(message);
    }
  });

  // Add initial welcome message on page load
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

  // Check for saved theme preference or respect OS preference
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme = localStorage.getItem("theme");

  // Apply dark mode if saved or OS preference
  if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
    document.documentElement.classList.add("dark");
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
  }

  // Toggle dark mode on click with improved animation
  darkModeToggle.addEventListener("click", function () {
    // Add animation class
    darkModeIcon.classList.add("animate-rotate");

    // Toggle dark mode class with transition
    document.documentElement.classList.toggle("dark");
    document.body.style.transition =
      "background-color 0.5s ease, color 0.5s ease";

    // Update icon
    if (document.documentElement.classList.contains("dark")) {
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }

    // Remove animation class after animation completes
    setTimeout(function () {
      darkModeIcon.classList.remove("animate-rotate");
    }, 500);
  });
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

// Push Notifications
document.addEventListener("DOMContentLoaded", function () {
  const notificationPrompt = document.getElementById("notificationPrompt");
  const allowNotifications = document.getElementById("allowNotifications");
  const denyNotifications = document.getElementById("denyNotifications");
  const closeNotificationPrompt = document.getElementById(
    "closeNotificationPrompt"
  );

  // Check if notification prompt element exists before proceeding
  if (!notificationPrompt) {
    return;
  }

  // Initialize notification prompt with the correct starting state
  notificationPrompt.classList.add("translate-x-full");

  // Function to permanently hide notification prompt
  function hideNotificationPermanently() {
    // Close the notification with animation
    closeNotificationWithAnimation();

    // Set a flag in localStorage with current timestamp
    localStorage.setItem("notificationsPromptDismissed", Date.now());
  }

  // Function to close notification with animation
  function closeNotificationWithAnimation() {
    notificationPrompt.classList.remove("slide-in-right");
    notificationPrompt.classList.add("slide-out-right");

    // Reset position after animation completes
    setTimeout(() => {
      notificationPrompt.classList.add("translate-x-full");
      notificationPrompt.classList.remove("slide-out-right");
    }, 500);
  }

  // Check if user has already dismissed the notification prompt or enabled notifications
  const notificationDismissed = localStorage.getItem(
    "notificationsPromptDismissed"
  );
  const notificationsEnabled = localStorage.getItem("notificationsEnabled");

  // Only show notification prompt if:
  // 1. It hasn't been dismissed recently (within 30 days)
  // 2. Notifications aren't already enabled
  // 3. The browser supports notifications
  const showNotificationPrompt = () => {
    // If notifications are already enabled, don't show prompt
    if (notificationsEnabled === "true") {
      return false;
    }

    // If prompt was dismissed before, check if enough time has passed (30 days)
    if (notificationDismissed) {
      const dismissedTime = parseInt(notificationDismissed);
      const currentTime = Date.now();
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

      // Don't show if dismissed less than 30 days ago
      if (currentTime - dismissedTime < thirtyDaysInMs) {
        return false;
      }
    }

    // Check browser notification permission
    if ("Notification" in window) {
      // If permission is already granted or denied, don't show prompt
      if (
        Notification.permission === "granted" ||
        Notification.permission === "denied"
      ) {
        return false;
      }

      return true;
    }

    return false;
  };

  // Show notification prompt if conditions are met
  if (showNotificationPrompt()) {
    // Show notification prompt after a delay with animation
    setTimeout(() => {
      notificationPrompt.classList.remove("translate-x-full");
      notificationPrompt.classList.add("slide-in-right");
    }, 3000);
  }

  // Handle allow notifications
  allowNotifications.addEventListener("click", function () {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
      hideNotificationPermanently();
      return;
    }

    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          try {
            // Send welcome notification
            const notification = new Notification("Selamat Datang di NG-OJOL", {
              body: "Terima kasih telah mengaktifkan notifikasi. Anda akan mendapatkan update terbaru dari kami.",
              icon: "img/delivery.png",
            });
          } catch (error) {
            console.error("Error creating notification:", error);
          }

          // Save to localStorage that notifications are enabled
          localStorage.setItem("notificationsEnabled", "true");
        }

        // Always hide the prompt permanently after user makes a choice
        hideNotificationPermanently();
      })
      .catch((error) => {
        console.error("Error requesting notification permission:", error);
        hideNotificationPermanently();
      });
  });

  // Handle deny notifications
  denyNotifications.addEventListener("click", hideNotificationPermanently);

  // Handle close button
  closeNotificationPrompt.addEventListener(
    "click",
    hideNotificationPermanently
  );
});

// Smooth Scrolling Enhancement
document.addEventListener("DOMContentLoaded", function () {
  // Apply initial state to all sections
  const sections = document.querySelectorAll(".section-transition");

  // Create intersection observer for smooth section transitions
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Add animation classes when section is in viewport
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        } else {
          // Only reset animation for sections far from viewport
          if (Math.abs(entry.boundingClientRect.top) > window.innerHeight * 2) {
            entry.target.style.opacity = "0.8";
            entry.target.style.transform = "translateY(20px)";
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
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true, // Only animate once
    mirror: false,
    anchorPlacement: "top-bottom",
    disable: "mobile",
    throttleDelay: 99, // Increase throttle delay
  });

  // Remove redundant navbar scroll effect
  // window.addEventListener("scroll", function () {
  //   const nav = document.querySelector("nav");
  //   if (window.scrollY > 50) {
  //     nav.classList.add("bg-primary-600", "bg-opacity-95", "shadow-lg");
  //   } else {
  //     nav.classList.remove("bg-primary-600", "bg-opacity-95", "shadow-lg");
  //   }
  // });

  // Optimize smooth scrolling
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
});

// Initialize AOS with better configuration

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
