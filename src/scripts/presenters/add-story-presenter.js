import { addStory, getToken } from "../data/api"

class AddStoryPresenter {
  constructor({ view }) {
    this.view = view
    this.isSubmitting = false
  }

  async init() {
    // If not logged in, no need to initialize form
    if (!getToken()) {
      this.view.applyViewTransition()
      return
    }

    // Initialize camera
    await this.view.initCamera()

    // Initialize map
    await this.view.initMap()

    // Initialize form submission
    this.view.setupFormSubmit(this._handleSubmit.bind(this))

    // Apply view transition
    this.view.applyViewTransition()

    // Add event listener for page navigation to clean up resources
    window.addEventListener("hashchange", this._cleanup.bind(this))
  }

  async _handleSubmit(formData) {
    // Show loading state
    this.isSubmitting = true
    this.view.showLoadingOverlay("Submitting your story...")

    // Submit the story
    const result = await addStory(formData)

    // Hide loading overlay
    this.view.hideLoadingOverlay()
    this.isSubmitting = false

    if (result.success) {
      alert("Story added successfully!")
      // Clean up resources
      this._cleanup()
      // Redirect to home page
      window.location.hash = "#/"
    } else {
      alert(`Failed to add story: ${result.message}`)
    }
  }

  _cleanup() {
    // Clean up resources when navigating away
    this.view.cleanupResources()

    // Remove the hashchange event listener
    window.removeEventListener("hashchange", this._cleanup.bind(this))
  }
}

export default AddStoryPresenter
