import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs : 15*100*1000,
    max :100
})

export default limiter