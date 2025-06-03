    /**
 * NgojolApp Modern Interface
 * Handles functionality for modern UI components:
 * - Sidebar Mini
 * - FAB (Floating Action Button)
 * - Tab Navigation
 * - Accordion UI
 */

document.addEventListener('DOMContentLoaded', function() {
    // FAB Functionality
    initFloatingActionButton();
    
    // Tab Navigation
    initTabNavigation();
    
    // Accordion
    initAccordion();
    
    // Mobile Menu
    initMobileMenu();
    
    // Mini Weather Widget
    initMiniWeatherWidget();
});

/**
 * Initialize Floating Action Button
 */
function initFloatingActionButton() {
    const fabMain = document.getElementById('fab-main');
    const fabOptions = document.getElementById('fab-options');
    
    if (!fabMain || !fabOptions) return;
    
    fabMain.addEventListener('click', function() {
        fabOptions.classList.toggle('active');
        fabMain.classList.toggle('active');
        
        if (fabMain.classList.contains('active')) {
            fabMain.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            fabMain.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
    
    // Close FAB when clicking elsewhere
    document.addEventListener('click', function(event) {
        const isClickInsideFab = fabMain.contains(event.target) || 
                                fabOptions.contains(event.target);
        
        if (!isClickInsideFab && fabOptions.classList.contains('active')) {
            fabOptions.classList.remove('active');
            fabMain.classList.remove('active');
            fabMain.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
    
    // Setup FAB buttons if they exist
    setupFabButton('quickBookBtnFab', function() {
        const quickBookModal = document.getElementById('quickBookModal');
        if (quickBookModal) {
            quickBookModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
    
    setupFabButton('demoNotifBtnFab', function() {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Demo Notifikasi',
                html: `
                    <div class="grid grid-cols-1 gap-3">
                        <button id="demoDriverFound" class="w-full bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium py-2 px-4 rounded-lg transition-colors">
                            <i class="fas fa-motorcycle mr-2"></i>Driver Ditemukan
                        </button>
                        <button id="demoTracking" class="w-full bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium py-2 px-4 rounded-lg transition-colors">
                            <i class="fas fa-map-marked-alt mr-2"></i>Tracking Driver
                        </button>
                        <button id="demoRating" class="w-full bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium py-2 px-4 rounded-lg transition-colors">
                            <i class="fas fa-star mr-2"></i>Rating Perjalanan
                        </button>
                        <button id="demoPromo" class="w-full bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium py-2 px-4 rounded-lg transition-colors">
                            <i class="fas fa-gift mr-2"></i>Promo Spesial
                        </button>
                    </div>
                `,
                showConfirmButton: false,
                showCloseButton: true,
                didOpen: () => {
                    // Add event listeners to demo buttons
                    setupDemoButton('demoDriverFound', 'showDriverFound');
                    setupDemoButton('demoTracking', 'showDriverTracking');
                    setupDemoButton('demoRating', 'showRatingForm');
                    setupDemoButton('demoPromo', 'showPromoNotification');
                }
            });
        }
    });
    
    setupFabButton('virtualTourBtnFab', function() {
        const virtualTourModal = document.getElementById('virtualTourModal');
        if (virtualTourModal) {
            virtualTourModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
}

/**
 * Setup individual FAB buttons
 */
function setupFabButton(id, callback) {
    const button = document.getElementById(id);
    const fabOptions = document.getElementById('fab-options');
    const fabMain = document.getElementById('fab-main');
    
    if (!button) return;
    
    button.addEventListener('click', function() {
        // Execute callback
        if (typeof callback === 'function') {
            callback();
        }
        
        // Close FAB menu
        if (fabOptions && fabMain) {
            fabOptions.classList.remove('active');
            fabMain.classList.remove('active');
            fabMain.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
}

/**
 * Setup demo notification buttons
 */
function setupDemoButton(id, functionName) {
    const button = document.getElementById(id);
    if (!button) return;
    
    button.addEventListener('click', () => {
        Swal.close();
        if (typeof window[functionName] === 'function') {
            window[functionName]();
        }
    });
}

/**
 * Initialize Tab Navigation
 */
function initTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (!tabBtns.length || !tabContents.length) return;
    
    function setActiveTab(tab) {
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
        if (!activeBtn) return;
        
        // Update tab buttons
        tabBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        // Update tab content
        tabContents.forEach(content => content.classList.remove('active'));
        const activeContent = document.getElementById(tab);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        // Move indicator if it exists
        if (tabIndicator) {
            const btnRect = activeBtn.getBoundingClientRect();
            const navRect = document.querySelector('.tab-nav').getBoundingClientRect();
            
            tabIndicator.style.width = `${btnRect.width}px`;
            tabIndicator.style.left = `${btnRect.left - navRect.left}px`;
        }
    }
    
    // Initialize tab indicator
    setTimeout(() => {
        const defaultTab = document.querySelector('.tab-btn.active');
        if (defaultTab) {
            const tab = defaultTab.getAttribute('data-tab');
            setActiveTab(tab);
        } else if (tabBtns.length > 0) {
            const firstTab = tabBtns[0].getAttribute('data-tab');
            setActiveTab(firstTab);
        }
    }, 100);
    
    // Tab click events
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            setActiveTab(tab);
            
            // Update URL hash without scrolling
            const scrollPos = window.scrollY;
            window.location.hash = tab;
            window.scrollTo(0, scrollPos);
        });
    });
    
    // Handle URL hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (document.getElementById(hash) && document.querySelector(`.tab-btn[data-tab="${hash}"]`)) {
            setActiveTab(hash);
        }
    });
    
    // Check initial hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (document.getElementById(hash) && document.querySelector(`.tab-btn[data-tab="${hash}"]`)) {
            setTimeout(() => {
                setActiveTab(hash);
            }, 200);
        }
    }
}

/**
 * Initialize Accordion functionality
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i.fas');
            
            // Toggle current item
            header.classList.toggle('active');
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = '0';
                if (icon) icon.style.transform = 'rotate(0)';
            }
        });
    });
}

/**
 * Initialize Mobile Menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('drawerOverlay');
    
    if (!mobileMenuToggle || !sidebar || !overlay) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
        } else {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close sidebar when clicking on a nav link (mobile only)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
}

/**
 * Initialize Mini Weather Widget
 */
function initMiniWeatherWidget() {
    function updateMiniWeather() {
        const weatherTemp = document.getElementById('weather-temp');
        const weatherIcon = document.getElementById('weather-icon');
        const weatherTempMini = document.getElementById('weather-temp-mini');
        const weatherIconMini = document.getElementById('weather-icon-mini');
        
        if (weatherTemp && weatherIcon && weatherTempMini && weatherIconMini) {
            weatherTempMini.textContent = weatherTemp.textContent;
            
            const iconEl = weatherIcon.querySelector('i');
            if (iconEl) {
                weatherIconMini.className = iconEl.className;
            }
        }
    }
    
    // Check if weather data is already loaded
    if (document.getElementById('weather-temp') && 
        document.getElementById('weather-temp').textContent !== '--°C') {
        updateMiniWeather();
    } else {
        // Otherwise wait for weather data to load
        const observer = new MutationObserver(function(mutations) {
            updateMiniWeather();
        });
        
        const weatherTemp = document.getElementById('weather-temp');
        if (weatherTemp) {
            observer.observe(weatherTemp, {
                characterData: true,
                childList: true,
                subtree: true
            });
        }
    }
} 