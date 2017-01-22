import {LoadingState} from '../models/States'
import React from 'react'

export default function ProfileRow (props) {
  const {onReload, profile, state} = props
  const {avatarUrl, name, username, profileUrl} = profile
  const reloading = (state === LoadingState)
  const rowClassName = 'suggestions-row media' + (reloading ? ' reloading' : '')

  return (
    <div className={rowClassName} title={name + ' - ' + username}>
      <div className='media-left'>
        <a href={profileUrl}>
          <img className='media-object suggestions-avatar' src={avatarUrl} width='50' height='50' />
        </a>
      </div>
      <div className='media-body'>
        <h5 className='media-heading suggestions-names'>
          <span className='suggestions-realname'>{name}</span>
          &nbsp;
          <span className='suggestions-username'>{username}</span>
        </h5>
        <a className='btn btn-sm btn-default' href={profileUrl} role='button'>
          <span className='glyphicon glyphicon-user' />
          &nbsp;
          Profile
        </a>
      </div>
      <div className='media-right'>
        <button onClick={onReload} className='close suggestions-close'>
          &times;
        </button>
      </div>
    </div>
  )
}
