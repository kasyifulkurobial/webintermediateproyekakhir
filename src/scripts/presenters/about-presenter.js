class AboutPresenter {
  constructor({ view }) {
    this.view = view
  }

  async init() {
    this.view.applyViewTransition()
  }
}

export default AboutPresenter
