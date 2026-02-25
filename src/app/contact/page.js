import React from 'react'
import Header from '../../../components/Layout/Header/Header'
import Footer from '../../../components/Layout/Footer/Footer'
import ContactPage from '../../../components/Template/ContactPage/ContactPage'

export default function page() {
  return (
    <div className='contact'>
        <Header/>
        <ContactPage/>
        <Footer/>
    </div>
  )
}
