import { register } from "../data/api"

class RegisterPresenter {
  constructor({ view }) {
    this.view = view
    this.isLoading = false
  }

  async init() {
    this.view.setupFormSubmit(this._handleSubmit.bind(this))
    this.view.applyViewTransition()
  }

  async _handleSubmit(name, email, password) {
    // Disable form and show loading
    this.isLoading = true
    this.view.showLoadingButton()

    // Hide previous error
    this.view.hideError()

    // Attempt registration
    const result = await register(name, email, password)

    // Reset loading state
    this.isLoading = false
    this.view.resetButton()

    if (result.success) {
      // Show success message with overlay
      this.view.showLoadingOverlay("Pendaftaran berhasil! Mengalihkan ke halaman login...")

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.hash = "#/login"
      }, 1500)
    } else {
      // Show error
      this.view.showError(result.message)
    }
  }
}

export default RegisterPresenter
