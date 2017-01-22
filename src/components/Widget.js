import PlaceholderRow from './PlaceholderRow'
import ProfileRow from './ProfileRow'
import {GithubThrottledState, PossiblyOfflineState, ErrorState} from '../models/States'
import React from 'react'

const trendingDevelopersUrl = 'https://github.com/trending/developers'

export default function Widget (props) {
  const {profiles, profileStates, onReloadAll, onReload, state, onTryAgain} = props

  return (
    <div className='widget-panel panel panel-default'>
      <div className='panel-body'>
        {header()}
        {rows()}
      </div>
      {footer()}
    </div>
  )

  function header () {
    return (
      <h4 className='widget-heading'>
        Who to follow
        <span className='widget-refresh'>
          &nbsp;&middot;&nbsp;
          <a onClick={onReloadAll}>Refresh</a>
          &nbsp;&middot;&nbsp;
          <a href={trendingDevelopersUrl}>View all</a>
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

  // TODO: Offer better help
  function footer () {
    if (state === GithubThrottledState) {
      return <div className='panel-footer widget-error'>You are being throttled by GitHub &middot; <a href='https://developer.github.com/v3/#rate-limiting'>find out more</a></div>
    } else if (state === PossiblyOfflineState) {
      return <div className='panel-footer widget-error'>You might be offline &middot; <a href='#' onClick={onTryAgain}>try again</a></div>
    } else if (state === ErrorState) {
      return <div className='panel-footer widget-error'>Failed to load suggestions &middot; <a href='#' onClick={onTryAgain}>try again</a></div>
    }
    return []
  }
}
