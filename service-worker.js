const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/styles.css',
  '/script.js',
  '/public/All In One (1).png',
  '/public/All In One (2).png',
  '/public/All In One (3).png',
  '/public/All In One (4).png',
  '/public/All In One (5).png',
  '/public/All In One (6).png',
  '/public/Casino App (1).png',
  '/public/Casino App (2).png',
  '/public/Casino App (3).png',
  '/public/Casino App (4).png',
  '/public/Casino App (5).png',
  '/public/Casino App (6).png'
];

// Install event - cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the fetched response for future use
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Return a offline page if needed
        return caches.match(event.request);
      });
    })
  );
});
