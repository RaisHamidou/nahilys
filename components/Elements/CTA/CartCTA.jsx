import React from 'react'

export default function CartCTA({str, Click}) {
  return (
    <div onClick={Click} className="cart-cta">
          <p>{str}</p>
    </div>
  )
}
