import React from 'react'
import Header from '../../../components/Layout/Header/Header'
import Footer from '../../../components/Layout/Footer/Footer'
import AboutPage from '../../../components/Template/AboutPage/AboutPage'

export default function page() {
  return (
    <div className='a-propos'>
        <Header/>
        <AboutPage/>
        <Footer/>
    </div>
  )
}
