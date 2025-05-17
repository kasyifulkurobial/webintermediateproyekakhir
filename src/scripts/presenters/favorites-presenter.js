import StoryIdb from "../data/idb"

class FavoritesPresenter {
  constructor({ view }) {
    this.view = view
    this.stories = []
  }

  async init() {
    await this._loadFavorites()
    this.view.applyViewTransition()
    this.view.setupRemoveFavoriteButtons(this._handleRemoveFavorite.bind(this))
  }

  async _loadFavorites() {
    try {
      this.stories = await StoryIdb.getStories()
      const content = this.view.renderStories(this.stories)
      this.view.updateStoriesList(content)
      this.view.setupRemoveFavoriteButtons(this._handleRemoveFavorite.bind(this))
    } catch (error) {
      console.error("Error loading favorites:", error)
      this.view.updateStoriesList(this.view.renderEmptyState())
    }
  }

  async _handleRemoveFavorite(id) {
    try {
      await StoryIdb.deleteStory(id)
      await this._loadFavorites()
    } catch (error) {
      console.error("Error removing favorite:", error)
      alert("Gagal menghapus cerita dari favorit")
    }
  }
}

export default FavoritesPresenter
