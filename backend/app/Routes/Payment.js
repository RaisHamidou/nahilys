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
  const { paymentIntentId, productIds, email, total, currentTotal, products, orderId, date,delivery } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      
     

      const productListHTML =products.map(item => {
        return (
          `


          <tr>
            <td class="outer-td" style="padding: 0 40px; border-bottom: 1px solid #F2EFEB;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="item-img-td" width="60" valign="top" style="padding: 14px 16px 14px 0;">
                    <table width="60" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="60" height="74" align="center" valign="middle" bgcolor="#EEE9E2" style="font-family:'Playfair Display',serif; font-style:italic;
                  font-size:8px; color:#C0B9AE;">
                          <img style="width:100%; object-fit: cover;object-position: bottom;" src={${item.img}}/>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td valign="top" style="padding: 14px 8px;">
                    <p style="margin:0 0 3px 0; font-family:'Playfair Display',Georgia,serif;
              font-size:14px; font-weight:600; color:#1A1A1A;">${item.name}</p>
                    <p style="margin:0 0 5px 0; font-family:'Inter',Arial,sans-serif;
              font-size:11px; font-weight:300; color:#999; line-height:1.6;">
                      Laine vierge &amp; cachemire · Ivoire · T.38</p>

                  </td>
                  <td width="80" valign="top" align="right" style="padding: 14px 0 14px 8px;">
                    <p style="margin:0 0 3px 0; font-family:'Montserrat',Arial,sans-serif;
              font-size:13px; font-weight:500; color:#1A1A1A;">${item.price/100} €</p>
                    <p style="margin:0; font-family:'Inter',Arial,sans-serif;
              font-size:11px; font-weight:300; color:#BBBBBB;">Qté : ${item.quantity}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
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
       <!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation de Commande</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400&family=Montserrat:wght@300;500&display=swap" rel="stylesheet">
  <style>
    body,
    table,
    td,
    a,
    div {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: #F5F3EF;
    }

    .col-half {
      width: 240px;
      vertical-align: top;
    }

    .col-third {
      width: 160px;
      vertical-align: top;
    }

    /* Responsive */
    @media only screen and (max-width: 480px) {
      .wrap {
        width: 100% !important;
      }

      .col-half,
      .col-third {
        display: block !important;
        width: 100% !important;
        padding-bottom: 14px !important;
      }

      .hero-title {
        font-size: 22px !important;
      }

      .outer-td {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }

      .item-img-td {
        display: none !important;
      }
    }

    .meta {
      background: red;
    }
  </style>
</head>

<body>

  <!-- OUTER WRAPPER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3EF">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- EMAIL CARD -->
        <table class="wrap" width="560" cellpadding="0" cellspacing="0" border="0" style="background:#FDFCFA; border-top: 2px solid #C9A96E;">

          <!-- ========== HEADER ========== -->
          <tr>
            <td align="center" bgcolor="#FFFFF" style="background:#FDFCFA; padding: 50px 0;">
              <div style="color:white; font-family:'Montserrat',Arial,sans-serif; letter-spacing:5px; text-transform:uppercase;">
                <img style="width:20%" src="https://www.nahilys.com/_next/static/media/logo.f9157a39.png" />
              </div>
            </td>
          </tr>

          <!-- ========== HERO ========== -->
          <tr>
            <td align="center" style="padding: 40px 40px 32px; border-bottom: 1px solid #EBEBEB;">

              <!-- Cercle check -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom:18px;">
                <tr>
                  <td width="44" height="44" align="center" valign="middle" style="border: 1px solid #C9A96E; border-radius: 50%;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/24px-White_check.svg.png" width="18" height="18" alt="✓" style="display:block;" onerror="this.style.display='none'; this.parentNode.innerHTML='&#10003;';" />
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 10px 0; font-family:'Montserrat',Arial,sans-serif;
        font-size:8px; font-weight:500; letter-spacing:4px;
        text-transform:uppercase; color:#C9A96E;">
                Confirmation de commande
              </p>
              <p class="hero-title" style="margin:0 0 12px 0; font-family:'Playfair Display',Georgia,serif;
        font-size:26px; font-weight:400; color:#1A1A1A; line-height:1.35;">
                Merci pour votre <em style="font-style:italic; color:#C9A96E;">confiance</em>
              </p>
              <p style="margin:0; font-family:'Inter',Arial,sans-serif;
        font-size:13px; font-weight:300; color:#888888; line-height:1.7;">
                Votre commande est confirmée et en cours de préparation.
              </p>
            </td>
          </tr>

          <!-- ========== META (3 colonnes) ========== -->

          <tr bgcolor="#FDFCFA">
            <td class="outer-td" style="padding: 0 40px; border-bottom: 1px solid #EBEBEB;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="col-third" align="center" style="padding: 24px 0; text-align: center;">
                    <p style="margin:0 0 5px 0; font-family:'Montserrat',Arial,sans-serif;
            font-size:8px; font-weight:500; letter-spacing:2.5px;
            text-transform:uppercase; color:#C9A96E;">Commande</p>
                    <p style="margin:0; font-family:'Inter',Arial,sans-serif;
            font-size:12.5px; color:#1A1A1A;">${orderId}</p>
                  </td>

                  <td class="col-third" align="center" style="padding: 24px 0; text-align: center;">
                    <p style="margin:0 0 5px 0; font-family:'Montserrat',Arial,sans-serif;
            font-size:8px; font-weight:500; letter-spacing:2.5px;
            text-transform:uppercase; color:#C9A96E;">Date</p>
                    <p style="margin:0; font-family:'Inter',Arial,sans-serif;
            font-size:12.5px; color:#1A1A1A;">${date}</p>
                  </td>

                </tr>
              </table>
            </td>
          </tr>

          <!-- ========== SECTION LABEL ========== -->
          <tr>
            <td class="outer-td" style="padding: 28px 40px 14px;">
              <p style="margin:0; font-family:'Montserrat',Arial,sans-serif;
        font-size:8px; font-weight:500; letter-spacing:3.5px;
        text-transform:uppercase; color:#AAAAAA;">
                Votre sélection
              </p>
            </td>
          </tr>

          <!-- ========== PRODUIT ========== -->
          

          <!-- ========== TOTAL ========== -->
          <tr>
            <td class="outer-td" style="padding: 20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'Inter',Arial,sans-serif; font-size:12px;
            font-weight:300; color:#777; padding-bottom:8px;">Sous-total</td>
                  <td align="right" style="font-family:'Inter',Arial,sans-serif; font-size:12px;
            font-weight:300; color:#777; padding-bottom:8px;">8 740 €</td>
                </tr>
                <tr>
                  <td style="font-family:'Inter',Arial,sans-serif; font-size:12px;
            font-weight:300; color:#777; padding-bottom:8px;">Livraison</td>
                  <td align="right" style="font-family:'Inter',Arial,sans-serif; font-size:12px;
            font-weight:300; color:#777; padding-bottom:8px;">${delivery/100}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top: 1px solid #EBEBEB; padding-top:14px; padding-bottom:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:'Montserrat',Arial,sans-serif; font-size:9px;
                  font-weight:500; letter-spacing:2.5px; text-transform:uppercase;
                  color:#1A1A1A; vertical-align:middle;">Total</td>
                        <td align="right" style="font-family:'Playfair Display',Georgia,serif;
                  font-size:22px; font-weight:600; color:#1A1A1A;">${total+delivery/100} €</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ========== FOOTER ========== -->
          <tr>
            <td bgcolor="#111111" align="center" style="padding: 28px 40px;">
              <img style="width:15%" src="https://www.nahilys.com/assets/logo/logo_white.png" />
              <p style="margin:0 0 14px 0;">
                <a href="https://www.nahilys.com/contact" style="font-family:'Inter',Arial,sans-serif; font-size:10px;
          font-weight:300; color:#777777; text-decoration:none; margin:0 10px;">Contact</a>
                <a href="https://www.nahilys.com/conditions/politique-d-echange-et-de-retour" style="font-family:'Inter',Arial,sans-serif; font-size:10px;
          font-weight:300; color:#777777; text-decoration:none; margin:0 10px;">Retours</a>
                <a href="www.nahilys.com" style="font-family:'Inter',Arial,sans-serif; font-size:10px;
          font-weight:300; color:#777777; text-decoration:none; margin:0 10px;">Boutiques</a>
              </p>
              <p style="margin:0; font-family:'Inter',Arial,sans-serif; font-size:9.5px;
        font-weight:300; color:#555555; line-height:1.8;">
                © Nahilys &nbsp;·&nbsp;
                <a href="https://www.nahilys.com/conditions/cgu" style="color:#666; text-decoration:underline;">Se désabonner</a>
                &nbsp;·&nbsp;
                <a href="#" style="color:#666; text-decoration:underline;">Confidentialité</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- END EMAIL CARD -->

      </td>
    </tr>
  </table>
  <!-- END OUTER WRAPPER -->

</body>

</html>
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