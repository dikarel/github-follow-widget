/* eslint-env browser */

export default class HttpService {

  // Promises JSON result from a GET call to a URL
  // Throws an error if HTTP status is not OK
  getJson (url) {
    return fetch(url)
      .then((res) => {
        // Append HTTP status to error object
        if (!res.ok) {
          const err = new Error('HTTP ' + res.status)
          err.status = res.status
          throw err
        }

        return res.json()
      })
      .catch((err) => {
        // Set status to 0 for connection failures
        if (err.message.match(/failed to fetch/i)) {
          err.status = 0
        }

        throw err
      })
  }
}
