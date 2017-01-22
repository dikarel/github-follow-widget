export default class UsernameService {
  constructor (httpService) {
    this.httpService = httpService
    this.lastId = 0
  }

  // Promises a random GitHub username
  getUsername () {
    const url = 'https://api.github.com/users?since=' + encodeURIComponent(this.lastId)
    return this.httpService
      .getJson(url)
      .tap((users) => { this.lastId = users[0].id })
      .then((users) => users[0].login)
  }
}
