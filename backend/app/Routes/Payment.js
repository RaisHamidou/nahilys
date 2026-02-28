import express from "express";
import Stripe from "stripe";
import "dotenv/config";
import nodemailer from "nodemailer";

import axios from "axios";
import product from "../../data/product.json" with {type:"json"}

const router = express.Router();
// Instanciez Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  const { amount, email, name, surname, nameCard, address, city, codePostal, country } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: `${surname} ${name}`,
      address: {
        line1: address,
        city: city,
        postal_code: codePostal,
        country: country,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "eur",
      //payment_method_types: ["card"],
      customer: customer.id,
      automatic_payment_methods: {
      enabled: true,
      allow_redirects: "always",
  },
    });
    // Envoyez l'ID et le client_secret au frontend
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Ajout de l'ID du PaymentIntent
    });
  } catch (error) {
    console.error("Erreur lors de la création du Payment Intent:", error);
    res.status(500).send({ error: error.message });
  }
});

router.post("/confirm-payment", async (req, res) => {
  const { paymentIntentId, productIds, email, total, currentTotal, products, orderId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      
     

      const productListHTML =products.map(item => {
        return (
          `<li>${item.img}</li>
          <li>${item.name}</li>
          <li>${item.quantity}</li>
          
          `
        )
      })
      // 2. Configuration Transporteur
      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // 3. Contenu du mail
      const mailOptions = {
        from: `"Mrs Cooking" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Confirmation de votre commande",
       html:`
       div>${orderId}</div>
       <ul> ${productListHTML}</ul>
       `
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: "Email envoyé" });
    } else {
      res.status(400).send({ message: "Paiement non confirmé" });
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).send({ error: "Erreur lors de l'envoi." });
  }
});
export default router;