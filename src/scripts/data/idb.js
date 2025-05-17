import { openDB } from "idb"

const DATABASE_NAME = "dicoding-stories-db"
const DATABASE_VERSION = 1
const OBJECT_STORE_NAME = "stories"

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" })
  },
})

const StoryIdb = {
  async getStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME)
  },

  async getStoryById(id) {
    if (!id) {
      return null
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id)
  },

  async saveStory(story) {
    if (!story.id) {
      return
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, story)
  },

  async saveStories(stories) {
    const db = await dbPromise
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite")

    stories.forEach((story) => {
      tx.store.put(story)
    })

    return tx.done
  },

  async deleteStory(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id)
  },

  async clearStories() {
    return (await dbPromise).clear(OBJECT_STORE_NAME)
  },
}

export default StoryIdb
