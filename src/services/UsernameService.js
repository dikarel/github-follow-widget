import Promise from 'bluebird'
import SortedSet from 'js-sorted-set'

const emptyPromise = Promise.method(() => {})

export default class UsernameService {
  constructor (httpService) {
    this._usernames = new SortedSet({comparator: (a, b) => b.order - a.order})
    this._latestPromise = emptyPromise()
    this._httpService = httpService
    this._lastSeenId = 0
  }

  // Promises a random GitHub username
  getRandomUsername () {
    // If we encounter an error, restart from an fresh promise (otherwise, subsequent promises will always error out)
    if (this._latestPromise.error) this._latestPromise = emptyPromise()

    this._latestPromise = this._latestPromise
      .then(() => {
        // Don't need to load new data if we still have enough usernames in reserve
        if (this._usernames.size > 0) return

        // Otherwise, new usernames from GitHub
        const url = 'https://api.github.com/users?since=' + encodeURIComponent(this._lastSeenId)
        return this._httpService
          .getJson(url)
          .then((users) => {
            this._lastSeenId = users[users.length - 1].id
            users.forEach((user) => this._usernames.insert({
              username: user.login,
              order: Math.random()
            }))
          })
      })
      .then(() => {
        // Return a username from the usernames reserve
        const usernameEntry = this._usernames.beginIterator().value()
        this._usernames.remove(usernameEntry)
        return usernameEntry.username
      })

    return this._latestPromise
  }
}
