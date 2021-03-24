const storage = {
  set: function (key, value, date) {
    window.localStorage.setItem(key, value)
    if (date) {
      setTimeout(() => {
        this.remove(key)
      }, date)
    }
  },
  get: function (key) {
    return window.localStorage.getItem(key) ? window.localStorage.getItem(key) : undefined
  },
  remove: function (key) {
    window.localStorage.removeItem(key)
  }
}
export default storage
