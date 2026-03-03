import React from 'react'
import Header from '../../../components/Layout/Header/Header'
import Footer from '../../../components/Layout/Footer/Footer'
import ContactPage from '../../../components/Template/ContactPage/ContactPage'
export const metadata = {
  title: "Contact",
  description: "Née d’une histoire personnelle, notre marque de prêt-à-porter est avant tout une histoire d’amour, de transmission et de créativité.Son nom, issu de la fusion des prénoms de mes deux enfants, symbolise l’union, l’équilibre et l’inspiration qui guident chacune de nos créations.",
}; 
export default function page() {
  return (
    <div className='contact'>
        <Header/>
        <ContactPage/>
        <Footer/>
    </div>
  )
}
