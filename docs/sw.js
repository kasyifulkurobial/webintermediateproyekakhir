// Service Worker untuk Push Notification dan PWA

const CACHE_NAME = "dicoding-stories-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/scripts/index.js",
  "/styles/styles.css",
  "/icons/icon-192x192.png",
  "/images/logo.png",
  "/offline.html",
]

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME
          })
          .map((cacheName) => {
            return caches.delete(cacheName)
          }),
      )
    }),
  )
})

// Fetch Strategy: Cache First, then Network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            const url = new URL(event.request.url)
            if (
              url.protocol.startsWith("http") && // only cache http/https
              !url.pathname.includes("/v1/")
            ) {
              cache.put(event.request, responseToCache)
            }
          })

          return response
        })
        .catch(() => {
          // If the network is unavailable, try to return the offline page
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html")
          }
        })
    }),
  )
})

// Handle Push Notification
self.addEventListener("push", (event) => {
  let notificationData = {}

  try {
    notificationData = event.data.json()
  } catch (e) {
    notificationData = {
      title: "Dicoding Stories",
      options: {
        body: "Ada pembaruan baru dari Dicoding Stories",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
      },
    }
  }

  const title = notificationData.title || "Dicoding Stories"
  const options = notificationData.options || {
    body: "Ada pembaruan baru dari Dicoding Stories",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Handle Notification Click
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow("/"))
})
