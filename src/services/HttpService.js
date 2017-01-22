/* eslint-env browser */

export default class HttpService {

  // Promises JSON result from a GET call to a URL
  // Throws an error if HTTP status is not OK
  getJson (url) {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          const err = new Error('HTTP ' + res.status)
          err.status = res.status
          throw err
        }

        return res.json()
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          err.status = 0
          throw err
        }
      })
  }
}
