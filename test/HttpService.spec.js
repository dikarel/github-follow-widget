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

    it('throws an error with status if HTTP response is not OK', () => {
      global.fetch = Promise.method(() => ({
        ok: false,
        status: 404
      }))

      const httpService = new HttpService()
      let correctErrorThrown = false

      return httpService
        .getJson('url')
        .catch((err) => { correctErrorThrown = (err.status === 404) })
        .finally(() => expect(correctErrorThrown).toBe(true))
    })

    it('throws an error with status 0 if there was a connection issue', () => {
      // TODO: Confirm whether or not 'Failed to fetch' is actually in the specs
      global.fetch = Promise.method(() => { throw new Error('Failed to fetch') })

      const httpService = new HttpService()
      let correctErrorThrown = false

      return httpService
        .getJson('url')
        .catch((err) => { correctErrorThrown = (err.status === 0) })
        .finally(() => expect(correctErrorThrown).toBe(true))
    })
  })
})
