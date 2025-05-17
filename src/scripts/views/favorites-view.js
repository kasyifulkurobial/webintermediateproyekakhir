class FavoritesView {
  constructor() {
    this.container = document.querySelector("#main-content")
  }

  renderStories(stories) {
    if (!stories.length) {
      return this.renderEmptyState()
    }

    return stories
      .map(
        (story) => `
      <article class="story-card">
        <a href="#/detail/${story.id}" class="story-link" aria-label="View story by ${story.name}">
          <div class="story-image-container">
            <img 
              src="${story.photoUrl}" 
              alt="Story by ${story.name}" 
              class="story-image"
              loading="lazy"
            />
          </div>
          <div class="story-content">
            <h2 class="story-name">${story.name}</h2>
            <p class="story-date">${this._formatDate(story.createdAt)}</p>
            <p class="story-description">${this._truncateText(story.description, 100)}</p>
            <button class="button button-danger remove-favorite" data-id="${story.id}">
              Hapus dari Favorit
            </button>
          </div>
        </a>
      </article>
    `,
      )
      .join("")
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <p>Belum ada cerita yang disimpan sebagai favorit.</p>
        <a href="#/" class="button button-primary">Jelajahi Cerita</a>
      </div>
    `
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container stories-container">
        <h1 class="page-title">Cerita Favorit</h1>
        <p class="page-description">Cerita yang Anda simpan untuk dibaca nanti</p>
        
        <div id="stories-list" class="stories-list">
          <div class="loading-indicator">
            <div class="loading-spinner"></div>
            <p class="loading-text">Memuat cerita favorit...</p>
          </div>
        </div>
      </section>
    `
  }

  updateStoriesList(content) {
    const storiesContainer = document.getElementById("stories-list")
    if (storiesContainer) {
      storiesContainer.innerHTML = content
    }
  }

  setupRemoveFavoriteButtons(callback) {
    const removeButtons = document.querySelectorAll(".remove-favorite")
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        const id = button.dataset.id
        callback(id)
      })
    })
  }

  applyViewTransition() {
    document.documentElement.classList.add("view-transition")
  }

  _formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  _truncateText(text, maxLength) {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }
}

export default FavoritesView
