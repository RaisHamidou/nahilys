
"use client"
import React, { useEffect, useState, useContext } from 'react'
import TitleSection from '../../Elements/TitleSection/TitleSection'
import ProductCard from '../../Elements/ProductCard/ProductCard'
import img from "../../../assets/images/abya/1.jpg"

import img1 from "../../../assets/images/abya/2.jpg"
import img2 from "../../../assets/images/abya/3.jpg" 
import axios from 'axios'
import { MyContext } from '../../../context/ContextProvider'
import { URL } from '../../Config/Config'
export default function OtherProduct({id}) {
 const {price} = useContext(MyContext)
  const [products, setProducts] = useState([])
  

  useEffect(() => {
    const loadProduct = async ()  =>{
        const res = await axios.get(`${URL}/api/product`)
        setProducts(res.data)
    }
    loadProduct();
  }, []);
  const randomProduct = products.filter((item)=> item.id != id).sort(() => 0.5 - Math.random()).slice(0, 4)
  
  return (
    <section className='OtherProduct'>
    <div className="other-product-title">
        <TitleSection title="Similaire"/>
    </div>
    <div className="container-other-product">
    
       {
                    randomProduct.map((product) =>{
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
          <ProductCard img={img2.src}/>
          <ProductCard img={img2.src}/> */}
    </div>
    </section>
  )
}
