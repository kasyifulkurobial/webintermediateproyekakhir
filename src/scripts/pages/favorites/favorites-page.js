import FavoritesView from "../../views/favorites-view"
import FavoritesPresenter from "../../presenters/favorites-presenter"

export default class FavoritesPage {
  constructor() {
    this.view = null
    this.presenter = null
  }

  async render() {
    this.view = new FavoritesView()
    return this.view.render()
  }

  async afterRender() {
    this.presenter = new FavoritesPresenter({
      view: this.view,
    })

    await this.presenter.init()
  }
}
