import Widget from '../components/Widget'
import React, {Component} from 'react'

export default class WidgetContainer extends Component {

  // Initialize state and subscribe to changes in VM
  constructor (props) {
    super()
    this._vm = props.vm
    this.state = { profiles: this._vm.profiles, states: this._vm.states }
    this.unsubscribe = this._vm.subscribe(() => {
      this.setState({ profiles: this._vm.profiles, states: this._vm.states })
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
      states={this.state.states}
      onReload={(i) => this._vm.reload(i)}
      onReloadAll={() => this._vm.reloadAll()}
    />
  }
}
