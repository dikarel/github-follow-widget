import React from 'react'

export default function PlaceholderRow () {
  return (
    <div className='suggestions-row media'>
      <div className='media-left'>
        <div className='suggestions-avatar placeholder' />
      </div>
      <div className='media-body'>
        <h5 className='media-heading'>
          <span className='suggestions-realname placeholder' />
            &nbsp;
          <span className='suggestions-username placeholder' />
        </h5>
        <div className='suggestions-profile placeholder' />
      </div>
    </div>
  )
}
