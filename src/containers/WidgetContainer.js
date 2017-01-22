import React, {Component} from 'react'
import Widget from '../components/Widget'

export default class WidgetContainer extends Component {

  // Initialize state and subscribe to changes in VM
  constructor (props) {
    super()
    this._vm = props.vm
    this.state = { profiles: this._vm.profiles, profileStates: this._vm.profileStates, state: this._vm.state }
    this.unsubscribe = this._vm.subscribe(() => {
      this.setState({ profiles: this._vm.profiles, profileStates: this._vm.profileStates, state: this._vm.state })
    })
  }

  // Start loading initial data
  componentWillMount () {
    this._vm.reloadAll()
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    return <Widget
      profiles={this.state.profiles}
      profileStates={this.state.profileStates}
      state={this.state.state}
      onReload={(i) => this._vm.reload(i)}
      onReloadAll={() => this._vm.reloadAll()}
      onTryAgain={() => this._vm.tryAgain()}
    />
  }
}
