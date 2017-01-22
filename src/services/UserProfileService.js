export default class UserProfileService {
  constructor (usernameService, httpService) {
    this.usernameService = usernameService
    this.httpService = httpService
  }

  // Promises a random GitHub profile
  getRandomProfile () {
    return this.usernameService
      .getRandomUsername()
      .then((username) => {
        const url = 'https://api.github.com/users/' + encodeURIComponent(username)
        return this.httpService.getJson(url)
      })
  }
}
