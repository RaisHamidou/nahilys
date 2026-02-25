"use client"
import React, { useContext } from 'react'

import { MyContext } from '../../../context/ContextProvider'

export default function CartCard({img, name, pr, size, color, quantity, remove}) {
    const {price} =useContext(MyContext)
  return (
    <div className='card-cart'>
    <div className="card-cart-container">
 <div className="Card-cart-img">
        <img src={img} alt="" />
    </div>
    <div className="card-cart-description">
<div className="cart-card-title">
            {name}
        </div>
        <div className="description">
        <p><span>Taille : </span> {size}</p>
        <p><span>Couleur : </span> {color}</p>
        <p><span>Quantité : </span> {quantity}</p>
        </div>
        <div className="card-cart-price">
            <p>{price(pr)} €</p>
            <button onClick={remove} className="remove-btn">
                supprimer
            </button>
        </div>
        
    </div> 
    </div>

    </div>
  )
}
