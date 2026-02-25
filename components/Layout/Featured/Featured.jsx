import React from 'react'
import CTA from '../../Elements/CTA/CTA'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import img from "../../../assets/images/abya/pexels-qalanjos-fashions-online-abaya-store-673551486-29188566.jpg"

export default function Featured() {
  return (
    <section className='featured'>
    <CTA href={"#"} str={"Voir en détaille"}/>
    <div className="container-img-featured">
        <img src={img.src} alt="" />
    </div>
    
    <div className="container-description-featured">
        <TitleSection title={"En vedette"}>
          Une collection capsule exclusive limitée à 50 pièces. 
          Chaque abaya est numérotée et accompagnée d'un certificat 
          d'authenticité signé par notre directrice artistique.
        </TitleSection>
    <CTA href={"#"} str={"Voir en détaille"}/>
    </div>
    </section>
  )
}
