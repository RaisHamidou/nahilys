import React from "react";
import Header from "../../../../components/Layout/Header/Header";
import Footer from "../../../../components/Layout/Footer/Footer";
import TitleSection from "../../../../components/Elements/TitleSection/TitleSection";

export default function page() {
  return (
    <div>
      <Header />
        
      <section className="legal-container">
      <TitleSection title={"Politique des cookies"}/>
    <p className="legal-intro">Afin de vous offrir une expérience de navigation d'exception et un service personnalisé, <strong>Nahilys</strong> utilise des cookies et traceurs sur son site officiel.</p>

    <hr className="legal-divider"/>

    <h2>1. Introduction</h2>
    <p>Cette politique a pour vocation de vous informer, en toute transparence, sur l'usage des technologies de traçage et sur vos droits conformément au Règlement Général sur la Protection des Données (RGPD) ainsi qu'à la loi française « Informatique et Libertés ».</p>

    <h2>2. Qu’est-ce qu’un cookie ?</h2>
    <p>Un cookie est un fichier texte discret déposé sur votre terminal lors de votre visite. Dans l'univers digital de Nahilys, ils nous permettent de :</p>
    <ul>
        <li>Sécuriser votre session et votre panier d'achat ;</li>
        <li>Mémoriser vos préférences de navigation pour une fluidité optimale ;</li>
        <li>Analyser l'usage de notre site afin d'en sublimer les services.</li>
    </ul>

    <h2>3. Typologie des cookies</h2>
    <p>La Maison Nahilys utilise différentes catégories de cookies pour répondre à vos exigences :</p>
    
    <h3>A. Cookies strictement nécessaires</h3>
    <p>Ces cookies sont indispensables au fonctionnement du site. Ils garantissent l'accès à votre compte client et la gestion de votre panier. Ils ne peuvent être désactivés.</p>

    <h3>B. Cookies de performance et statistiques</h3>
    <p>Ils nous permettent de comprendre comment nos visiteurs interagissent avec notre site, de manière totalement anonyme, via des outils tels que Google Analytics.</p>

    <h3>C. Cookies fonctionnels</h3>
    <p>Ils mémorisent vos choix personnels (langue, préférences de région) pour que chaque visite soit le reflet de vos attentes.</p>

    <h3>D. Cookies de publicité et marketing</h3>
    <p>Déposés par nos partenaires, ils permettent de vous présenter des créations et offres ciblées, adaptées à vos centres d'intérêt.</p>

    <h2>4. Gestion de vos préférences</h2>
    <p>Votre consentement est au cœur de notre démarche. Vous pouvez à tout moment moduler vos préférences :</p>
    <ul>
        <li>Via notre <strong>bannière de consentement</strong> présente dès votre arrivée sur le site ;</li>
        <li>En configurant votre navigateur (Chrome, Firefox, Safari ou Edge) pour limiter ou supprimer les fichiers traceurs.</li>
    </ul>
    <p><em>Note : Le refus de certains cookies essentiels peut altérer la qualité de votre expérience, notamment l'accès à votre panier et à vos préférences de compte.</em></p>

    <h2>5. Durée de conservation</h2>
    <p>Les cookies déposés par Nahilys sont conservés pour une durée maximale de <strong>13 mois</strong>. Au-delà de ce délai, votre consentement sera de nouveau sollicité.</p>

    <h2>6. Consentement & Modifications</h2>
    <p>En poursuivant votre navigation, vous acceptez l’usage des cookies selon les réglages que vous avez définis. La Maison Nahilys se réserve le droit de mettre à jour cette politique pour refléter les évolutions technologiques ou réglementaires.</p>

    <h2>7. Contact</h2>
    <p>Pour toute question relative à notre gestion des cookies, notre service client est à votre entière disposition à l'adresse suivante :</p>
    <p><a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a></p>
</section>
      <Footer />
    </div>
  );
}
