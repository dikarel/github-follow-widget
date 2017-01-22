import {describe, it} from 'mocha'
import UsernameService from '../../src/services/UsernameService'
import Promise from 'bluebird'
import expect from 'expect'

describe('UsernameService', () => {
  const httpService = {
    getJson: Promise.method((url) => {
      if (url === 'https://api.github.com/users?since=0') return [{login: 'user-1', id: 1}]
      if (url === 'https://api.github.com/users?since=1') return [{login: 'user-2', id: 2}]
      throw new Error('Unsupported URL ' + url)
    })
  }

  describe('getRandomUsername', () => {
    it('promises unique GitHub usernames', () => {
      const usernameService = new UsernameService(httpService)
      return usernameService
        .getRandomUsername()
        .then((username) => expect(username).toBe('user-1'))
        .then(() => usernameService.getRandomUsername())
        .then((username) => expect(username).toBe('user-2'))
    })
  })
})
