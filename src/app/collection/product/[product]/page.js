import React from 'react'
import Header from '../../../../../components/Layout/Header/Header'
import Footer from '../../../../../components/Layout/Footer/Footer'
import axios from 'axios'
import PageDetails from '../../../../../components/Template/DetailsPage/DetailsPage'
import { URL } from '../../../../../components/Config/Config'

export async function generateMetadata  ({params}){
  const {product} = await params;

  const {data: posts} = await axios.get(`${URL}/api/product/${product}`,
    {headers:{
      Accept:"application/json"
    }}
  )
  return {
    title:posts[0]?.seo_title,
    description: posts[0].metadata?.seo_description,
  }
}



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

 