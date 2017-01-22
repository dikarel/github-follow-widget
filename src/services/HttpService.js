/* eslint-env browser */

export default class HttpService {
  constructor (fetch) {
    this._fetch = fetch || global.fetch
  }

  // Promises JSON result from a GET call to a URL
  // Throws an error if HTTP status is not OK
  getJson (url) {
    return this._fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.statusCode)
        return res.json()
      })
  }
}
