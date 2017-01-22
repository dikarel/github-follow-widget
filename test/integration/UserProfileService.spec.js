import {describe, it} from 'mocha'
import UserProfileService from '../../src/services/UserProfileService'
import Promise from 'bluebird'
import expect from 'expect'

describe('UserProfileService', () => {
  const httpService = {
    getJson: Promise.method((url) => {
      if (url === 'https://api.github.com/users/octocat') {
        return {
          login: 'octocat',
          avatar_url: 'https://github.com/images/error/octocat_happy.gif',
          html_url: 'https://github.com/octocat',
          name: 'monalisa octocat'
        }
      }

      throw new Error('Unsupported URL ' + url)
    })
  }

  const usernameService = {
    getRandomUsername: Promise.method(() => 'octocat')
  }

  describe('getUsername', () => {
    it('promises a GitHub profile', () => {
      const userProfileService = new UserProfileService(usernameService, httpService)
      return userProfileService
        .getRandomProfile()
        .then((profile) => {
          expect(profile.login).toBe('octocat')
          expect(profile.avatar_url).toBe('https://github.com/images/error/octocat_happy.gif')
          expect(profile.html_url).toBe('https://github.com/octocat')
          expect(profile.name).toBe('monalisa octocat')
        })
    })
  })
})
