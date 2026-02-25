import React from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'

export default function ContactPage() {
  return (
    <div className='ContactPage'>
    <TitleSection title={"Contactez-nous"}>
      Nous sommes ravis de vous accompagner dans l'univers de <strong>Nahilys</strong>. 
      Écrivez-nous, nous vous répondrons avec le plus grand soin.
    </TitleSection>
    <div className="Container-contact-page">
      <input type="text" name='name'  placeholder='Nom complet'/>
      <input type="email" name='email' placeholder='Adresse email' />
      <textarea name="message" placeholder='Votre message' id=""></textarea>
    </div>
    </div>
  )
}
