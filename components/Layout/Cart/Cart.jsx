import React, { useState, useContext } from "react";
import { BsHandbag } from "react-icons/bs";
import CartCard from "../../Elements/CartCard/CartCard";
import { FaXmark } from "react-icons/fa6";
import CartCTA from "../../Elements/CTA/CartCTA";
import { MyContext } from "../../../context/ContextProvider";

export default function Cart() {
  const { isCartOpen, setIsCartOpen, currentCart, total, price, clearCart, remove } =
    useContext(MyContext);

  const cartValue = isCartOpen ? "translateX(0%)" : "translateX(110%)";
  return (
    <>
      <div onClick={() => { setIsCartOpen(!isCartOpen)}} className="cart">
        <BsHandbag className="cart-icon" />
        <div className="ellipsis">
          <p>{currentCart.length}</p>
        </div>
      </div>
      <div onClick={()=> setIsCartOpen(!isCartOpen)} className={`overlay-cart ${isCartOpen? "show-overlay-cart":""}`}/>
      <div style={{ transform: cartValue }} className="cart-container">
        <div onClick={() => setIsCartOpen(!isCartOpen)} className="closeCart">
          <FaXmark />
        </div>
        <div className="title-cart">
          <p>Votre panier ({currentCart.length})</p>
        </div>
        {currentCart.map(item =>(
          <CartCard 
          key={item.id} 
          img={item.img} 
          name={item.name} 
          pr={item.price} 
          size={item.size} 
          color={item.color}
            quantity={item.quantity}
            remove={()=> remove(item.id)}
          />
        
        ))}
     
        <div className="total">
          <p>Total : </p>
          <p>{price(total)}€</p>
        </div>
        <a href="/checkout">
        <CartCTA  str={"Confirmer la commande"} />
        </a>
        
      </div>
    </>
  );
}
