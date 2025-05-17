class HomeView {
  constructor() {
    this.container = document.querySelector("#main-content")
  }

  renderSkeletons() {
    return this.#renderLoadingSkeletons()
  }

  renderStories(stories) {
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
          </div>
        </a>
      </article>
    `,
      )
      .join("")
  }

  renderAuthRequired() {
    return `
      <div class="auth-required">
        <h2>Login Required</h2>
        <p>Please login to view stories from the Dicoding community.</p>
        <div class="auth-actions">
          <a href="#/login" class="button button-primary">Login</a>
          <a href="#/register" class="button button-secondary">Register</a>
        </div>
      </div>
    `
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <p>No stories found. Be the first to share your story!</p>
      </div>
    `
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container stories-container">
        <h1 class="page-title">Dicoding Stories</h1>
        <p class="page-description">Share your moments with the Dicoding community</p>
        
        <a href="#/add" class="add-story-button">
          <span class="add-icon">+</span>
          <span>Add New Story</span>
        </a>
        
        <div id="stories-list" class="stories-list">
          ${this.renderSkeletons()}
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

  applyViewTransition() {
    document.documentElement.classList.add("view-transition")
  }

  #renderLoadingSkeletons() {
    // Create 6 skeleton cards for loading state
    let skeletons = ""
    for (let i = 0; i < 6; i++) {
      skeletons += `
        <div class="skeleton-card">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-date"></div>
            <div class="skeleton skeleton-description"></div>
            <div class="skeleton skeleton-description"></div>
          </div>
        </div>
      `
    }
    return skeletons
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

export default HomeView
