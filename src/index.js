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
ReactDOM.render(<WidgetContainer vm={widgetVm} />, document.getElementById('app'))

// TODO: Test Safari
// TODO: Test Mozilla
// TODO: Test IE
// TODO: If loading takes more than 2 secs, show loading indicator
// TODO: Use localStorage to remember the last 3 profiles + "since"
// TODO: Test with weird charactered names
// TODO: A happier-looking placeholder avatar
// TODO: Screenshot tests
// TODO: Use CDN for 3rd party deps
// TODO: Collect all strings in one file
// TODO: Ensure CSS class names match JS names
