import React from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import ProductCard from '../../Elements/ProductCard/ProductCard'
import img from "../../../assets/images/abya/1.jpg"

import img1 from "../../../assets/images/abya/2.jpg"
import img2 from "../../../assets/images/abya/3.jpg" 
export default function OurSelection() {
  return (
    <section className='OurSelection'>
    <div className="our-selection-title">
        <TitleSection title="L'Apparat des Grands Jours">
          Préparez vous pour Aïd Al-Fitr avec notre sélection
        </TitleSection>
    </div>
    <div className="container-selections">
        <ProductCard img={img.src}/>
          <ProductCard img={img1.src}/>
          <ProductCard img={img2.src}/>
          
    </div>
    </section>
  )
}
