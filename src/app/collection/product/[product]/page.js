import React from 'react'
import Header from '../../../../../components/Layout/Header/Header'
import Footer from '../../../../../components/Layout/Footer/Footer'
import axios from 'axios'
import PageDetails from '../../../../../components/Template/DetailsPage/DetailsPage'

export default async function page({params}) {
  const {product} = await params

   const {data:posts} = await axios.get(`http://localhost:4050/api/product/${product}`,{
    Headers:{
      Accept:"application/json"
    }
  }) 

const prod = posts[0]

  return (

    <div>
    <Header/>
    <PageDetails data={prod}/>
    <Footer/>
    </div>
  )
}

 