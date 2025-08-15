const CACHE_NAME = "shoe-store-v1";

// Install event - pre-cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/", // Homepage
        "/icon512.png", // Large app icon
      ]);
    }),
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
});

// Fetch event - Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const response = await fetch(event.request);
        // Cache a copy for offline use
        cache.put(event.request, response.clone());
        return response;
      } catch (error) {
        // If offline, try to serve from cache
        const cachedResponse = await cache.match(event.request);
        return (
          cachedResponse ||
          new Response("Offline and no cache available", {
            status: 408,
            statusText: "Network error",
          })
        );
      }
    }),
  );
});
