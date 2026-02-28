import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const SENDCLOUD_PUBLIC_KEY = process.env.SENDCLOUD_PUBLIC_KEY;
const SENDCLOUD_SECRET_KEY = process.env.SENDCLOUD_SECRET_KEY;

const auth = Buffer.from(
  `${SENDCLOUD_PUBLIC_KEY}:${SENDCLOUD_SECRET_KEY}`
).toString("base64");

router.post("/shipments", async (req, res) => {
  try {
    const {
      order_number,
      name,
      address,
      city,
      postal_code,
      country,
      email,
      parcel_items,
      service_point_id
    } = req.body;

    // 1. DÉTERMINER LA MÉTHODE DE LIVRAISON DYNAMIQUE
    // Si un service_point_id existe, on utilise Mondial Relay, sinon Colissimo Domicile
    let shippingMethod = "colissimo:home-delivery"; 
    
    if (service_point_id) {
      shippingMethod = "mondial_relay:point-relais";
    }

    // 2. NETTOYAGE DES DONNÉES (Éviter les erreurs 400 de Sendcloud)
    const cleanAddress = (address || "").substring(0, 31); // Max 32 caractères
    const cleanHouseNumber = service_point_id ? "1" : ""; // Évite l'erreur house_number > 20 car.

    // 3. CONSTRUCTION DU COLIS CONFORME API V2
    const envoi = {
      parcel: {
        order_number: order_number, // Ton ID unique (ex: ORD-LZM3X8JZ-A7K)
        name: name,
        address: cleanAddress,
        house_number: cleanHouseNumber,
        city: city,
        postal_code: postal_code,
        country: country,
        email: email,
        
        // Liaison point relais si applicable
        ...(service_point_id && { to_service_point: parseInt(service_point_id, 10) }),

        // Articles du colis
        parcel_items: parcel_items.map((item) => ({
          description: item.description,
          quantity: parseInt(item.quantity, 10),
          weight: parseFloat(item.weight) || 0.5, // Poids par défaut 500g
          value: item.value, 
        })),

        // Sélection dynamique du transporteur
        ship_with: {
          type: "shipping_option_code",
          properties: {
            shipping_option_code: shippingMethod,
          },
        },
      },
    };

    // 4. APPEL À L'API SENDCLOUD
    const response = await axios.post(
      "https://panel.sendcloud.sc/api/v2/parcels",
      envoi,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    const shipmentData = response.data.parcel;

    return res.status(201).json({
      success: true,
      data: {
        id: shipmentData.id,
        tracking_number: shipmentData.tracking_number,
        tracking_url: shipmentData.tracking_url,
        label_pdf: shipmentData.label?.label_printer || shipmentData.label_file,
      },
    });

  } catch (error) {
    // Log détaillé pour débugger en cas de souci
    console.error(
      "❌ Erreur API Sendcloud :",
      JSON.stringify(error.response?.data || error.message, null, 2)
    );

    return res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data || { message: "Erreur serveur interne" },
    });
  }
});

export default router;