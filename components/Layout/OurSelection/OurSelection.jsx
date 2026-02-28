"use client"
import React, { useContext, useState, useEffect } from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import ProductCard from '../../Elements/ProductCard/ProductCard'
import img from "../../../assets/images/abya/1.jpg"

import img1 from "../../../assets/images/abya/2.jpg"
import img2 from "../../../assets/images/abya/3.jpg" 
import { URL } from '../../Config/Config'
import { MyContext } from '../../../context/ContextProvider'
import axios from 'axios'
export default function OurSelection() {
  const {price} = useContext(MyContext)
  const [products, setProducts] = useState([])
  
// abaya_kamila, abaya_inaya, abaya_layla
  useEffect(() => {
    const loadProduct = async ()  =>{
        const res = await axios.get(`${URL}/api/product`)
        setProducts(res.data)
    }
    loadProduct();
  }, []);
  const featuredIds = ["abaya_kamila", "abaya_inaya", "abaya_layla"];

const featuredProducts = products.filter(product => 
  featuredIds.includes(product.id)
);

  return (
    <section className='OurSelection'>
    <div className="our-selection-title">
        <TitleSection title="Élégance pour chaque occasion">
          Préparez vous pour Aïd Al-Fitr avec notre sélection
        </TitleSection>
    </div>
    <div className="container-selections">
     {
                        featuredProducts.map((product) =>{
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

        {/* <ProductCard img={img.src}/>
          <ProductCard img={img1.src}/>
          <ProductCard img={img2.src}/> */}
          
    </div>
    </section>
  )
}
