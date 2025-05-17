import CONFIG from "../config"
import StoryIdb from "./idb"
import NetworkStatus from "../utils/network-status"

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  GET_STORIES: `${CONFIG.BASE_URL}/stories`,
  GET_STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  POST_STORY: `${CONFIG.BASE_URL}/stories/guest`,
  SUBSCRIBE_NOTIFICATION: `${CONFIG.BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE_NOTIFICATION: `${CONFIG.BASE_URL}/notifications/subscribe`,
}

// Simpan token di localStorage
const getToken = () => localStorage.getItem("token")
const saveToken = (token) => localStorage.setItem("token", token)
const removeToken = () => localStorage.removeItem("token")

export async function register(name, email, password) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    return { success: true, message: responseJson.message }
  } catch (error) {
    console.error("Error registering:", error)
    return { success: false, message: error.message }
  }
}

export async function login(email, password) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    // Simpan token
    saveToken(responseJson.loginResult.token)

    return {
      success: true,
      user: {
        userId: responseJson.loginResult.userId,
        name: responseJson.loginResult.name,
      },
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, message: error.message }
  }
}

export function logout() {
  removeToken()
}

export async function getStories(page = 1, size = 10) {
  try {
    const token = getToken()
    const isOnline = NetworkStatus.isOnline()

    // Jika tidak ada token, kembalikan array kosong
    if (!token) {
      return { needsAuth: true, stories: [] }
    }

    // Jika offline, ambil dari IndexedDB
    if (!isOnline) {
      const stories = await StoryIdb.getStories()
      return { needsAuth: false, stories, fromCache: true }
    }

    // Jika online, ambil dari API
    const response = await fetch(`${ENDPOINTS.GET_STORIES}?page=${page}&size=${size}&location=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    // Simpan ke IndexedDB
    await StoryIdb.saveStories(responseJson.listStory)

    return { needsAuth: false, stories: responseJson.listStory }
  } catch (error) {
    console.error("Error getting stories:", error)

    // Jika terjadi error, coba ambil dari IndexedDB
    try {
      const stories = await StoryIdb.getStories()
      return { needsAuth: false, stories, fromCache: true }
    } catch (idbError) {
      console.error("Error getting stories from IndexedDB:", idbError)
      return { needsAuth: false, stories: [], error: error.message }
    }
  }
}

export async function getStoryDetail(id) {
  try {
    const token = getToken()
    const isOnline = NetworkStatus.isOnline()

    // Jika tidak ada token, kembalikan null
    if (!token) {
      return { needsAuth: true, story: null }
    }

    // Jika offline, ambil dari IndexedDB
    if (!isOnline) {
      const story = await StoryIdb.getStoryById(id)
      if (story) {
        return { needsAuth: false, story, fromCache: true }
      }
    }

    // Jika online atau tidak ada di cache, ambil dari API
    const response = await fetch(ENDPOINTS.GET_STORY_DETAIL(id), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    // Simpan ke IndexedDB
    await StoryIdb.saveStory(responseJson.story)

    return { needsAuth: false, story: responseJson.story }
  } catch (error) {
    console.error("Error getting story detail:", error)

    // Jika terjadi error, coba ambil dari IndexedDB
    try {
      const story = await StoryIdb.getStoryById(id)
      if (story) {
        return { needsAuth: false, story, fromCache: true }
      }
    } catch (idbError) {
      console.error("Error getting story from IndexedDB:", idbError)
    }

    return { needsAuth: false, story: null, error: error.message }
  }
}

export async function addStory(formData) {
  try {
    const token = getToken()

    // Jika tidak ada token, gunakan endpoint guest
    const endpoint = token ? ENDPOINTS.GET_STORIES : ENDPOINTS.POST_STORY

    // Siapkan headers berdasarkan ketersediaan token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: formData,
    })
    const responseJson = await response.json()

    if (responseJson.error) {
      throw new Error(responseJson.message)
    }

    return { success: true, message: responseJson.message }
  } catch (error) {
    console.error("Error adding story:", error)
    return { success: false, message: error.message }
  }
}

export { getToken }
