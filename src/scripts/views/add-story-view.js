import { getToken } from "../data/api"

class AddStoryView {
  constructor() {
    this.container = document.querySelector("#main-content")
    this.map = null
    this.marker = null
    this.mediaStream = null
    this.selectedPosition = null
    this.isSubmitting = false
  }

  renderAuthRequired() {
    return `
      <div class="auth-required">
        <h2>Login Required</h2>
        <p>Please login to add your story.</p>
        <div class="auth-actions">
          <a href="#/login" class="button button-primary">Login</a>
          <a href="#/register" class="button button-secondary">Register</a>
        </div>
      </div>
    `
  }

  renderAddStoryForm() {
    return `
      <form id="add-story-form" class="add-story-form">
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea 
            id="description" 
            name="description" 
            class="form-input form-textarea" 
            placeholder="Tell your story..." 
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">Photo</label>
          <div class="camera-container">
            <video id="camera-preview" class="camera-preview" autoplay playsinline></video>
            <canvas id="camera-canvas" class="camera-canvas" style="display: none;"></canvas>
            <div class="camera-controls">
              <button type="button" id="camera-capture" class="camera-button">
                Take Photo
              </button>
              <button type="button" id="camera-retake" class="camera-button" style="display: none;">
                Retake
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Location</label>
          <p class="form-help-text">Click on the map to set your story location</p>
          <div id="location-map" class="location-map"></div>
          <div id="selected-location" class="selected-location">
            <p>No location selected</p>
          </div>
        </div>
        
        <div class="form-actions">
          <a href="#/" class="button button-secondary">Cancel</a>
          <button type="submit" id="submit-button" class="button button-primary" disabled>
            Submit Story
          </button>
        </div>
      </form>
    `
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container add-story-container">
        <h1 class="page-title">Add New Story</h1>
        
        <div id="add-story-content">
          ${!getToken() ? this.renderAuthRequired() : this.renderAddStoryForm()}
        </div>
      </section>
    `
  }

  initCamera() {
    const cameraPreview = document.getElementById("camera-preview")
    const captureButton = document.getElementById("camera-capture")
    const retakeButton = document.getElementById("camera-retake")
    const canvas = document.getElementById("camera-canvas")
    const submitButton = document.getElementById("submit-button")

    if (!cameraPreview || !captureButton || !retakeButton || !canvas || !submitButton) {
      return Promise.resolve(null)
    }

    return navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment" },
      })
      .then((stream) => {
        this.mediaStream = stream
        cameraPreview.srcObject = stream

        // Setup camera capture and retake buttons
        captureButton.addEventListener("click", () => {
          // Display the canvas and hide the video
          canvas.style.display = "block"
          cameraPreview.style.display = "none"

          // Draw the current video frame to the canvas
          const context = canvas.getContext("2d")
          canvas.width = cameraPreview.videoWidth
          canvas.height = cameraPreview.videoHeight
          context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height)

          // Show retake button and hide capture button
          captureButton.style.display = "none"
          retakeButton.style.display = "inline-block"

          // Enable submit button if location is also selected
          if (this.selectedPosition) {
            submitButton.disabled = false
          }
        })

        retakeButton.addEventListener("click", () => {
          // Hide the canvas and show the video
          canvas.style.display = "none"
          cameraPreview.style.display = "block"

          // Show capture button and hide retake button
          captureButton.style.display = "inline-block"
          retakeButton.style.display = "none"

          // Disable submit button
          submitButton.disabled = true
        })

        return stream
      })
      .catch((error) => {
        console.error("Error accessing camera:", error)
        const cameraContainer = document.querySelector(".camera-container")
        if (cameraContainer) {
          cameraContainer.innerHTML = `
            <div class="error-state">
              <p>Failed to access camera. Please make sure you have granted camera permissions.</p>
              <input type="file" id="photo-upload" accept="image/*" class="form-input">
              <label for="photo-upload" class="button">Upload Photo Instead</label>
            </div>
          `

          // Add event listener for file upload
          const photoUpload = document.getElementById("photo-upload")
          if (photoUpload) {
            photoUpload.addEventListener("change", (event) => {
              if (event.target.files && event.target.files[0]) {
                // Enable submit button if location is also selected
                if (this.selectedPosition) {
                  submitButton.disabled = false
                }
              }
            })
          }
        }
        return null
      })
  }

  initMap() {
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

    return new Promise((resolve) => {
      script.onload = () => {
        // Initialize the map after the script is loaded
        const mapContainer = document.getElementById("location-map")
        const selectedLocationElement = document.getElementById("selected-location")
        const submitButton = document.getElementById("submit-button")

        if (!mapContainer || !selectedLocationElement || !submitButton) {
          resolve()
          return
        }

        // Import Leaflet dynamically
        const L = window.L

        // Default to Indonesia's coordinates
        this.map = L.map(mapContainer).setView([-2.5489, 118.0149], 5)

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map)

        // Add click event to the map
        this.map.on("click", (e) => {
          const { lat, lng } = e.latlng

          // Update selected position
          this.selectedPosition = { lat, lon: lng }

          // Update or create marker
          if (this.marker) {
            this.marker.setLatLng([lat, lng])
          } else {
            this.marker = L.marker([lat, lng]).addTo(this.map)
          }

          // Update selected location text
          selectedLocationElement.innerHTML = `
            <p>Selected location: ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
          `

          // Enable submit button if photo is also captured
          const canvas = document.getElementById("camera-canvas")
          const photoUpload = document.getElementById("photo-upload")

          if (
            (canvas && canvas.style.display !== "none") ||
            (photoUpload && photoUpload.files && photoUpload.files.length > 0)
          ) {
            submitButton.disabled = false
          }
        })

        resolve()
      }
    })
  }

  setupFormSubmit(submitCallback) {
    const form = document.getElementById("add-story-form")
    if (!form) return

    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const description = document.getElementById("description").value
      const canvas = document.getElementById("camera-canvas")
      const photoUpload = document.getElementById("photo-upload")

      if (!description) {
        alert("Please enter a description")
        return
      }

      if (!this.selectedPosition) {
        alert("Please select a location on the map")
        return
      }

      // Create form data
      const formData = new FormData()
      formData.append("description", description)

      // Add photo from canvas or file upload
      if (canvas && canvas.style.display !== "none") {
        canvas.toBlob(
          async (blob) => {
            formData.append("photo", blob, "photo.jpg")

            // Add location data
            formData.append("lat", this.selectedPosition.lat)
            formData.append("lon", this.selectedPosition.lon)

            // Call the callback with the form data
            submitCallback(formData)
          },
          "image/jpeg",
          0.8,
        )
      } else if (photoUpload && photoUpload.files && photoUpload.files.length > 0) {
        formData.append("photo", photoUpload.files[0])

        // Add location data
        formData.append("lat", this.selectedPosition.lat)
        formData.append("lon", this.selectedPosition.lon)

        // Call the callback with the form data
        submitCallback(formData)
      } else {
        alert("Please take a photo or upload an image")
      }
    })
  }

  showLoadingOverlay(message) {
    // Create loading overlay if it doesn't exist
    if (!document.getElementById("loading-overlay")) {
      const overlay = document.createElement("div")
      overlay.id = "loading-overlay"
      overlay.className = "loading-overlay"
      overlay.innerHTML = `
        <div class="loading-overlay-content">
          <div class="loading-spinner"></div>
          <p id="loading-message" class="loading-text">${message}</p>
        </div>
      `
      document.body.appendChild(overlay)
    } else {
      // Update message if overlay already exists
      document.getElementById("loading-message").textContent = message
      document.getElementById("loading-overlay").style.display = "flex"
    }
  }

  hideLoadingOverlay() {
    const overlay = document.getElementById("loading-overlay")
    if (overlay) {
      overlay.style.display = "none"
    }
  }

  cleanupResources() {
    // Stop media stream if it exists
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop())
      this.mediaStream = null
    }

    // Clean up map if it exists
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }

  applyViewTransition() {
    document.documentElement.classList.add("view-transition")
  }
}

export default AddStoryView
