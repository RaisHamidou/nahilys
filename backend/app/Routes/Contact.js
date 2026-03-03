import express from "express";
import "dotenv/config";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mail = {
    from: name,
    to: ADMIN_EMAIL,
    subject: name,
    html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>`,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

export default router;
