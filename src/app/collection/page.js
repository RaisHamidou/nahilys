import React from "react";
import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import CollectionPage from "../../../components/Template/CollectionPage/CollectionPage";


export default function page() {
  return (
    <div className="collection">
      <Header />
      <CollectionPage/>
      <Footer />
    </div>
  );
}
