"use client"
import React, {useState, useEffect} from 'react'
import ProductCard from '../../Elements/ProductCard/ProductCard'
import CTA from '../../Elements/CTA/CTA'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import axios from 'axios'

export default function OurCollection() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProduct = async ()  =>{
        const res = await axios.get("http://localhost:4050/api/product")
        setProducts(res.data)
    }
    loadProduct();
  }, []);
  console.log(products.slice(0,6))
  const price = (number) =>{
    const prx = number / 100
    return prx.toFixed(2)
  }
  return (
    <section className='container-our-collection'>
    <TitleSection title={"Notre collection"}>
      Une collection capsule exclusive limitée à 50 pièces. Chaque abaya est numérotée et 
      accompagnée d'un certificat d'authenticité signé par notre directrice artistique.
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
