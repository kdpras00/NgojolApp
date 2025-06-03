/**
 * Notifications component
 * Manages browser notifications using the native browser API
 */

import { getCookie, setCookie } from "../utils/helpers.js";

// Initialize notifications system
function initNotifications() {
  // If user has already made a choice, don't request again
  if (getCookie("notification_preference")) {
    return;
  }

  // Request browser notification after 30 seconds delay
  setTimeout(() => {
    if (!getCookie("notification_preference")) {
      requestNotificationPermission();
    }
  }, 30000);
}

// Request browser notification permission
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      // Save user preference based on their choice
      if (permission === "granted") {
        setCookie("notification_preference", "allowed", 365); // Remember for a year
        // Could send a test notification here if desired
        // sendTestNotification();
      } else if (permission === "denied") {
        setCookie("notification_preference", "denied", 30); // Remember for a month
      } else {
        setCookie("notification_preference", "default", 7); // Remember for a week
      }
    });
  }
}

// Optional: Send a test notification
function sendTestNotification() {
  if (Notification.permission === "granted") {
    const notification = new Notification("Selamat Datang di NG-OJOL", {
      body: "Terima kasih telah mengaktifkan notifikasi. Anda akan menerima update promo terbaru.",
      icon: "/img/delivery.png",
    });

    // Close notification after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);
  }
}

// Export functions
export { initNotifications };
