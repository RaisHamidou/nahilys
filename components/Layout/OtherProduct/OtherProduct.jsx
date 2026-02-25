import React from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import ProductCard from '../../Elements/ProductCard/ProductCard'
import img from "../../../assets/images/abya/1.jpg"

import img1 from "../../../assets/images/abya/2.jpg"
import img2 from "../../../assets/images/abya/3.jpg" 
export default function OtherProduct() {
  return (
    <section className='OtherProduct'>
    <div className="other-product-title">
        <TitleSection title="Similaire"/>
    </div>
    <div className="container-other-product">
        <ProductCard img={img.src}/>
          <ProductCard img={img1.src}/>
          <ProductCard img={img2.src}/>
          <ProductCard img={img2.src}/>
    </div>
    </section>
  )
}
