import {describe, it} from 'mocha'
import {shallow} from 'enzyme'
import expect from 'expect'
import PlaceholderRow from '../../src/components/PlaceholderRow'
import React from 'react'

describe('PlaceholderRow', () => {
  const placeholderRow = shallow(<PlaceholderRow />)

  it('renders a placeholder avatar', () => {
    expect(placeholderRow.find('.widget-avatar.placeholder').length).toBeGreaterThan(0)
  })

  it('renders a placeholder name', () => {
    expect(placeholderRow.find('.widget-realname.placeholder').length).toBeGreaterThan(0)
  })

  it('renders a placeholder username', () => {
    expect(placeholderRow.find('.widget-username.placeholder').length).toBeGreaterThan(0)
  })

  it('renders a placeholder button', () => {
    expect(placeholderRow.find('.widget-profile.placeholder').length).toBeGreaterThan(0)
  })
})
