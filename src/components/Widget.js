import PlaceholderRow from './PlaceholderRow'
import ProfileRow from './ProfileRow'
import {GithubThrottledState, PossiblyOfflineState} from '../models/States'
import React from 'react'

export default function Widget (props) {
  const {profiles, profileStates, onReloadAll, onReload, state, onTryAgain} = props

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
    return profiles
      .toJS()
      .map((profile, i) => {
        if (!profile) return <PlaceholderRow key={i} />
        return <ProfileRow profile={profile} state={profileStates.get(i)} onReload={() => onReload(i)} key={i} />
      })
  }

  // TODO: Instead of reload all, have tryAgain reload only those with error states
  function footer () {
    if (state === GithubThrottledState) {
      return <div className='panel-footer'>You are being throttled by GitHub &middot; <a href='#' onClick={onTryAgain}>try again</a></div>
    } else if (state === PossiblyOfflineState) {
      return <div className='panel-footer'>You might be offline &middot; <a href='#' onClick={onTryAgain}>try again</a></div>
    }
    return []
  }
}
