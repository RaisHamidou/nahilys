"use client";

import React, { useEffect, useState, createContext } from "react";

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentCart, setCurrentCart] = useState([]);

   const total = currentCart.reduce((acc, item) => acc + Number(item.price), 0);

  const [refresh, setRefresh] = useState(false);
  const price = (number) => {
    const prx = number / 100;
    return prx.toFixed(2);
  };
/* setCart((prevCart) => {
    // Est-ce que ce produit (cette variante) est déjà dans le panier ?
    const isAlreadyInCart = prevCart.find((item) => item.cartId === variantId);

    if (isAlreadyInCart) {
      // Si oui, on augmente seulement la quantité
      return prevCart.map((item) =>
        item.cartId === variantId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } */
 const addToCart = (product, color, size) => {
  const variantId = `${product.id}-${color}-${size}`;

  const newCommande = {
    id: variantId,
    name: product.name,
    color: color,
    size: size,
    price: product.base_price,
    img: product.image,
    quantity: 1,
  };

  setCurrentCart((prevCart) => {
    const existingItem = prevCart.find(item => item.id === variantId);

    let updatedCart;

    if (existingItem) {
      updatedCart = prevCart.map(item =>
        item.id === variantId
          ? { ...item, quantity: item.quantity + 1, price: item.price * item.quantity }
          : item
      );
    } else {
      updatedCart = [...prevCart, newCommande];
    }
    setRefresh(!refresh)
    localStorage.setItem("product", JSON.stringify(updatedCart));
    return updatedCart;
  });
};


  useEffect(() => {
    const stored = localStorage.getItem("product");
    if (stored) {
      try {
        setCurrentCart(JSON.parse(stored));
      } catch (e) {
        console.error("Erreur lecture localStorage");
      }
    }
  }, []);

  const clearCart = () => {
        setCurrentCart([]); // Vider le panier dans l'état
        localStorage.removeItem("product"); // Supprimer les données du panier du stockage local
        setRefresh(!refresh); // Actualiser si nécessaire
      };
 const remove = (id) => {
    const updatedProducts = currentCart.filter((item) => item.id !== id);
    setCurrentCart(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    setRefresh(!refresh);
  };
  console.log(currentCart);

  //localStorage.clear

  return (
    <MyContext.Provider
      value={{ isCartOpen, setIsCartOpen, price, addToCart, currentCart, total, clearCart,remove }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default ContextProvider;
