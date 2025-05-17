// CSS imports
import "../styles/styles.css"

import App from "./pages/app"
import NetworkStatus from "./utils/network-status"
import NotificationHelper from "./utils/notification-helper"
import { getToken } from "./data/api"

// Check if View Transitions API is supported
const isViewTransitionsSupported = Boolean(document.startViewTransition)

// Register Service Worker
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js")
      console.log("Service Worker registered with scope:", registration.scope)

      // Subscribe to push notification if user is logged in
      const token = getToken()
      if (token) {
        await NotificationHelper.subscribePushNotification(token)
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error)
    }
  }
}

// Show network status notification
const showNetworkStatusNotification = (isOnline) => {
  const notificationContainer = document.getElementById("notification-container")
  const notificationMessage = document.getElementById("notification-message")
  const notificationClose = document.getElementById("notification-close")

  if (!notificationContainer || !notificationMessage || !notificationClose) return

  if (isOnline) {
    notificationMessage.textContent = "Anda kembali online! Konten telah diperbarui."
    notificationContainer.classList.add("online")
  } else {
    notificationMessage.textContent = "Anda sedang offline. Beberapa fitur mungkin tidak tersedia."
    notificationContainer.classList.add("offline")
  }

  notificationContainer.classList.add("show")

  notificationClose.addEventListener("click", () => {
    notificationContainer.classList.remove("show")
    setTimeout(() => {
      notificationContainer.classList.remove("online", "offline")
    }, 300)
  })

  // Auto hide after 5 seconds
  setTimeout(() => {
    notificationContainer.classList.remove("show")
    setTimeout(() => {
      notificationContainer.classList.remove("online", "offline")
    }, 300)
  }, 5000)
}

document.addEventListener("DOMContentLoaded", async () => {
  // Register service worker
  await registerServiceWorker()

  // Initialize app
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  })
  await app.renderPage()

  // Listen to hash change
  window.addEventListener("hashchange", async () => {
    if (isViewTransitionsSupported) {
      document.startViewTransition(() => app.renderPage())
    } else {
      await app.renderPage()
    }
  })

  // Listen to network status changes
  NetworkStatus.listenToNetworkChanges(
    () => showNetworkStatusNotification(true),
    () => showNetworkStatusNotification(false),
  )

  // Show initial network status if offline
  if (!NetworkStatus.isOnline()) {
    showNetworkStatusNotification(false)
  }
})
