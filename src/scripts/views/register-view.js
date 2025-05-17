class RegisterView {
  constructor() {
    this.container = document.querySelector("#main-content")
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container register-container">
        <h1 class="page-title">Daftar Akun</h1>
        
        <div class="auth-card">
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="name" class="form-label">Nama</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-input" 
                placeholder="Masukkan nama Anda" 
                required
              />
            </div>
            
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
                placeholder="Minimal 8 karakter" 
                minlength="8"
                required
              />
            </div>
            
            <div id="register-error" class="error-message" style="display: none;"></div>
            
            <div class="form-actions">
              <button type="submit" id="register-button" class="button button-primary">Daftar</button>
            </div>
          </form>
          
          <div class="auth-alternative">
            <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
            <p>Atau</p>
            <a href="#/" class="button button-secondary">Lanjutkan sebagai Tamu</a>
          </div>
        </div>
      </section>
    `
  }

  setupFormSubmit(submitCallback) {
    const registerForm = document.getElementById("register-form")
    if (!registerForm) return

    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Call the callback with the form data
      submitCallback(name, email, password)
    })
  }

  showLoadingButton() {
    const registerButton = document.getElementById("register-button")
    if (registerButton) {
      registerButton.disabled = true
      registerButton.innerHTML = `
        <span class="loading-spinner" style="width: 20px; height: 20px; border-width: 3px; margin-right: 8px;"></span>
        Mendaftar...
      `
    }
  }

  resetButton() {
    const registerButton = document.getElementById("register-button")
    if (registerButton) {
      registerButton.disabled = false
      registerButton.textContent = "Daftar"
    }
  }

  showError(message) {
    const errorMessage = document.getElementById("register-error")
    if (errorMessage) {
      errorMessage.textContent = message || "Pendaftaran gagal. Silakan coba lagi."
      errorMessage.style.display = "block"
    }
  }

  hideError() {
    const errorMessage = document.getElementById("register-error")
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

export default RegisterView
