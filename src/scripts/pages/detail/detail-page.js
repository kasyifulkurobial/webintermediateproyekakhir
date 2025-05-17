import DetailView from "../../views/detail-view"
import DetailPresenter from "../../presenters/detail-presenter"
import { parseActivePathname } from "../../routes/url-parser"

export default class DetailPage {
  constructor() {
    this.view = null
    this.presenter = null
  }

  async render() {
    this.view = new DetailView()
    return this.view.render()
  }

  async afterRender() {
    const { id } = parseActivePathname()
    if (!id) {
      this.view.updateStoryDetail(this.view.renderError("Story not found"))
      return
    }

    this.presenter = new DetailPresenter({
      view: this.view,
      id: id,
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
