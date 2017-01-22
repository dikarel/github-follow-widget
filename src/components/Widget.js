import PlaceholderRow from './PlaceholderRow'
import {List} from 'immutable'
import ProfileRow from './ProfileRow'
import {GithubThrottledState, PossiblyOfflineState} from '../models/States'
import React from 'react'

export default function Widget (props) {
  const {profiles, profileStates, onReloadAll, onReload, state} = props

  return (
    <div className='suggestions-panel panel panel-default'>
      <div className='panel-body'>
        {header()}
        {rows()}
      </div>
      {footer()}
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
        return <ProfileRow profile={profile} state={profileStates.get(i)} onReload={() => onReload(i)} key={i} />
      })
  }

  // TODO: Instead of reload all, have tryAgain reload only those with error states
  function footer () {
    if (state === GithubThrottledState) {
      return <div className='panel-footer'><span className='glyphicon glyphicon-warning-sign' /> You are being throttled by GitHub &middot; <a onClick={onReloadAll}>try again</a></div>
    } else if (state === PossiblyOfflineState) {
      return <div className='panel-footer'><span className='glyphicon glyphicon-warning-sign' /> You might be offline &middot; <a onClick={onReloadAll}>try again</a></div>
    }
    return []
  }
}
