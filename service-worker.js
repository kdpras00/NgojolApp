// Service Worker untuk PWA NG-OJOL

const CACHE_NAME = "ngojol-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/index.js",
  "/src/style.css",
  "/img/delivery.png",
  "/img/ngojol.png",
  "/img/maps-ngojol.png",
];

// Instalasi dan caching aset statis
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache dibuka");
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Gagal menyimpan ke cache:", error);
      });
    })
  );
});

// Aktivasi dan pembersihan cache lama
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Hapus cache yang tidak digunakan lagi
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Strategi network-first, lalu fallback ke cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Kloning response untuk cache dan mengembalikan
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Hanya cache permintaan GET
          if (event.request.method === "GET") {
            cache.put(event.request, responseToCache);
          }
        });
        return response;
      })
      .catch(() => {
        // Jika network gagal, coba dari cache
        return caches.match(event.request);
      })
  );
});
