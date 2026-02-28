"use client";
import React, { useContext, useEffect, useState } from "react";
import CTA from "../../Elements/CTA/CTA";
import TitleSection from "../../Elements/TitleSection/TitleSection";
import img from "../../../assets/images/abya/pexels-qalanjos-fashions-online-abaya-store-673551486-29188566.jpg";
import { MyContext } from "../../../context/ContextProvider";
import axios from "axios";
import { URL } from "../../Config/Config";

export default function Featured() {
  const { price } = useContext(MyContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await axios.get(`${URL}/api/product`);
      setProducts(res.data);
    };
    loadProduct();
  }, []);

  const product = products.filter((find) => find.id == "abaya_kamila")[0];

  console.log(product);
  return (
    <section className="featured">
      <CTA href={`/collection/product/${product?.slug}`} str={"Voir en détaille"} />
      <div className="container-img-featured">
        <img src={product?.gallery[1]} alt={product?.name} />
      </div>

      <div className="container-description-featured">
        <TitleSection title={"En vedette"}>
          Collection Signature Alliez sobriété et raffinement avec cette pièce
          épurée. Sa coupe fluide et ses délicates broderies perlées en font un
          indispensable pour une allure chic et intemporelle. L'incarnation
          parfaite de la simplicité sophistiquée.
        </TitleSection>
        <CTA href={`/collection/product/${product?.slug}`} str={"Voir en détaille"} />
      </div>
    </section>
  );
}
