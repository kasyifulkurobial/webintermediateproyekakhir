import { getStories } from "../data/api"

class HomePresenter {
  constructor({ view }) {
    this.view = view
    this.stories = []
    this.needsAuth = false
    this.isLoading = true
  }

  async init() {
    this.isLoading = true
    this.view.updateStoriesList(this.view.renderSkeletons())

    const result = await getStories()
    this.stories = result.stories
    this.needsAuth = result.needsAuth
    this.isLoading = false

    this._updateUI()
  }

  _updateUI() {
    let content = ""

    if (this.needsAuth) {
      content = this.view.renderAuthRequired()
    } else if (!this.stories.length) {
      content = this.view.renderEmptyState()
    } else {
      content = this.view.renderStories(this.stories)
    }

    this.view.updateStoriesList(content)
    this.view.applyViewTransition()
  }
}

export default HomePresenter
