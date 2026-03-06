"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import CheckoutForm from "../../Payment/Checkout/Checkout";
import { MyContext } from "../../../context/ContextProvider";
import { URL } from "../../Config/Config";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentComponents = () => {
  const { currentCart, deliveryPrice } = useContext(MyContext);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!currentCart || currentCart.length === 0) return;
    if (clientSecret) return;

    // ✅ items calculé DANS le useEffect
    const items = currentCart.map(item => ({
      id: item.firestoreId,
      quantity: item.quantity,
    }));

    console.log("Items envoyés:", items);
    console.log("Delivery:", deliveryPrice);

    fetch(`${URL}/api/create-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        delivery: deliveryPrice || 0,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Réponse:", data);
        setClientSecret(data.clientSecret);
      })
      .catch(console.error);

  }, [currentCart]); // ✅ se relance quand le cart est chargé

  if (!clientSecret) return <p>Chargement du paiement…</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} stripePromise={stripePromise} />
    </Elements>
  );
};


export default PaymentComponents;