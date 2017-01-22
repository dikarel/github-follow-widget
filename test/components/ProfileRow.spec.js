import {describe, it} from 'mocha'
import {ErrorState, LoadingState, IdleState} from '../../src/models/States'
import {shallow} from 'enzyme'
import expect from 'expect'
import ProfileRow from '../../src/components/ProfileRow'
import React from 'react'

describe('ProfileRow', () => {
  const profile = {
    avatarUrl: 'http://avatar',
    name: 'name',
    username: 'username',
    profileUrl: 'http://profile'
  }

  const profileRow = shallow(<ProfileRow profile={profile} state={IdleState} />)

  it('renders profile avatar', () => {
    expect(profileRow.find('.widget-avatar').prop('src')).toBe('http://avatar')
  })

  it('renders profile name', () => {
    expect(profileRow.find('.widget-realname').text()).toBe('name')
  })

  it('renders profile username', () => {
    expect(profileRow.find('.widget-username').text()).toBe('username')
  })

  it('renders profile button', () => {
    expect(profileRow.find('a[role="button"]').prop('href')).toBe('http://profile')
  })

  it('renders reload button', () => {
    expect(profileRow.find('.widget-close').length).toBeGreaterThan(0)
  })

  describe('when it is reloading', () => {
    it('looks ephemeral', () => {
      const profileRow = shallow(<ProfileRow profile={{}} state={LoadingState} />)
      expect(profileRow.find('.widget-row.ephemeral').length).toBeGreaterThan(0)
    })
  })

  describe('when there is an error', () => {
    it('looks ephemeral', () => {
      const profileRow = shallow(<ProfileRow profile={{}} state={ErrorState} />)
      expect(profileRow.find('.widget-row.ephemeral').length).toBeGreaterThan(0)
    })
  })
})
