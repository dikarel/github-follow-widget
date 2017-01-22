import {describe, it} from 'mocha'
import HttpService from '../src/services/HttpService'
import Promise from 'bluebird'
import expect from 'expect'

describe('HttpService', () => {
  describe('getJson', () => {
    it('promises a JSON representation of a GET call to a URL', () => {
      global.fetch = Promise.method(() => ({
        ok: true,
        json: () => 'hello world'
      }))

      const httpService = new HttpService()
      return httpService
        .getJson('url')
        .then((res) => expect(res).toEqual('hello world'))
    })

    it('throws an error if HTTP response is not OK', () => {
      global.fetch = Promise.method(() => ({
        ok: false
      }))

      const httpService = new HttpService()
      let errorThrown = false

      return httpService
        .getJson('url')
        .catch(() => { errorThrown = true })
        .finally(() => expect(errorThrown).toBe(true))
    })
  })
})
