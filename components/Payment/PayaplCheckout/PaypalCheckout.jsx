import React, { useContext, useEffect, useState } from "react";
import {
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useRouter } from "next/navigation";
import { MyContext } from "../../../context/ContextProvider";
import { URL } from "../../Config/Config";
import axios from "axios";

const PaypalCheckout = ({
  email,
  name,
  surname,
  address,
  city,
  codePostal,
  country,
  orderId,
  selectedServicePoint
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart, priceToPay, deliveryPrice, price} = useContext(MyContext);

  const route = useRouter();

console.log(deliveryPrice)
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
            /* orderId:numCommandeUnique,
            email: email,
            name: name,
            surname:surname,  
            productIds: currentCart.map((product) => product.id),
            amount:priceToPay, 
            total:total,
            address:address, 
            city:city, 
            codePostal:codePostal, 
            country:country,
            products:currentCart,
            date:today */


            orderId: numCommandeUnique,
            //paymentIntentId: paymentIntent.id,
            email: email,
            name: name,
            surname: surname,
            product: currentCart.map((product) => product.id),
            amount: priceToPay,
            currentTotal: priceToPay,
            total: priceToPay,
            delivery:deliveryPrice,
            address: address,
            city: city,
            codePostal: codePostal,
            country: country,
            products: currentCart,
            service_point_id: selectedServicePoint?.id, // AJOUT : Envoi de l'ID du point relais
            date:today,
            
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
           return_url: `${URL}/thank-you`, 
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Erreur lors de la confirmation :", error.message);
        alert("Une erreur est survenue lors du paiement.");
      } else if (paymentIntent?.status === "succeeded") {
        
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
           total: priceToPay,
            delivery:deliveryPrice,
            address:address, 
            city:city, 
            codePostal:codePostal, 
            country:country,
            products:currentCart,
             date:today
           
          }),
        });
        await axios.post(`${URL}/api/shipments`, {
           order_number: numCommandeUnique,
  name: `${surname} ${name}`,
  address: address,
  city: city,
  postal_code: codePostal,
  country: country,
  email: email,
  // On transforme les items pour ajouter le poids et la valeur par défaut
  parcel_items: currentCart.map((item) => ({
    description: item.name,
    quantity: item.quantity,
    weight: "0.2", // Sendcloud exige un poids (ex: 0.5kg)
    value: price(item.price /item.quantity)  || price(item.price /item.quantity), // Sendcloud exige une valeur monétaire
  })),
  service_point_id: selectedServicePoint?.id 
});
        route.push("/thank-you");
        clearCart();
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