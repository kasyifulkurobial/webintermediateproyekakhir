import HomeView from "../../views/home-view"
import HomePresenter from "../../presenters/home-presenter"

export default class HomePage {
  #stories = []
  #needsAuth = false
  #isLoading = true

  async render() {
    this.view = new HomeView()
    return this.view.render()
  }

  async afterRender() {
    this.presenter = new HomePresenter({
      view: this.view,
    })

    await this.presenter.init()
  }
}
