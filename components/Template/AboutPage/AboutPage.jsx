import React from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import img from "../../../assets/images/about/636692079_930814542746995_7534537002944087433_n.jpg"
export default function AboutPage() {
  return (
    <div className='About-page'>
    <TitleSection title={"Qui sommes nous ?"}/>
    <div className="container-about">
    <div className="content-about">
          <div className="about-img">
            <img src={img.src} alt="" />
          </div>
          <div className="about-first-p">
          
            <p><span>Née d’une histoire personnelle, notre marque de prêt-à-porter 
            est avant tout une histoire d’amour, de transmission et de créativité. </span></p>

            <p> Son nom, issu de la fusion des prénoms de mes deux enfants, 
            symbolise l’union, l’équilibre et l’inspiration qui guident 
            chacune de nos créations.</p>

            <p>Nous concevons des pièces pensées pour le quotidien comme 
            pour les moments d’exception, alliant style, confort 
            et authenticité. Chaque collection reflète notre vision d’une mode moderne, 
            intemporelle et accessible, où chaque détail a du sens.</p>
            <p>Plus qu’un simple vêtement, nous souhaitons offrir une identité, 
            une manière de s’exprimer librement et avec élégance. 
            Notre engagement est de proposer des créations qui traversent le temps, 
            tout en restant fidèles à nos valeurs familiales et humaines.</p>
            
            <p>Venez également nous découvrir sur nos réseaux sociaux 
            <a href="https://www.instagram.com/naahilys">Instagram</a>, 
            <a href="https://www.tiktok.com/@naahilys'">Tik Tok</a> et 
            <a href="https://www.snapchat.com/@naahilys">Snapchat</a>.</p>
          </div>

        </div>

    </div>
        
        
    </div>
  )
}
