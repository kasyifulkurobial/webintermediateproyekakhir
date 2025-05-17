import routes from "../routes/routes"
import { getActiveRoute } from "../routes/url-parser"

class App {
  #content = null
  #drawerButton = null
  #navigationDrawer = null
  #currentPage = null

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content
    this.#drawerButton = drawerButton
    this.#navigationDrawer = navigationDrawer

    this.#setupDrawer()
    this.#updateLoginMenu()
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open")
    })

    document.body.addEventListener("click", (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove("open")
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open")
        }
      })
    })
  }

  #updateLoginMenu() {
    const loginMenu = document.getElementById("login-menu")
    const token = localStorage.getItem("token")

    if (token) {
      loginMenu.textContent = "Logout"
      loginMenu.href = "#/logout"
      loginMenu.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        window.location.hash = "#/"
        // Remove the reload and just update the menu
        this.#updateLoginMenu()
      })
    } else {
      loginMenu.textContent = "Login"
      loginMenu.href = "#/login"
    }
  }

  async renderPage() {
    // Clean up current page if it exists
    if (this.#currentPage && typeof this.#currentPage.beforeUnload === "function") {
      await this.#currentPage.beforeUnload()
    }

    const url = getActiveRoute()
    this.#currentPage = routes[url]

    this.#content.innerHTML = await this.#currentPage.render()
    await this.#currentPage.afterRender()

    // Update login menu after page render
    this.#updateLoginMenu()
  }
}

export default App
