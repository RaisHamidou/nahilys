import React from 'react'
import Header from '../../../components/Layout/Header/Header'
import Footer from '../../../components/Layout/Footer/Footer'
import { FaCheck } from "react-icons/fa6";

export default function page() {
  return (
    <div className='ThankYouPage'>
        <Header/>
        <div className="thanks-container">
            <div className="cercle"><FaCheck className='check'/></div>
            <p>Merci pour votre <span>confiance</span></p>
            <p className='confirmed-ord'>Commande confirmée</p>
        </div>
        <Footer/>
    </div>
  )
}
