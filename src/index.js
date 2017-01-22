import 'whatwg-fetch'
import HttpService from './services/HttpService'
import React from 'react'
import ReactDOM from 'react-dom'
import UsernameService from './services/UsernameService'
import UserProfileService from './services/UserProfileService'
import WidgetContainer from './containers/WidgetContainer'
import WidgetViewModel from './view-models/WidgetViewModel'

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
// TODO: Collect all strings in one file
// TODO: Ensure CSS class names match JS names
