import {describe, it} from 'mocha'
import HttpService from '../src/services/HttpService'
import Promise from 'bluebird'
import expect from 'expect'

describe('HttpService', () => {
  describe('getJson', () => {
    it('promises a JSON representation of a GET call to a URL', () => {
      const fetch = Promise.method(() => ({
        ok: true,
        json: () => 'hello world'
      }))

      const httpService = new HttpService(fetch)
      return httpService
        .getJson('url')
        .then((res) => expect(res).toEqual('hello world'))
    })

    it('throws an error if HTTP response is not OK', () => {
      const fetch = Promise.method(() => ({
        ok: false
      }))

      const httpService = new HttpService(fetch)
      let errorThrown = false

      return httpService
        .getJson('url')
        .catch(() => { errorThrown = true })
        .finally(() => expect(errorThrown).toBe(true))
    })
  })
})
