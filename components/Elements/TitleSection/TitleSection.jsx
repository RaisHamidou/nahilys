import React from 'react'

export default function TitleSection({title, children}) {
  return (
    <div className="title-section">
      <h1 className='title'>{title}</h1>
      <div className='title-description'>{children}</div>
    </div>
  )
}
