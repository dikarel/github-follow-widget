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

// TODO: Test Safari
// TODO: Test Mozilla
// TODO: Test IE
// TODO: React component render tests
// TODO: If loading takes more than 2 secs, show loading indicator
// TODO: Use localStorage to remember the last 3 profiles + "since"
// TODO: Test with weird charactered names
// TODO: A happier-looking placeholder avatar
// TODO: Screenshot tests
