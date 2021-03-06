import {LoadingState, ErrorState} from '../models/States'
import React from 'react'

export default function ProfileRow (props) {
  const {onReload, profile, state} = props
  const {avatarUrl, name, username, profileUrl} = profile
  const ephemeral = (state === LoadingState || state === ErrorState)
  const rowClassName = 'widget-row media' + (ephemeral ? ' ephemeral' : '')

  return (
    <div className={rowClassName} title={name + ' - ' + username}>
      <div className='media-left'>
        <a href={profileUrl}>
          <img className='media-object widget-avatar' src={avatarUrl} width='50' height='50' />
        </a>
      </div>
      <div className='media-body'>
        <h5 className='media-heading widget-names'>
          <span className='widget-realname'>{name}</span>
          &nbsp;
          <span className='widget-username'>{username}</span>
        </h5>
        <a className='btn btn-sm btn-default' href={profileUrl} role='button'>
          <span className='glyphicon glyphicon-user' />
          &nbsp;
          Profile
        </a>
      </div>
      <div className='media-right'>
        <button onClick={onReload} className='close widget-close'>
          &times;
        </button>
      </div>
    </div>
  )
}
