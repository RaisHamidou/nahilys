import React from 'react'
import img from "../../../assets/images/abya/pexels-cottonbro-9881073.jpg"
import TitleSection from '../../Elements/TitleSection/TitleSection'

export default function Hero() {
  return (
    <section className='hero'>
    <div className="hero-img">
        <img src={img.src} alt="" />
    </div>
    <div className="overlay">
    <div className="hero-title">
     <TitleSection title={"L'Élégance en Héritage"}>
        Entre tradition et épure, découvrez des créations pensées pour la femme contemporaine.
     </TitleSection>
     <div className="CTA-hero">Explorer la Collection</div>
    </div>
    </div>
    </section>
  )
}
