import {describe, it} from 'mocha'
import { shallow } from 'enzyme'
import expect from 'expect'
import React from 'react'
import Widget from '../../src/components/Widget'
import {List} from 'immutable'
import PlaceholderRow from '../../src/components/PlaceholderRow'
import {GithubThrottledState, PossiblyOfflineState, ErrorState} from '../../src/models/States'
import ProfileRow from '../../src/components/ProfileRow'

describe('Widget', () => {
  describe('when initially loading', () => {
    it('renders a PlaceholderRow component for each profile', () => {
      const profiles = List.of(null, null, null)
      const wrapper = shallow(<Widget profiles={profiles} />)
      expect(wrapper.find(PlaceholderRow).length).toBe(3)
    })
  })

  describe('when data has been loaded', () => {
    it('renders a ProfileRow component for each profile', () => {
      const profiles = List.of({}, {}, {})
      const profileStates = List.of(null, null, null)
      const wrapper = shallow(<Widget profiles={profiles} profileStates={profileStates} />)
      expect(wrapper.find(ProfileRow).length).toBe(3)
    })
  })

  it('renders a refresh button', () => {
      const profiles = List()
      const profileStates = List()
      const wrapper = shallow(<Widget profiles={profiles} profileStates={profileStates} />)
      expect(wrapper.text()).toMatch(/refresh/i)
  })

  it('renders a view all button', () => {
      const profiles = List()
      const profileStates = List()
      const wrapper = shallow(<Widget profiles={profiles} profileStates={profileStates} />)
      expect(wrapper.text()).toMatch(/view all/i)
  })

  describe('when it is throttled by GitHub', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Widget profiles={List()} profileStates={List()} state={GithubThrottledState}/>)
    })

    it('renders an error message', () => {
      expect(wrapper.text()).toMatch(/throttled by github/i)
    })

    it('offers a link to an explanation', () => {
      expect(wrapper.text()).toMatch(/find out more/i)
    })
  })

  describe('when it is possibly offline', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Widget profiles={List()} profileStates={List()} state={PossiblyOfflineState}/>)
    })

    it('renders an error message', () => {
      expect(wrapper.text()).toMatch(/offline/i)
    })

    it('offers an option to try again', () => {
      expect(wrapper.text()).toMatch(/try again/i)
    })
  })

  describe('when there is a generic load error', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Widget profiles={List()} profileStates={List()} state={ErrorState}/>)
    })

    it('renders an error message', () => {
      expect(wrapper.text()).toMatch(/failed/i)
    })

    it('offers an option to try again', () => {
      expect(wrapper.text()).toMatch(/try again/i)
    })
  })
})
