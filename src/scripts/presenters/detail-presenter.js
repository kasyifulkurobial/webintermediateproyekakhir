import { getStoryDetail } from "../data/api"
import StoryIdb from "../data/idb"

class DetailPresenter {
  constructor({ view, id }) {
    this.view = view
    this.id = id
    this.story = null
    this.needsAuth = false
    this.error = null
    this.isLoading = true
    this.isFavorite = false
  }

  async init() {
    this.isLoading = true
    this.view.updateStoryDetail(this.view.renderLoadingSkeleton())

    // Check if story is in favorites
    try {
      const favoriteStory = await StoryIdb.getStoryById(this.id)
      this.isFavorite = !!favoriteStory
    } catch (error) {
      console.error("Error checking favorite status:", error)
      this.isFavorite = false
    }

    const result = await getStoryDetail(this.id)
    this.story = result.story
    this.needsAuth = result.needsAuth
    this.error = result.error
    this.isLoading = false

    this._updateUI()

    // Add event listener for page navigation to clean up resources
    window.addEventListener("hashchange", this._cleanup.bind(this))
  }

  _updateUI() {
    let content = ""

    if (this.needsAuth) {
      content = this.view.renderAuthRequired()
    } else if (!this.story) {
      content = this.view.renderError(this.error || "Failed to load story")
    } else {
      content = this.view.renderStoryDetail(this.story, this.isFavorite)

      // Setup favorite button after rendering
      setTimeout(() => {
        this.view.setupFavoriteButton(this._handleFavoriteToggle.bind(this))
        this.view.initMap(this.story)
      }, 100)
    }

    this.view.updateStoryDetail(content)
    this.view.applyViewTransition()
  }

  async _handleFavoriteToggle() {
    if (!this.story) return

    try {
      if (this.isFavorite) {
        // Remove from favorites
        await StoryIdb.deleteStory(this.id)
        this.isFavorite = false
      } else {
        // Add to favorites
        await StoryIdb.saveStory(this.story)
        this.isFavorite = true
      }

      // Update UI
      this._updateUI()
    } catch (error) {
      console.error("Error toggling favorite status:", error)
      alert("Gagal mengubah status favorit")
    }
  }

  _cleanup() {
    // Clean up resources when navigating away
    this.view.cleanupResources()

    // Remove the hashchange event listener
    window.removeEventListener("hashchange", this._cleanup.bind(this))
  }
}

export default DetailPresenter
