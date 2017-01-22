import {GithubThrottledState, PossiblyOfflineState, ErrorState} from './models/States'
import WidgetViewModel from './view-models/WidgetViewModel'
import UserProfileService from './services/UserProfileService'
import HttpService from './services/HttpService'
import UsernameService from './services/UsernameService'
import WidgetContainer from './containers/WidgetContainer'
import ReactDOM from 'react-dom'
import React from 'react'
import 'whatwg-fetch'

// Configuration
const numProfiles = 3

// Prepare services and view-models
const httpService = new HttpService()
const usernameService = new UsernameService(httpService)
const userProfileService = new UserProfileService(usernameService, httpService)
const widgetVm = new WidgetViewModel(userProfileService, numProfiles)

// Render widget
ReactDOM.render(<div>
  <WidgetContainer vm={widgetVm} />
  <br />
  <button onClick={fakeGitHubThrottle}>Fake GH throttle</button>
  <button onClick={fakeOffline}>Fake offline</button>
  <button onClick={fakeError}>Fake error</button>
</div>, document.getElementById('app'))

function fakeGitHubThrottle () {
  widgetVm._store.set('state', GithubThrottledState)
}

function fakeOffline () {
  widgetVm._store.set('state', PossiblyOfflineState)
}

function fakeError () {
  widgetVm._store.set('state', ErrorState)
}

// TODO: Cache GitHub usernames in a buffer to lower # of calls
// TODO: If there's an API fetch error, show "Error refreshing -- try again?"
// TODO: If loading takes more than 2 secs, show loading indicator
// TODO: Test with super-long names
// TODO: Test with weird charactered names
// TODO: Implement unit tests
// TODO: Test Safari
// TODO: Test Mozilla
// TODO: Test IE
// TODO: Use localStorage to remember the last 3 profiles + "since"
// TODO: React component render tests

/*

HTTP 403

documentation_url:
  "https://developer.github.com/v3/#rate-limiting"
message:
  "API rate limit exceeded for 71.198.62.122. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"

*/
