import express from "express";
import cors from "cors";
import productRouter from "./Routes/ProductRouter.js"
import payment from "./Routes/Payment.js"
import shipmentsRouter from "./Routes/ShipmentsRouter.js"
import contact from './Routes/Contact.js'
import helmet from "helmet";
import limiter from "./Routes/RateLimite.js";

const app = express();

app.use(express.json())
app.use(cors());
app.use(helmet())
app.use("/api", limiter)

app.use("/api", productRouter)
app.use("/api", payment)
app.use("/api", shipmentsRouter)
app.use("/api", contact)


export default app