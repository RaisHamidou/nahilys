"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import CheckoutForm from "../../Payment/Checkout/Checkout";
import { MyContext } from "../../../context/ContextProvider";
import { URL } from "../../Config/Config";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentComponents = () => {
  const { total, priceToPay } = useContext(MyContext);
  const [clientSecret, setClientSecret] = useState(null);

const amount = total > 0 && priceToPay > 0 ? priceToPay : total;


  useEffect(() => {
    if (!amount || amount < 1) return;

    fetch(`${URL}/api/create-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(console.error);
  }, [amount]);

  if (!clientSecret) return <p>Chargement du paiement…</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {/* ✅ On passe clientSecret et stripePromise en props */}
      <CheckoutForm clientSecret={clientSecret} stripePromise={stripePromise} />
    </Elements>
  );
};

export default PaymentComponents;
