import React from 'react'

export default function PlaceholderRow () {
  return (
    <div className='widget-row media'>
      <div className='media-left'>
        <div className='widget-avatar placeholder' />
      </div>
      <div className='media-body'>
        <h5 className='media-heading'>
          <span className='widget-realname placeholder' />
            &nbsp;
          <span className='widget-username placeholder' />
        </h5>
        <div className='widget-profile placeholder' />
      </div>
    </div>
  )
}
