import { login } from "../data/api"

class LoginPresenter {
  constructor({ view }) {
    this.view = view
    this.isLoading = false
  }

  async init() {
    this.view.setupFormSubmit(this._handleSubmit.bind(this))
    this.view.applyViewTransition()
  }

  async _handleSubmit(email, password) {
    // Disable form and show loading
    this.isLoading = true
    this.view.showLoadingButton()

    // Hide previous error
    this.view.hideError()

    // Attempt login
    const result = await login(email, password)

    // Reset loading state
    this.isLoading = false
    this.view.resetButton()

    if (result.success) {
      // Show success message
      this.view.showLoadingOverlay("Login successful! Redirecting...")

      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.hash = "#/"
      }, 1000)
    } else {
      // Show error
      this.view.showError(result.message)
    }
  }
}

export default LoginPresenter
