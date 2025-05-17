class LoginView {
  constructor() {
    this.container = document.querySelector("#main-content")
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container login-container">
        <h1 class="page-title">Login</h1>
        
        <div class="auth-card">
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="Masukkan email Anda" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Masukkan password Anda" 
                required
              />
            </div>
            
            <div id="login-error" class="error-message" style="display: none;"></div>
            
            <div class="form-actions">
              <button type="submit" id="login-button" class="button button-primary">Login</button>
            </div>
          </form>
          
          <div class="auth-alternative">
            <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
            <p>Atau</p>
            <a href="#/" class="button button-secondary">Lanjutkan sebagai Tamu</a>
          </div>
        </div>
      </section>
    `
  }

  setupFormSubmit(submitCallback) {
    const loginForm = document.getElementById("login-form")
    if (!loginForm) return

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Call the callback with the form data
      submitCallback(email, password)
    })
  }

  showLoadingButton() {
    const loginButton = document.getElementById("login-button")
    if (loginButton) {
      loginButton.disabled = true
      loginButton.innerHTML = `
        <span class="loading-spinner" style="width: 20px; height: 20px; border-width: 3px; margin-right: 8px;"></span>
        Logging in...
      `
    }
  }

  resetButton() {
    const loginButton = document.getElementById("login-button")
    if (loginButton) {
      loginButton.disabled = false
      loginButton.textContent = "Login"
    }
  }

  showError(message) {
    const errorMessage = document.getElementById("login-error")
    if (errorMessage) {
      errorMessage.textContent = message || "Login gagal. Silakan coba lagi."
      errorMessage.style.display = "block"
    }
  }

  hideError() {
    const errorMessage = document.getElementById("login-error")
    if (errorMessage) {
      errorMessage.style.display = "none"
    }
  }

  showLoadingOverlay(message) {
    // Create loading overlay if it doesn't exist
    if (!document.getElementById("loading-overlay")) {
      const overlay = document.createElement("div")
      overlay.id = "loading-overlay"
      overlay.className = "loading-overlay"
      overlay.innerHTML = `
        <div class="loading-overlay-content">
          <div class="loading-spinner"></div>
          <p id="loading-message" class="loading-text">${message}</p>
        </div>
      `
      document.body.appendChild(overlay)
    } else {
      // Update message if overlay already exists
      document.getElementById("loading-message").textContent = message
      document.getElementById("loading-overlay").style.display = "flex"
    }
  }

  applyViewTransition() {
    document.documentElement.classList.add("view-transition")
  }
}

export default LoginView
