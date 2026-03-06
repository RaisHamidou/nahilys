import express from "express"
import { db } from "../lib/firebase.js"
//import products from "../../data/product.json" with {type:"json"}

const router = express.Router()

/* router.get("/product", (req, res)=>{
    res.send(products)
})
router.get("/product/:slug", (req,res)=>{
    const params = req.params.slug
    const productFiltred = products.filter(product => product.slug == params)
    if(productFiltred.length == 0){
        return res.status(404).json({message:"Produit non trouver !"})
    }
    res.send(productFiltred)
}) */


router.get("/product", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/product/:slug", async (req, res) => {
  const snapshot = await db.collection("products")
    .where("slug", "==", req.params.slug)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ message: "Produit non trouvé !" });
  }

  res.json({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
});
export default router