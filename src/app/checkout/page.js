import React from 'react'
import PaymentPage from '../../../components/Template/PaymentPage/PaymentPage'
import Header from '../../../components/Layout/Header/Header'
import Footer from '../../../components/Layout/Footer/Footer'

export default function page() {
  return (
    <div>
    <Header/>
        <PaymentPage/>
        <Footer/>
    </div>
  )
}
