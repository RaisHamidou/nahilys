'use client'
import React, { useState, useEffect, useContext } from "react";
import TitleSection from "../../Elements/TitleSection/TitleSection";
import ProductCard from "../../Elements/ProductCard/ProductCard";
import { MyContext } from "../../../context/ContextProvider";
import axios from "axios";

export default function CollectionPage() {
  const {price} = useContext(MyContext)
  const [products, setProducts] = useState([])
  

  useEffect(() => {
    const loadProduct = async ()  =>{
        const res = await axios.get("http://localhost:4050/api/product")
        setProducts(res.data)
    }
    loadProduct();
  }, []);
  return (
    <div className="collection-page">
      <div className="collection-title">
        <TitleSection title="Notre collection">
          Une collection <strong>exclusive</strong>. <br />
          Limitée à 50 pièces numérotées.
        </TitleSection>
      </div>
      <div className="container-collection">
        {
              products.map((product) =>{
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
    </div>
  );
}
