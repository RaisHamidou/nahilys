import Link from 'next/link'
import React from 'react'


export default function ProductCard({slug, img,name, description, price}) {
  return (
    <a href={`collection/product/${slug}`} className='container-card-product'>
      <div className="product-img">
        <img src={img} alt={name} />
      </div>
      <div className="product-description-container">
        <p className='product-name'>{name}</p>
        <p className='product-description'>{description}</p>
        <p className='product-price'>{price} €</p>
      </div>
   
    </a>
   
  )
}
