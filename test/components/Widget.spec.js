import {shallow} from 'enzyme'
import {describe, it} from 'mocha'
import {GithubThrottledState, PossiblyOfflineState, ErrorState} from '../../src/models/States'
import {List} from 'immutable'
import expect from 'expect'
import PlaceholderRow from '../../src/components/PlaceholderRow'
import ProfileRow from '../../src/components/ProfileRow'
import React from 'react'
import Widget from '../../src/components/Widget'

describe('Widget', () => {
  describe('when initially loading', () => {
    it('renders a PlaceholderRow component for each profile', () => {
      const profiles = List.of(null, null, null)
      const widget = shallow(<Widget profiles={profiles} />)
      expect(widget.find(PlaceholderRow).length).toBe(3)
    })
  })

  describe('when data has been loaded', () => {
    it('renders a ProfileRow component for each profile', () => {
      const profiles = List.of({}, {}, {})
      const profileStates = List.of(null, null, null)
      const widget = shallow(<Widget profiles={profiles} profileStates={profileStates} />)
      expect(widget.find(ProfileRow).length).toBe(3)
    })
  })

  it('renders a refresh button', () => {
      const profiles = List()
      const profileStates = List()
      const widget = shallow(<Widget profiles={profiles} profileStates={profileStates} />)
      expect(widget.text()).toMatch(/refresh/i)
  })

  it('renders a view all button', () => {
      const profiles = List()
      const profileStates = List()
      const widget = shallow(<Widget profiles={profiles} profileStates={profileStates} />)
      expect(widget.text()).toMatch(/view all/i)
  })

  describe('when it is throttled by GitHub', () => {
    let widget = null

    beforeEach(() => {
      widget = shallow(<Widget profiles={List()} profileStates={List()} state={GithubThrottledState}/>)
    })

    it('renders an error message', () => {
      expect(widget.text()).toMatch(/throttled by github/i)
    })

    it('offers a link to an explanation', () => {
      expect(widget.text()).toMatch(/find out more/i)
    })
  })

  describe('when it is possibly offline', () => {
    let widget = null

    beforeEach(() => {
      widget = shallow(<Widget profiles={List()} profileStates={List()} state={PossiblyOfflineState}/>)
    })

    it('renders an error message', () => {
      expect(widget.text()).toMatch(/offline/i)
    })

    it('offers an option to try again', () => {
      expect(widget.text()).toMatch(/try again/i)
    })
  })

  describe('when there is a generic load error', () => {
    let widget = null

    beforeEach(() => {
      widget = shallow(<Widget profiles={List()} profileStates={List()} state={ErrorState}/>)
    })

    it('renders an error message', () => {
      expect(widget.text()).toMatch(/failed/i)
    })

    it('offers an option to try again', () => {
      expect(widget.text()).toMatch(/try again/i)
    })
  })
})
