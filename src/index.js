import FollowSuggestionsVM from './vm'
import Widget from './components/Widget'
import ReactDOM from 'react-dom'
import React from 'react'

class FollowSuggestions extends React.Component {
  constructor () {
    super()
    this.vm = new FollowSuggestionsVM()
    this.state = { profiles: this.vm.profiles }
  }

  componentWillMount () {
    this.vm.dataChanged = () => this.vmDataChanged()
    this.vm.reloadAll()
  }

  componentWillUnmount () {
    this.vm.dataChanged = null
  }

  render () {
    return <Widget
      profiles={this.state.profiles}
      onReload={(i) => this.vm.reloadProfile(i)}
      onRefresh={() => this.vm.reloadAll()}
      />
  }

  vmDataChanged () {
    this.setState({
      profiles: this.vm.profiles,
      requestingFreshData: this.vm.requestingFreshData,
      dataChanged: this.vm.dataChanged,
      error: this.vm.error
    })
  }
}

ReactDOM.render(<FollowSuggestions />, document.getElementById('app'))

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
