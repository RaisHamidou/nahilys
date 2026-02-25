import express from "express";
import cors from "cors";
import productRouter from "./Routes/ProductRouter.js"
import payment from "./Routes/Payment.js"
import shipmentsRouter from "./Routes/ShipmentsRouter.js"

const app = express();

app.use(express.json())
app.use(cors());

app.use("/api", productRouter)
app.use("/api", payment)
app.use("/api", shipmentsRouter)


export default app