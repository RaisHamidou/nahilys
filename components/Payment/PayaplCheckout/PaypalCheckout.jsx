import React, { useContext, useEffect, useState } from "react";
import {
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useRouter } from "next/navigation";
import { MyContext } from "../../../context/ContextProvider";
import { URL } from "../../Config/Config";

const PaypalCheckout = ({
  email,
  name,
  surname,
  address,
  city,
  codePostal,
  country,
  orderId
  
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart, price, } = useContext(MyContext);

  const route = useRouter();
  const deliveryPrice = 640
  const priceToPay = total+ deliveryPrice
const genererNumeroCommande = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const aleatoire = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `ORD-${timestamp}-${aleatoire}`;
  };

    const DateOfToday = () => {
  const date = new Date();
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short", // "short" donne "févr.", on va juste enlever le point si nécessaire
    year: "numeric",
  }).replace('.', ''); // Enlève le point après le mois abrégé
};
  const handleExpressCheckout = async (event) => {
    if (!stripe || !elements) {
      return;
    }

     const numCommandeUnique = genererNumeroCommande();
 const today = DateOfToday()
    
    const response = await fetch(`${URL}/api/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
            orderId:numCommandeUnique,
            email: email,
            name: name,
            surname:surname,  
            productIds: currentCart.map((product) => product.id),
            amount:priceToPay, 
            total:priceToPay,
            address:address, 
            city:city, 
            codePostal:codePostal, 
            country:country,
            products:currentCart,
            date:today
            
      }),
    });

    const { clientSecret } = await response.json();
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        clientSecret,
        elements,
       amount: priceToPay,
        currency: "eur",
        payment_method: {},
        confirmParams: {
          /* return_url: `${URL}/thank-you`, */
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Erreur lors de la confirmation :", error.message);
        alert("Une erreur est survenue lors du paiement.");
      } else if (paymentIntent?.status === "succeeded") {
        route.push("/thank-you");

        clearCart();
        await fetch(`${URL}/api/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId:numCommandeUnique,
            paymentIntentId: paymentIntent.id,
            email: email,
            name: name,
            surname:surname,  
            bookIds: currentCart.map((book) => book.id),
           amount:priceToPay,
            currentTotal: priceToPay,
            total:priceToPay,
            address:address, 
            city:city, 
            codePostal:codePostal, 
            country:country,
            products:currentCart,
             date:today
           
          }),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la confirmation du paiement :", error);
    }
  };


  return (
    <>
      <ExpressCheckoutElement
        onConfirm={handleExpressCheckout}
        options={{
          amount: priceToPay,
          currency: "eur",
          wallets: { paypal: "auto" },
          appearance: {
            theme: "stripe",
          },
        }}
      />
    </>
  );
};

export default PaypalCheckout;