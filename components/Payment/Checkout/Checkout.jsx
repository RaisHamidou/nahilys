"use client";
import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaCalendarDays, FaClock } from "react-icons/fa6";

import axios from "axios";
import Script from 'next/script'; // <--- AJOUT : Pour charger le widget Sendcloud

//import loader from "@/assets/gif/loader.gif";
import { useRouter } from "next/navigation";
//import ThankYou from "../ThankYou/ThankYou";
import PaypalCheckout from "../../Payment/PayaplCheckout/PaypalCheckout";

import { countryCodes } from "../../CountryCode/CountryCode";
import { MyContext } from "../../../context/ContextProvider";
import CartCard from "../../Elements/CartCard/CartCard";
import TitleSection from "../../Elements/TitleSection/TitleSection";

// Composant séparé pour le code promo avec gestion d'état local
const PromoCodeSection = ({ onPromoApplied }) => {
  const { promo, isPromoValid } = useContext(MyContext);
  const [isApplying, setIsApplying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promoCode = e.target.promoInput.value.trim();

    if (!promoCode) return;

    setIsApplying(true);

    try {
      // Désactiver Stripe pendant l'application du promo
      await onPromoApplied(promoCode);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-promo">
      {promo ? (
        isPromoValid ? (
          <p>Code promo appliqué !</p>
        ) : (
          <p>Votre code promo est expiré ou invalide</p>
        )
      ) : null}

      <div className="container-form-promo">
        <input
          name="promoInput"
          className="input-promo"
          placeholder="Entrez votre code promo"
          disabled={isApplying}
        />
        <button type="submit" disabled={isApplying}>
          {isApplying ? "Application..." : "Validé"}
        </button>
      </div>
    </form>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart, price, setPromo, isPromoValid, remove } =
    useContext(MyContext);

  const [nameValue, setNameValue] = useState();
  const [surnameValue, setSurnameValue] = useState();
  const [emailValue, setEmailValue] = useState(""); // Mis à "" par défaut
  const [adressValue, setAdressValue] = useState();
  const [cityValue, setCityValue] = useState();
  const [countryValue, setCountryValue] = useState();
  const [codePostalValue, setCodePostalValue] = useState();
  const [nameCardValue, setNameCardValue] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState();

  // AJOUT : État pour stocker le point relais sélectionné
  const [selectedServicePoint, setSelectedServicePoint] = useState(null);

  const route = useRouter();

  const [paymentStatus, setPaymentStatus] = useState(`Payer ${price(total)} €`);
  const [cardError, setCardError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [stripeEnabled, setStripeEnabled] = useState(true); // NOUVEAU STATE
  const [formKey, setFormKey] = useState(0);

  // Mettre à jour le paymentStatus quand le prix change
  useEffect(() => {
    setPaymentStatus(`Payer ${price(total)} €`);
  }, [price, total]);

  const handlePromoApplied = async (promoCode) => {
    // DÉSACTIVER Stripe pendant la validation du promo
    setStripeEnabled(false);

    try {
      // Attendre un peu pour s'assurer que Stripe est désactivé
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Appliquer le promo
      setPromo(promoCode);

      // Attendre que le contexte soit mis à jour
      await new Promise((resolve) => setTimeout(resolve, 200));
    } finally {
      // RÉACTIVER Stripe et forcer la recréation des éléments
      setStripeEnabled(true);
      setFormKey((prev) => prev + 1);
    }
  };

  // AJOUT : Fonction pour ouvrir le widget Sendcloud
  const openServicePointPicker = () => {
    if (!codePostalValue || !countryValue) {
      alert("Veuillez saisir un code postal et un pays d'abord.");
      return;
    }
    const options = {
      apiKey: "973ce908-d80e-41a2-aef9-93f7f229c699",
      country: countryValue.toLowerCase(),
      postalCode: codePostalValue,
      language: "fr-fr"
    };
    window.sendcloud.servicePoints.open(options, (p) => {
      setSelectedServicePoint(p);
      setAdressValue(`${p.name} - ${p.street} ${p.house_number}`);
      setCityValue(p.city);
    }, (err) => console.error(err));
  };

 
const ValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmail = (e) => {
    const email = e.target.value;
    setEmailValue(email);
    setIsEmailValid(ValidateEmail(email));
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();

    if (!stripeEnabled) {
      setCardError("Veuillez patienter pendant l'application du code promo");
      return;
    }

    setPaymentStatus("paiement en cours...");
    setCardError(null);

    if (!stripe || !elements) {
      setCardError("Stripe n'est pas initialisé");
      return;
    }

    if (invalidFields.length > 0) {
      setShowAlert(true);
      setPaymentStatus(`Payer ${price(total)} €`);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setCardError("Élément de carte non disponible.");
        setPaymentStatus(`Payer ${price(total)} €`);
        return;
      }


      const response = await fetch(`http://localhost:4050/api/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currentTotal: total,
          total: total,
          name: nameValue,
          surname: surnameValue,
          cardName: nameCardValue,
          email: emailValue,
          address: adressValue,
          city: cityValue,
          codePostal: codePostalValue,
          country: countryValue,
          products: currentCart,
        }),
      });

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: nameCardValue,
              email: emailValue,
              address: {
                line1: adressValue,
                city: cityValue,
                postal_code: codePostalValue,
                country: countryValue,
              },
            },
          },
        },
      );

      if (error) {
        console.error(error.message);
        setCardError(error.message);
        setPaymentStatus("Une erreur s'est produite, Veuillez réessayer");

        setTimeout(() => {
          setPaymentStatus(`Payer ${price(total)} €`);
        }, 5000);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentStatus("Paiement réussi !");
        const productIds = currentCart.map((product) => product.id);

        await fetch(`http://localhost:4050/api/confirm-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            email: emailValue,
            name: nameValue,
            surname: surnameValue,
            product: productIds,
            amount: total,
            currentTotal: total,
            total: total,
            address: adressValue,
            city: cityValue,
            codePostal: codePostalValue,
            country: countryValue,
            products: currentCart,
            service_point_id: selectedServicePoint?.id // AJOUT : Envoi de l'ID du point relais
          }),
        });
        await axios.post("http://localhost:4050/api/shipments", {
  name: `${surnameValue} ${nameValue}`,
  address: adressValue,
  city: cityValue,
  postal_code: codePostalValue,
  country: countryValue,
  email: emailValue,
  // On transforme les items pour ajouter le poids et la valeur par défaut
  parcel_items: currentCart.map((item) => ({
    description: item.name,
    quantity: item.quantity,
    weight: "0.5", // Sendcloud exige un poids (ex: 0.5kg)
    value: item.price || item.pr, // Sendcloud exige une valeur monétaire
  })),
  service_point_id: selectedServicePoint?.id 
});
        clearCart();
        //route.push("/thank-you");
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      setCardError("Une erreur inattendue s'est produite");
      setPaymentStatus(`Payer ${price(total)} €`);
    }
  };

  const fields = {
    Email: !emailValue,
    invalidEmail: !isEmailValid,
    Nom: !nameValue,
    Prénom: !surnameValue,
    Adrésse: !adressValue,
    ville: !cityValue,
    CodePostal: !codePostalValue,
    pays: !countryValue,
  };

  const invalidFields = Object.keys(fields).filter((key) => fields[key]);

  useEffect(() => {
    if (invalidFields.length === 1) {
      if (invalidFields.includes("Email")) {
        setIsInvalid("Veuillez mettre votre adresse email");
      } else if (invalidFields.includes("invalidEmail")) {
        setIsInvalid("Votre email est incorrect");
      } else if (invalidFields.includes("date")) {
        setIsInvalid(`Veuillez nous donner vos disponibilité`);
      } else if (invalidFields.includes("time")) {
        setIsInvalid(`Veuillez nous donner vos disponibilité`);
      } else {
        setIsInvalid(`Veuillez remplir le champ ${invalidFields[0]}`);
      }
    } else if (invalidFields.length > 1) {
      if (
        invalidFields.includes("Email") &&
        invalidFields.includes("invalidEmail") &&
        invalidFields.length === 2
      ) {
        setIsInvalid("Veuillez vérifier votre email");
      } else if (
        invalidFields.includes("Email") &&
        invalidFields.includes("invalidEmail")
      ) {
        setIsInvalid(`Veuillez remplir tout les champs et vérifier l'email.`);
      }
    }
  }, [showAlert, invalidFields]);

  const handleCountryChange = (e) => {
    setCountryValue(e.target.value);
  };

  return (
    <section className="checkout">
      {/* AJOUT : Chargement du script Sendcloud */}
      <Script src="https://embed.sendcloud.sc/spp/1.0.0/api.min.js" strategy="lazyOnload" />

      <div className="checkout-cart">
        <TitleSection title={"Votre panier"}/>

        <div className="Cart">
          <div className="container-product-added">
            {currentCart != null
              ? currentCart.map((item, index) => {
                  return (
                    <CartCard
                      key={item.id}
                      img={item.img}
                      name={item.name}
                      pr={item.price}
                      size={item.size}
                      color={item.color}
                      quantity={item.quantity}
                      remove={() => remove(item.id)}
                    />
                  );
                })
              : null}
          </div>

          <div className="containter-total-price">
            <div className="total">Total</div>
            <div className="price">
              {" "}
              {price != total ? (
                <span className="price-b">{price(total)} €</span>
              ) : (
                `${price(total)} €`
              )}
              {price != total ? `${price(total)} €` : null}
              <span className="ttc">ttc</span>
            </div>
          </div>

          <PromoCodeSection onPromoApplied={handlePromoApplied} />
        </div>
      </div>

      <div key={formKey} className="container-form">
        <div className="checkout-form">
          <TitleSection title={"Finaliser votre commande"}/>

          {showAlert && invalidFields.length > 0 && (
            <div className="alerte">
              <p>{isInvalid}</p>
            </div>
          )}

          {cardError && (
            <div className="alerte card-error">
              <p>{cardError}</p>
            </div>
          )}

          {!stripeEnabled && (
            <div className="alerte info">
              <p>Application du code promo en cours...</p>
            </div>
          )}


          <div className="input-elements">
            <input
              className="input-email"
              onChange={handleEmail}
              type="email"
              placeholder="Email"
              required
              disabled={!stripeEnabled}
            />
          </div>

          <div className="facturation-title">
            <h3>Adresse de livraison</h3>
          </div>

          <div className="container-input-element">
            <div className="input-elements">
              <input
                onChange={(e) => setSurnameValue(e.target.value)}
                type="text"
                placeholder="Prénom"
                required
                disabled={!stripeEnabled}
              />
              <input
                onChange={(e) => setNameValue(e.target.value)}
                type="text"
                placeholder="Nom"
                required
                disabled={!stripeEnabled}
              />
            </div>
            <div className="input-elements">
              <input
                value={adressValue} // AJOUT : Value pour refléter le point relais
                onChange={(e) => setAdressValue(e.target.value)}
                type="text"
                placeholder="Adresse"
                required
                disabled={!stripeEnabled}
              />
              <input
                onChange={(e) => setCodePostalValue(e.target.value)}
                type="text"
                placeholder="Code postal"
                required
                disabled={!stripeEnabled}
              />
            </div>
            <div className="input-elements">
              <input
                value={cityValue} // AJOUT : Value pour refléter le point relais
                onChange={(e) => setCityValue(e.target.value)}
                type="text"
                placeholder="Ville"
                required
                disabled={!stripeEnabled}
              />
              <select
                onChange={handleCountryChange}
                value={countryValue}
                disabled={!stripeEnabled}
              >
                <option className="test-" value="">
                  Sélectionnez un pays
                </option>
                {Object.entries(countryCodes).map(([country, code]) => (
                  <option key={code} value={code}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* AJOUT : Bouton pour choisir le Point Relais */}
            <button 
              type="button" 
              onClick={openServicePointPicker} 
              className="pay-btn" 
              style={{background: "#5e35b1", marginTop: "10px", marginBottom: "20px"}}
            >
              📍 {selectedServicePoint ? `Point choisi: ${selectedServicePoint.name}` : "Choisir un Point Relais"}
            </button>
          </div>

          <div className="payment-method-selector">
            <div disabled={!stripeEnabled} onClick={()=> setPaymentMethod("card")} 
            className={paymentMethod == 'card' 
            ? "payment-option active" 
            :"payment-option"}>
            <p>Payer par carte</p>
              
            </div>
            <div disabled={!stripeEnabled} onClick={()=> setPaymentMethod("paypal")} 
            className={paymentMethod == 'paypal' 
            ? "payment-option active" 
            :"payment-option"}>
            <p>Payer par PayPal</p>
            
            </div>
          </div>

          {paymentMethod === "paypal" && stripeEnabled && (
            <>
              <div className="facturation-title">
                <h3>Payer par PayPal</h3>
              </div>

              <div className="paypal-button">
                <PaypalCheckout
                  email={emailValue}
                  name={nameValue}
                  surname={surnameValue}
                  address={adressValue}
                  city={cityValue}
                  codePostal={codePostalValue}
                  country={countryValue}
                />
                {invalidFields.length > 0 && (
                  <div
                    onClick={() => setShowAlert(true)}
                    className="check-button"
                  />
                )}
              </div>

              <div className="pay-legal">
                <p>
                  En cliquant sur PayPal, vous acceptez nos
                  <a href="/legal/condition-general-de-vente" className="info-legal"> conditions générales de vente</a> ainsi que nos
                  <a href="/legal/condition-general-d-utilisation" className="info-legal"> conditions générales d'utilisation.</a>
                </p>
              </div>
            </>
          )}

          {paymentMethod === "card" && stripeEnabled && (
            <>
              <div className="facturation-title">
                <h3>Payer par carte</h3>
              </div>

              <div className="input-elements">
                <input
                  className="name-card-input"
                  onChange={(e) => setNameCardValue(e.target.value)}
                  type="text"
                  placeholder="Titulaire de la carte"
                  required
                />
              </div>

              <div className="card-element">
                <CardElement
                  options={{
                    iconStyle: "solid",
                    style: {
                      base: {
                        backgroundColor:"white",
                        iconColor: "#8E8E8E",
                        color: "#ff4d6d",
                        fontWeight: 500,
                        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                        fontSize: "16px",
                        fontSmoothing: "antialiased",
                        ":-webkit-autofill": { color: "#ff4d6d" },
                        "::placeholder": { color: "#8E8E8E" },
                      },
                      invalid: {
                        iconColor: "#ffc7ee",
                        color: "#ffc7ee",
                      },
                    },
                  }}
                  onChange={(event) => {
                    if (event.error) {
                      setCardError(event.error.message);
                    } else {
                      setCardError(null);
                    }
                  }}
                />
              </div>

              <button
                className="pay-btn"
                type="submit"
                onClick={handleCardSubmit}
                disabled={!stripe || cardError || !stripeEnabled}
              >
                {paymentStatus}
              </button>

              <div className="pay-legal">
                <p>
                  En cliquant sur Payer, vous acceptez nos
                  <a href="/legal/condition-general-de-vente" className="info-legal"> conditions générales de vente</a> ainsi que nos
                  <a href="/legal/condition-general-d-utilisation" className="info-legal"> conditions générales d'utilisation.</a>
                </p>
              </div>
            </>
          )}

          {!stripeEnabled && (
            <div className="payment-disabled-message">
              <p>Application du code promo en cours, veuillez patienter...</p>
            </div>
          )}
        </div>
      </div>

      {paymentStatus === "Paiement réussi !" ? (
        <div className="status"></div>
      ) : (
        ""
      )}
    </section>
  );
};
export default CheckoutForm;