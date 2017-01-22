import {describe, it} from 'mocha'
import expect from 'expect'
import Promise from 'bluebird'
import UserProfileService from '../../src/services/UserProfileService'

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
          expect(profile.username).toBe('octocat')
          expect(profile.avatarUrl).toBe('https://github.com/images/error/octocat_happy.gif')
          expect(profile.profileUrl).toBe('https://github.com/octocat')
          expect(profile.name).toBe('monalisa octocat')
        })
    })
  })
})
