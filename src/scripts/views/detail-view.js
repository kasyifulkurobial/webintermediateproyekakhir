class DetailView {
  constructor() {
    this.container = document.querySelector("#main-content")
    this.map = null
  }

  renderLoadingSkeleton() {
    return `
      <div class="story-detail-content">
        <div class="story-detail-header">
          <div class="skeleton skeleton-title" style="height: 32px; width: 60%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton skeleton-date" style="height: 16px; width: 30%;"></div>
        </div>
        
        <div class="story-detail-image-container">
          <div class="skeleton" style="height: 400px; width: 100%;"></div>
        </div>
        
        <div class="story-detail-description">
          <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 16px; width: 80%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 16px; width: 90%;"></div>
        </div>
        
        <div class="story-detail-location">
          <div class="skeleton" style="height: 24px; width: 30%; margin-bottom: 1rem;"></div>
          <div class="skeleton" style="height: 300px; width: 100%;"></div>
        </div>
      </div>
    `
  }

  renderStoryDetail(story, isFavorite) {
    return `
      <div class="story-detail-content">
        <div class="story-detail-header">
          <h1 class="story-detail-name">${story.name}'s Story</h1>
          <p class="story-detail-date">${this._formatDate(story.createdAt)}</p>
        </div>
        
        <div class="story-detail-image-container">
          <img 
            src="${story.photoUrl}" 
            alt="Story by ${story.name}" 
            class="story-detail-image"
          />
        </div>
        
        <div class="story-detail-description">
          <p>${story.description}</p>
        </div>
        
        <div class="story-detail-actions">
          <button id="favorite-button" class="button ${isFavorite ? "button-danger" : "button-primary"}">
            ${isFavorite ? "Hapus dari Favorit" : "Simpan ke Favorit"}
          </button>
        </div>
        
        <div class="story-detail-location">
          <h2>Location</h2>
          <div id="map" class="story-map"></div>
        </div>
      </div>
    `
  }

  renderError(message) {
    return `
      <div class="error-state">
        <p>${message}</p>
        <a href="#/" class="button">Back to Home</a>
      </div>
    `
  }

  renderAuthRequired() {
    return `
      <div class="auth-required">
        <h2>Login Required</h2>
        <p>Please login to view story details.</p>
        <div class="auth-actions">
          <a href="#/login" class="button button-primary">Login</a>
          <a href="#/register" class="button button-secondary">Register</a>
        </div>
      </div>
    `
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container story-detail-container">
        <a href="#/" class="back-button" aria-label="Back to stories">
          ← Back to stories
        </a>
        
        <div id="story-detail" class="story-detail">
          ${this.renderLoadingSkeleton()}
        </div>
      </section>
    `
  }

  updateStoryDetail(content) {
    const detailContainer = document.getElementById("story-detail")
    if (detailContainer) {
      detailContainer.innerHTML = content
    }
  }

  setupFavoriteButton(callback) {
    const favoriteButton = document.getElementById("favorite-button")
    if (favoriteButton) {
      favoriteButton.addEventListener("click", callback)
    }
  }

  initMap(story) {
    if (!story.lat || !story.lon) {
      const mapContainer = document.getElementById("map")
      if (mapContainer) {
        mapContainer.innerHTML = "<p>No location data available for this story</p>"
      }
      return
    }

    // Load the map script dynamically
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    script.crossOrigin = ""

    // Add leaflet CSS
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      link.crossOrigin = ""
      document.head.appendChild(link)
    }

    document.head.appendChild(script)

    script.onload = () => {
      // Initialize the map after the script is loaded
      const mapContainer = document.getElementById("map")

      if (!mapContainer) return

      // Import Leaflet dynamically
      const L = window.L

      this.map = L.map(mapContainer).setView([story.lat, story.lon], 13)

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map)

      const marker = L.marker([story.lat, story.lon]).addTo(this.map)
      marker.bindPopup(`<b>${story.name}'s story location</b>`).openPopup()
    }
  }

  cleanupResources() {
    // Clean up map if it exists
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }

  applyViewTransition() {
    document.documentElement.classList.add("view-transition")
  }

  _formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

export default DetailView
