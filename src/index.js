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

// TODO: GitHub infinite user ID spring
// TODO: GitHub user profile getter
// TODO: If there's an API fetch error, show "Error refreshing -- try again?"
// TODO: If loading takes more than 2 secs, show loading indicator
// TODO: GitHub throttling UX
// TODO: No internet UX
// TODO: Implement GitHub API service
// TODO: Test with super-long names
// TODO: Test with weird charactered names
// TODO: Implement unit tests
// TODO: Test Safari
// TODO: Test Mozilla
// TODO: Test IE
