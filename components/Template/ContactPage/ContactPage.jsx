"use client"
import React, { useState, useEffect } from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import axios from 'axios'
import { URL } from '../../Config/Config'

export default function ContactPage() {
  const [status, setStatus] = useState("Soumettre votre demande")
  const [message, setMessage] = useState()

const handleSubmit = async (e)=>{
e.preventDefalut();
setStatus("Un instant...")
const {name, email, message} = e.target.elements;
const details = {
  name : name.value,
  email: email.value,
  message: message.value,
}
const response = await axios.post(`${URL}/api/contact`,details,{
  Headers:{
    'Accept':"application/json;charset=utf-8",
    'Content-Type':"application/json"
  },
})
setStatus("Demande soumise")
e.target.reset();
setTimeout(() => {
  setStatus("Soumettre votre demande")
}, 3000);
}
  return (
    <div className='ContactPage'>
    <TitleSection title={"Contactez-nous"}>
      Nous sommes ravis de vous accompagner dans l'univers de <strong>Nahilys</strong>. 
      Écrivez-nous, nous vous répondrons avec le plus grand soin.
    </TitleSection>
    <form onSubmit={handleSubmit} className="Container-contact-page">
      <input type="text" name='name'  placeholder='Nom complet' required/>
      <input type="email" name='email' placeholder='Adresse email' required />
      <textarea name="message" placeholder='Votre message' id="" required></textarea>
      <button className='submit'>{status}</button>
    </form>
    </div>
  )
}
