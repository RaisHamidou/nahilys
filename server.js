import app from "./backend/app/app.js";

const PORT = 4050

app.listen(PORT, ()=>{
    console.log(`server is running at : http://localhost:${PORT}`)
    
})