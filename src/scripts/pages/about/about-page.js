import AboutView from "../../views/about-view"
import AboutPresenter from "../../presenters/about-presenter"

export default class AboutPage {
  constructor() {
    this.view = null
    this.presenter = null
  }

  async render() {
    this.view = new AboutView()
    return this.view.render()
  }

  async afterRender() {
    this.presenter = new AboutPresenter({
      view: this.view,
    })

    await this.presenter.init()
  }
}
