import Image from "next/image";
import OurCollection from "../../components/Layout/OurCollection/OurCollection";
import Featured from "../../components/Layout/Featured/Featured";
import OurSelection from "../../components/Layout/OurSelection/OurSelection";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/Layout/Hero/Hero";


export default function Home() {
  return (
    <main>
   <Header/> 
    <Hero/>
      <OurCollection/>
      <Featured/>
      <OurSelection/>
      <Footer/>
    </main>
  );
}
