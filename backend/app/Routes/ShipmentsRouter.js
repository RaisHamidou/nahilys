import express from "express"
import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
const router = express.Router()

const SENDCLOUD_PUBLIC_KEY = process.env.SENDCLOUD_PUBLIC_KEY
const SENDCLOUD_SECRET_KEY = process.env.SENDCLOUD_SECRET_KEY

const auth = Buffer.from(
  `${SENDCLOUD_PUBLIC_KEY}:${SENDCLOUD_SECRET_KEY}`
).toString("base64")

router.post("/shipments", async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      postal_code,
      country,
      email,
      parcel_items,
    } = req.body

    // Construction de l'objet "parcel" conforme à l’API v2
    const envoi = {
      parcel: {
        name: name,
        address: address,
        city: city,
        postal_code: postal_code,
        country: country,
        email: email,

        // Items du colis : valeur (value) OBLIGATOIRE
        parcel_items: parcel_items.map((item) => ({
          description: item.description,
          quantity: parseInt(item.quantity, 10),
          weight: parseFloat(item.weight), // en kg, string ou number accepté par l’API
          value: item.value, // ex: "29.90"
          // Facultatif mais utile surtout hors UE :
          // hs_code: item.hs_code,
          // origin_country: item.origin_country,
        })),

        // Option de livraison via shipping_option_code (ex: sendcloud:letter)
        ship_with: {
          type: "shipping_option_code",
          properties: {
            shipping_option_code: "sendcloud:letter",
          },
        },

        // (Optionnel) tu peux ajouter d’autres champs si besoin :
        // weight: "0.8",
        // request_label: true,
      },
    }

    const response = await axios.post(
      "https://panel.sendcloud.sc/api/v2/parcels",
      envoi,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    )

    const shipmentData = response.data.parcel

    return res.status(201).json({
      success: true,
      data: {
        id: shipmentData.id,
        tracking_number: shipmentData.tracking_number,
        tracking_url: shipmentData.tracking_url,
        label_pdf: shipmentData.label?.label_printer || shipmentData.label_file,
      },
    })
  } catch (error) {
    console.error(
      "❌ Détails erreur Sendcloud :",
      JSON.stringify(error.response?.data || error.message, null, 2)
    )

    return res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data || { message: "Erreur interne" },
    })
  }
})

router.get("/relay-points", async (req, res) => {
  try {
    const { postal_code, country = "FR", city } = req.query;

    if (!postal_code || postal_code.length < 3) {
      return res.status(400).json({ success: false, error: "Code postal trop court" });
    }

    const params = new URLSearchParams({
      country,
      postal_code,
      ...(city && { city }),
      language: "fr",
      limit: "10",
    });

    const response = await axios.get(
      `https://panel.sendcloud.sc/api/v2/points?${params.toString()}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      success: true,
      points: response.data.points || [],
    });
  } catch (error) {
    console.error("Erreur points relais:", error.response?.data);
    return res.status(500).json({
      success: false,
      error: error.response?.data || "Erreur récupération points relais",
    });
  }
});


export default router
