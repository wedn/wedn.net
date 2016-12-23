const storage = {}

export default {
  async set (key, value) {
    storage[key] = value
  },
  async get (key, value) {
    return storage[key]
  },
  async remove (key) {
    delete storage[key]
  },
  async clear () {
    for (const key in storage) {
      delete storage[key]
    }
  }
}
