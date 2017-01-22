import PlaceholderRow from './PlaceholderRow'
import Stagger from 'react-css-stagger'
import {List} from 'immutable'
import ProfileRow from './ProfileRow'
import React from 'react'

const StaggerDelay = 500

export default function Widget (props) {
  const {profiles, onRefresh, onReload} = props
  const rows = (profiles || List())
    .toJS()
    .map((profile, i) => {
      if (!profile) return <div key={i}><PlaceholderRow /></div>
      return <div key={i}>
        <ProfileRow profile={profile} onReload={() => onReload(i)} />
      </div>
    })

  return (
    <div className='suggestions-panel panel panel-default'>
      <div className='panel-body'>
        <h4 className='suggestions-heading'>
          Who to follow
          <span className='suggestions-refresh'>
            &nbsp;&middot;&nbsp;
            <a onClick={onRefresh}>Refresh</a>
          </span>
        </h4>

        <Stagger transition='fadeIn' delay={StaggerDelay}>
          {rows}
        </Stagger>
      </div>
    </div>
  )
}
