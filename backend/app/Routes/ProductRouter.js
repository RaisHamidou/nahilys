import express from "express"
import products from "../../data/product.json" with {type:"json"}

const router = express.Router()

router.get("/product", (req, res)=>{
    res.send(products)
})
router.get("/product/:slug", (req,res)=>{
    const params = req.params.slug
    const productFiltred = products.filter(product => product.slug == params)
    if(productFiltred.length == 0){
        return res.status(404).json({message:"Produit non trouver !"})
    }
    res.send(productFiltred)
})
export default router