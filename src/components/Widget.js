import PlaceholderRow from './PlaceholderRow'
import {List} from 'immutable'
import ProfileRow from './ProfileRow'
import React from 'react'

export default function Widget (props) {
  const {profiles, states, onReloadAll, onReload} = props

  return (
    <div className='suggestions-panel panel panel-default'>
      <div className='panel-body'>
        {header()}
        {rows()}
      </div>
    </div>
  )

  function header () {
    return (
      <h4 className='suggestions-heading'>
        Who to follow
        <span className='suggestions-refresh'>
          &nbsp;&middot;&nbsp;
          <a onClick={onReloadAll}>Refresh</a>
        </span>
      </h4>
    )
  }

  function rows () {
    return (profiles || new List())
      .toJS()
      .map((profile, i) => {
        if (!profile) return <PlaceholderRow key={i} />
        return <ProfileRow profile={profile} state={states.get(i)} onReload={() => onReload(i)} key={i} />
      })
  }
}
