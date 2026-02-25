"use client";
import React, { useContext, useState, useEffect } from "react";
import CartCTA from "../../Elements/CTA/CartCTA";
import OtherProduct from "../../Layout/OtherProduct/OtherProduct";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { MyContext } from "../../../context/ContextProvider";
export default function PageDetails({ data }) {


  const uniqueSizes = [...new Set(data.variants.map((v) => v.attributes.size))];

  const uniqueColors = Array.from(
    new Map(
      data.variants.map(v=>[
        v.attributes.color,
        {
          name:v.attributes.color,
          color:v.attributes.code_color,
        }
      ])
    ).values()
  )
  

  const [currentColor, setCurrentColor] = useState(uniqueColors[0].name);
  const [currentSize, setCurrentSize] = useState(uniqueSizes[0]);
  let [quantity, setQuantity]= useState(0)
  const { price, addToCart } = useContext(MyContext);

  

  return (
    <div className="page-details">
      <div className="container-page-details">
        <div className="img-detail-product">
          <div className="img-pr">
             {
            data.gallery.map((image, index) =>{
              return(
              
                <img key={index} src={image} alt={data.name} />
              )
            })
          }
          </div>
         
        </div>
        <div className="details">
          <div className="container-details">
          <div className="detail-title">
            <h1>{data.name}</h1>
          </div>
          <div className="details-price">
            <h2>{`${price(data.base_price)} €`}</h2>
          </div>
          <div className="config">
            <h2>Couleur</h2>
            <div className="container-squares">
            {uniqueColors.map((color,index)=>{
              return(
                <div onClick={()=> setCurrentColor(color.name)} 
                key={index} style={{ background: color.color }} 
                className={currentColor == color.name 
                ?"square color active"
                :"square color"} />
              )
            })}
              
            </div>
          </div>
          <div className="config">
            <h2>Taille</h2>
            <div className="container-squares">
              {uniqueSizes.map((size, index) => {
                return (
                  <div onClick={()=> setCurrentSize(size)} 
                  key={index} 
                  className={size === currentSize 
                  ? "square active"
                  :"square"}>
                    {size}
                  </div>
                );
              })}
            </div>
            <div className="no-sticky-cart">
             <CartCTA Click={()=>addToCart(data, currentColor, currentSize)}  str={"Ajouter au panier"} />
          </div>
          </div>
          
          <div className="details-description">
          
            <h2 className="details-description-title">Description</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {data.description}
            </ReactMarkdown>
            
          </div>
          
        </div>
        </div>
        
        <div className="sticky-cart">
          <div className="sticky-details">
            <h3>{data.name}</h3>
            <h4>{price(data.base_price)} €</h4>
          </div>
          
          <CartCTA Click={()=>alert("test")}  str={"Ajouter au panier"} />
          
          
        </div>
      </div>
      <div className="Other-product">
        <OtherProduct />
      </div>
    </div>
  );
}
