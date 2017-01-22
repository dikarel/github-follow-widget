import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import React from 'react'

export default function ProfileRow (props) {
  const {onReload, profile} = props
  const {avatarUrl, realName, username, profileUrl, reloading} = profile
  const rowClassName = 'suggestions-row media' + (reloading ? ' reloading' : '')

  return (
    <ReactCSSTransitionGroup
      transitionName='example'
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <div className={rowClassName}>
        <div className='media-left'>
          <a href={profileUrl}>
            <img className='media-object suggestions-avatar' src={avatarUrl} width='50' height='50' />
          </a>
        </div>
        <div className='media-body'>
          <h5 className='media-heading'>
            <span className='suggestions-realname'>{realName}</span>
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
    </ReactCSSTransitionGroup>
  )
}
