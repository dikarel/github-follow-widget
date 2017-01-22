export default class UsernameService {
  constructor (httpService) {
    this._httpService = httpService
    this._lastId = 0
  }

  // Promises a random GitHub username
  getRandomUsername () {
    const url = 'https://api.github.com/users?since=' + encodeURIComponent(this._lastId)
    return this._httpService
      .getJson(url)
      .tap((users) => { this._lastId = users[0].id })
      .then((users) => users[0].login)
  }
}
