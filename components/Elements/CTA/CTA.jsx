import React from 'react'

export default function CTA({str, href}) {
  return (
    <a href={href} className='CTA'>
        {str}
    </a>
  )
}
