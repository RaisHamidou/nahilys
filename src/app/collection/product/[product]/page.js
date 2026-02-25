import React from 'react'
import Header from '../../../../../components/Layout/Header/Header'
import Footer from '../../../../../components/Layout/Footer/Footer'
import axios from 'axios'
import PageDetails from '../../../../../components/Template/DetailsPage/DetailsPage'
import { URL } from '../../../../../components/Config/Config'

export default async function page({params}) {
  const {product} = await params

   const {data:posts} = await axios.get(`${URL}/api/product/${product}`,{
    Headers:{
      Accept:"application/json"
    }
  }) 

const products = posts[0]

  return (

    <div>
    <Header/>
    <PageDetails data={products}/>
    <Footer/>
    </div>
  )
}

 