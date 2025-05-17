import LoginView from "../../views/login-view"
import LoginPresenter from "../../presenters/login-presenter"

export default class LoginPage {
  async render() {
    this.view = new LoginView()
    return this.view.render()
  }

  async afterRender() {
    this.presenter = new LoginPresenter({
      view: this.view,
    })

    await this.presenter.init()
  }
}
