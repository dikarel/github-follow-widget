import Profile from '../models/Profile'

export default class UserProfileService {
  constructor (usernameService, httpService) {
    this._usernameService = usernameService
    this._httpService = httpService
  }

  // Promises a random GitHub profile
  getRandomProfile () {
    return this._usernameService
      .getRandomUsername()
      .then((username) => {
        const url = 'https://api.github.com/users/' + encodeURIComponent(username)
        return this._httpService
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
