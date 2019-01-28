export default class Store {
  /**
   * @param {!string} name Database name
   * @param {function()} callback called when store is ready
   */
  constructor (name, callback) {
    const localStorage = window.localStorage

    /**
     * @returns {ItemList} Current array of items
     */
    this.getItem = () => {
      return JSON.parse(localStorage.getItem(name) || '[]')
    }

    this.setItem = (items) => {
      localStorage.setItem(name, JSON.stringify(items))
    }

    if (callback) {
      callback()
    }
  }

  /**
   * Find All items
   * @param {function()} callback called after findAll finished
   */
  findAll (callback) {
    const items = this.getItem()
    callback(items)
  }

  /**
   * Find items with properties matching those on query
   * @param {query} query query to match
   * @param {function()} callback called when the query is finished
   */
  find (query, callback) {
    try {
      const items = this.getItem()

      callback(items.filter(item => {
        for (let i in query) {
          if (query[i] !== item[i]) {
            return false
          }
        }

        return true
      }))
    } catch (e) {
      if (e) throw e
    }
  }

  /**
   * @param {update} update update Record with an id and a property to update
   * @param {function()} callback callback when new Record is applied
   */
  update (update, callback) {
    try {
      const id = update.id
      const items = this.getItem()
      let index = items.length

      while (index--) {
        if (items[index].id === id) {
          for (let j in update) {
            items[index][j] = update[j]
          }
          break
        }
      }

      this.setItem(items)

      if (callback) {
        callback()
      }
    } catch (e) {
      if (e) throw e
    }
  }

  /**
   * @param {item} item item to insert
   * @param {function} callback called when item is added
   */
  insert (item, callback) {
    try {
      const items = this.getItem()
      let index = 0
      if (items.length < 1) {
        index = 1
      } else {
        index = items[items.length - 1].id + 1
      }

      const newItem = {
        ...item,
        id: index
      }

      items.push(newItem)

      this.setItem(items)

      if (callback) {
        callback()
      }
    } catch (e) {
      if (e) throw e
    }
  }

  /**
   * @param {query} query Query matching the items to remove
   * @param {function()} callback called when records matching query are removed
   */
  remove (query, callback) {
    try {
      const items = this.getItem().filter(item => {
        for (let i in query) {
          if (query[i] !== item[i]) {
            return true
          }
        }
        return false
      })

      this.setItem(items)

      if (callback) {
        callback()
      }
    } catch (e) {
      if (e) throw e
    }
  }
}
