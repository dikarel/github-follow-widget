import Profile from '../models/Profile'

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
        return this.httpService
          .getJson(url)
          .then((ghProfile) => new Profile({
            name: ghProfile.name,
            username: ghProfile.login,
            profileUrl: ghProfile.html_url,
            avatarUrl: ghProfile.avatar_url
          }))
      })
  }
}
