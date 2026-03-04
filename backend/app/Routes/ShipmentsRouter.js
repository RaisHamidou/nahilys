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

// ✅ IDs réels récupérés depuis l'API Sendcloud
const COLISSIMO_HOME_ID = 1066;       // Colissimo Home 1-2kg
const MONDIAL_RELAY_ID = 28038;       // Mondial Relay Point Relais 1-2kg

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

    let cleanAddress = (address || "").substring(0, 32).trim();
    let cleanHouseNumber = service_point_id ? "" : "1";

    if ((cleanAddress.length + cleanHouseNumber.length) > 32) {
      cleanAddress = cleanAddress.substring(0, 32 - cleanHouseNumber.length).trim();
    }

    const envoi = {
      parcel: {
        order_number,
        name,
        address: cleanAddress,
        house_number: cleanHouseNumber,
        city,
        postal_code,
        country,
        email,

        // Liaison point relais si applicable
        ...(service_point_id && { to_service_point: parseInt(service_point_id, 10) }),

        parcel_items: parcel_items.map((item) => ({
          description: item.description,
          quantity: parseInt(item.quantity, 10),
          weight: parseFloat(item.weight) || 0.5,
          value: item.value,
        })),

        // ✅ ID numérique au lieu de shipping_option_code
        shipment: {
          id: service_point_id ? MONDIAL_RELAY_ID : COLISSIMO_HOME_ID,
        },
      },
    };

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
