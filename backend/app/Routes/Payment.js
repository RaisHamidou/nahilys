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
  const { paymentIntentId, productIds, email, total, currentTotal, products } = req.body;

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
        html: `
          <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirmation de Commande</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400&family=Montserrat:wght@300;500&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0; padding: 0;
      background: #F5F3EF;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrap {
      max-width: 560px;
      margin: 40px auto;
      background: #FDFCFA;
      border-top: 2px solid #C9A96E;
    }

    /* HEADER */
    .hd {
      background: #111;
      padding: 32px 40px;
      text-align: center;
    }
    .hd-sub {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 10px;
      color: #C9A96E;
      letter-spacing: 3px;
      margin-bottom: 8px;
    }
    .hd-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 18px;
      font-weight: 300;
      letter-spacing: 10px;
      color: #FFF;
      text-transform: uppercase;
    }

    /* HERO */
    .hero {
      padding: 44px 40px 36px;
      text-align: center;
      border-bottom: 1px solid #EBEBEB;
    }
    .hero-check {
      width: 44px; height: 44px;
      border: 1px solid #C9A96E;
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero-tag {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #C9A96E;
      margin-bottom: 12px;
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      font-weight: 400;
      color: #1A1A1A;
      line-height: 1.35;
      margin-bottom: 12px;
    }
    .hero-title em { font-style: italic; color: #C9A96E; }
    .hero-note {
      font-size: 13px;
      font-weight: 300;
      color: #888;
      line-height: 1.7;
    }

    /* BODY */
    .bd { padding: 0 40px; }

    /* META */
    .meta {
      display: flex;
      gap: 0;
      padding: 28px 0;
      border-bottom: 1px solid #EBEBEB;
    }
    .meta-item { flex: 1; }
    .meta-lbl {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #C9A96E;
      margin-bottom: 5px;
    }
    .meta-val {
      font-size: 12.5px;
      font-weight: 400;
      color: #1A1A1A;
    }

    /* PRODUCTS */
    .sec-lbl {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: #AAAAAA;
      padding: 28px 0 16px;
    }
    .item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 14px 0;
      border-bottom: 1px solid #F2EFEB;
    }
    .item:last-child { border-bottom: none; }
    .item-img {
      width: 60px; height: 74px;
      background: linear-gradient(145deg, #EEE9E2, #E2DDD6);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item-img span {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 8px;
      color: #C0B9AE;
    }
    .item-info { flex: 1; }
    .item-name {
      font-family: 'Playfair Display', serif;
      font-size: 14px;
      font-weight: 600;
      color: #1A1A1A;
      margin-bottom: 3px;
    }
    .item-desc {
      font-size: 11px;
      font-weight: 300;
      color: #999;
      line-height: 1.6;
      margin-bottom: 5px;
    }
    .item-ref {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 2px;
      color: #C9A96E;
      text-transform: uppercase;
    }
    .item-price {
      text-align: right;
      flex-shrink: 0;
    }
    .item-price .price {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #1A1A1A;
    }
    .item-price .qty {
      font-size: 11px;
      font-weight: 300;
      color: #BBBBBB;
      margin-top: 3px;
    }

    /* TOTAL */
    .total-block {
      border-top: 1px solid #EBEBEB;
      padding: 20px 0 28px;
    }
    .t-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 300;
      color: #777;
    }
    .t-final {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #EBEBEB;
      padding-top: 14px;
      margin-top: 4px;
    }
    .t-final .lbl {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #1A1A1A;
      align-self: center;
    }
    .t-final .val {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 600;
      color: #1A1A1A;
    }

    /* ADDRESS / PAYMENT */
    .info-row {
      display: flex;
      gap: 32px;
      padding: 24px 0;
      border-top: 1px solid #EBEBEB;
    }
    .info-col { flex: 1; }
    .info-lbl {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #C9A96E;
      margin-bottom: 8px;
    }
    .info-txt {
      font-size: 12px;
      font-weight: 300;
      color: #555;
      line-height: 1.9;
    }

    /* CTA */
    .cta {
      padding: 8px 0 36px;
      text-align: center;
    }
    .cta a {
      display: inline-block;
      background: #111;
      color: #FFF;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 4px;
      text-transform: uppercase;
      text-decoration: none;
      padding: 14px 36px;
    }

    /* FOOTER */
    .ft {
      background: #111;
      padding: 28px 40px;
      text-align: center;
    }
    .ft-brand {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 300;
      letter-spacing: 7px;
      text-transform: uppercase;
      color: #FFF;
      margin-bottom: 14px;
    }
    .ft-links a {
      font-size: 10px;
      font-weight: 300;
      color: #777;
      text-decoration: none;
      margin: 0 10px;
    }
    .ft-legal {
      margin-top: 16px;
      font-size: 9.5px;
      font-weight: 300;
      color: #555;
      line-height: 1.8;
    }
    .ft-legal a { color: #666; }

    @media (max-width: 480px) {
      .wrap { margin: 0; }
      .hd, .hero, .bd, .ft { padding-left: 24px !important; padding-right: 24px !important; }
      .meta, .info-row { flex-direction: column; gap: 16px; }
      .hero-title { font-size: 22px; }
    }
  </style>
</head>
<body>
<div class="wrap">

  <!-- HEADER -->
  <div class="hd">
    <div class="hd-sub">Maison de Haute Couture</div>
    <div class="hd-name">Élite Paris</div>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-check">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12.5L9.5 17L19 7.5" stroke="#C9A96E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="hero-tag">Confirmation de commande</div>
    <div class="hero-title">Merci pour votre<br><em>confiance</em></div>
    <div class="hero-note">Votre commande est confirmée et en cours de préparation.</div>
  </div>

  <!-- BODY -->
  <div class="bd">

    <!-- META -->
    <div class="meta">
      <div class="meta-item">
        <div class="meta-lbl">Commande</div>
        <div class="meta-val">#EP-2026-00847</div>
      </div>
      <div class="meta-item">
        <div class="meta-lbl">Date</div>
        <div class="meta-val">21 Fév. 2026</div>
      </div>
      <div class="meta-item">
        <div class="meta-lbl">Livraison</div>
        <div class="meta-val">25 – 27 Fév.</div>
      </div>
    </div>

    <!-- PRODUCTS -->
    <div class="sec-lbl">Votre sélection</div>

    <div class="item">
      <div class="item-img"><span>Photo</span></div>
      <div class="item-info">
        <div class="item-name">Manteau Haussmann</div>
        <div class="item-desc">Laine vierge & cachemire · Ivoire · T.38</div>
        <div class="item-ref">Réf. EP-MW-4421</div>
      </div>
      <div class="item-price">
        <div class="price">3 200 €</div>
        <div class="qty">Qté : 1</div>
      </div>
    </div>

    <div class="item">
      <div class="item-img"><span>Photo</span></div>
      <div class="item-info">
        <div class="item-name">Sac Étoile Noire</div>
        <div class="item-desc">Cuir grainé pleine fleur · Noir · Medium</div>
        <div class="item-ref">Réf. EP-SB-8807</div>
      </div>
      <div class="item-price">
        <div class="price">4 850 €</div>
        <div class="qty">Qté : 1</div>
      </div>
    </div>

    <div class="item">
      <div class="item-img"><span>Photo</span></div>
      <div class="item-info">
        <div class="item-name">Ceinture Dorée</div>
        <div class="item-desc">Cuir veau velours · Cognac · T.80</div>
        <div class="item-ref">Réf. EP-CB-3310</div>
      </div>
      <div class="item-price">
        <div class="price">690 €</div>
        <div class="qty">Qté : 1</div>
      </div>
    </div>

    <!-- TOTAL -->
    <div class="total-block">
      <div class="t-row"><span>Sous-total</span><span>8 740 €</span></div>
      <div class="t-row"><span>Livraison</span><span>Offerte</span></div>
      <div class="t-final">
        <span class="lbl">Total</span>
        <span class="val">8 740 €</span>
      </div>
    </div>

    <!-- ADDRESS + PAYMENT -->
    <div class="info-row">
      <div class="info-col">
        <div class="info-lbl">Livraison</div>
        <div class="info-txt">
          Sophie Lefèvre<br>
          14, Rue du Faubourg Saint-Honoré<br>
          75008 Paris, France
        </div>
      </div>
      <div class="info-col">
        <div class="info-lbl">Paiement</div>
        <div class="info-txt">
          Visa Infinite<br>
          ···· ···· ···· 4291<br>
          3D Secure
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="cta">
      <a href="#">Suivre ma commande</a>
    </div>

  </div>

  <!-- FOOTER -->
  <div class="ft">
    <div class="ft-brand">Élite Paris</div>
    <div class="ft-links">
      <a href="#">Contact</a>
      <a href="#">Retours</a>
      <a href="#">Boutiques</a>
    </div>
    <div class="ft-legal">
      © 2026 Maison Élite Paris — <a href="#">Se désabonner</a> · <a href="#">Confidentialité</a>
    </div>
  </div>

</div>
</body>
</html>
        `,
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