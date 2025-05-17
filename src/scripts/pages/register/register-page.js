import RegisterView from "../../views/register-view"
import RegisterPresenter from "../../presenters/register-presenter"

export default class RegisterPage {
  async render() {
    this.view = new RegisterView()
    return this.view.render()
  }

  async afterRender() {
    this.presenter = new RegisterPresenter({
      view: this.view,
    })

    await this.presenter.init()
  }
}
