import AddStoryView from "../../views/add-story-view"
import AddStoryPresenter from "../../presenters/add-story-presenter"

export default class AddStoryPage {
  constructor() {
    this.view = null
    this.presenter = null
  }

  async render() {
    this.view = new AddStoryView()
    return this.view.render()
  }

  async afterRender() {
    this.presenter = new AddStoryPresenter({
      view: this.view,
    })

    await this.presenter.init()
  }

  // Clean up resources when navigating away from the page
  async beforeUnload() {
    if (this.view) {
      this.view.cleanupResources()
    }
  }
}
