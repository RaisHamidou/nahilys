"use client"
import React, {useState, useEffect, useContext} from 'react'
import ProductCard from '../../Elements/ProductCard/ProductCard'
import CTA from '../../Elements/CTA/CTA'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import axios from 'axios'
import { URL } from '../../Config/Config'
import { MyContext } from '../../../context/ContextProvider'

export default function OurCollection() {
  const [products, setProducts] = useState([])
  const {price} = useContext(MyContext)

  useEffect(() => {
    const loadProduct = async ()  =>{
        const res = await axios.get(`${URL}/api/product`)
        setProducts(res.data)
    }
    loadProduct();
  }, []);
  
  return (
    <section className='container-our-collection'>
    <TitleSection title={"Notre collection"}>
      Des abayas élégantes et modernes, conçues avec des tissus fluides et confortables. Simples, raffinées et faciles à porter au quotidien comme pour vos occasions spéciales.
    </TitleSection>
    <div className="container-cards">
    {
      products.slice(0,6).map((product) =>{
        return(
          <ProductCard 
          key={product.id} 
          slug={product.slug} 
          name={product.name} 
          img={product.image} 
          description={product.sub_description} 
          price={price(product.base_price)}/>
        )
        
      })
    }
    </div>
       <CTA href={"/collection"} str={"Voir toute la collection"}/>
    </section>
  )
}
