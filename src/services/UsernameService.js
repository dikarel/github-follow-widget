import Promise from 'bluebird'

const emptyPromise = Promise.method(() => {})

export default class UsernameService {
  constructor (httpService) {
    this._latestPromise = emptyPromise()
    this._httpService = httpService
    this._lastId = 0
  }

  // Promises a random GitHub username
  getRandomUsername () {
    this._latestPromise = this._latestPromise
      .then(() => {
        const url = 'https://api.github.com/users?since=' + encodeURIComponent(this._lastId)
        return this._httpService.getJson(url)
      })
      .then((users) => {
        this._lastId = users[0].id
        return users[0].login
      })

    return this._latestPromise
  }
}
