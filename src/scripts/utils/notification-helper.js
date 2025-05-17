const NotificationHelper = {
  async requestPermission() {
    if (!("Notification" in window)) {
      console.error("Browser tidak mendukung notifikasi")
      return false
    }

    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
      console.error("Izin notifikasi tidak diberikan")
      return false
    }

    return true
  },

  async showNotification(title, options) {
    if (!this.requestPermission()) {
      return
    }

    if (!("serviceWorker" in navigator)) {
      console.error("Service Worker tidak didukung browser ini")
      return
    }

    const registration = await navigator.serviceWorker.ready
    registration.showNotification(title, options)
  },

  async subscribePushNotification(token) {
    const permission = await this.requestPermission()
    if (!permission) {
      return { success: false, message: "Izin notifikasi tidak diberikan" }
    }

    if (!("PushManager" in window)) {
      return { success: false, message: "Push notification tidak didukung browser ini" }
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const existingSubscription = await registration.pushManager.getSubscription()

      if (existingSubscription) {
        return { success: true, subscription: existingSubscription }
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(
          "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",
        ),
      })

      await this._sendSubscriptionToServer(subscription, token)

      return { success: true, subscription }
    } catch (error) {
      console.error("Error subscribing to push notifications:", error)
      return { success: false, message: error.message }
    }
  },

  async unsubscribePushNotification(token) {
    if (!("serviceWorker" in navigator)) {
      return { success: false, message: "Service Worker tidak didukung browser ini" }
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (!subscription) {
        return { success: true, message: "Tidak ada langganan yang perlu dibatalkan" }
      }

      await this._sendUnsubscriptionToServer(subscription, token)
      await subscription.unsubscribe()

      return { success: true }
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error)
      return { success: false, message: error.message }
    }
  },

  async _sendSubscriptionToServer(subscription, token) {
    const subscriptionJson = subscription.toJSON()

    const response = await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        endpoint: subscriptionJson.endpoint,
        keys: {
          p256dh: subscriptionJson.keys.p256dh,
          auth: subscriptionJson.keys.auth,
        },
      }),
    })

    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    return responseJson
  },

  async _sendUnsubscriptionToServer(subscription, token) {
    const subscriptionJson = subscription.toJSON()

    const response = await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        endpoint: subscriptionJson.endpoint,
      }),
    })

    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    return responseJson
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
  },
}

export default NotificationHelper
