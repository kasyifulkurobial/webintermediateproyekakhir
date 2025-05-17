const NetworkStatus = {
  isOnline() {
    return navigator.onLine
  },

  listenToNetworkChanges(onlineCallback, offlineCallback) {
    window.addEventListener("online", () => {
      if (typeof onlineCallback === "function") {
        onlineCallback()
      }
    })

    window.addEventListener("offline", () => {
      if (typeof offlineCallback === "function") {
        offlineCallback()
      }
    })
  },
}

export default NetworkStatus
