import React from "react";
import Header from "../../../../components/Layout/Header/Header";
import Footer from "../../../../components/Layout/Footer/Footer";
import TitleSection from "../../../../components/Elements/TitleSection/TitleSection";

export default function page() {
  return (
    <div>
      <Header />
      
      <section className="legal-container">
      <TitleSection title={"Conditions Générales d’Utilisation"}/>
    <p className="legal-intro">Bienvenue dans l'univers de <strong>Nahilys</strong>. Les présentes Conditions Générales d’Utilisation définissent le cadre de votre expérience sur notre site et les engagements mutuels qui nous lient.</p>

    <hr className="legal-divider"/>

    <h2>1. Éditeur et hébergeur</h2>
    <p>L'édition du site est assurée par l'<strong>Entreprise individuelle Nahilys</strong> :</p>
    <ul>
        <li>Siège social : 4 Rue Youri Gagarine, 78280 Guyancourt, France</li>
        <li>SIREN : 939 248 514 — RCS Versailles</li>
        <li>Contact : 07 65 20 45 39 | <a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a></li>
    </ul>
    
    <p>La Maison Nahilys est hébergée par <strong>Vercel Inc.</strong>, situé au 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>

    <h2>2. Objet</h2>
    <p>Les présentes CGU régissent l’accès et l’utilisation du Site. Par sa navigation, l’utilisateur accepte sans réserve de se conformer à l'élégance et aux règles de conduite de notre plateforme.</p>

    <h2>3. Accès au site</h2>
    <p>Le Site est accessible gracieusement à tout utilisateur disposant d’un accès Internet. Bien que nous nous efforcions d’assurer une disponibilité permanente, l’accès peut être suspendu pour des opérations de maintenance ou de mise à jour, afin de toujours vous offrir le meilleur service.</p>

    <h2>4. Création de compte et sécurité</h2>
    <p>Certaines fonctionnalités exclusives, telles que la gestion de vos commandes, nécessitent la création d'un compte personnel. Vous vous engagez à :</p>
    <ul>
        <li>Fournir des informations exactes et actualisées ;</li>
        <li>Préserver la confidentialité de vos identifiants ;</li>
        <li>Nous informer sans délai de toute utilisation non autorisée de votre espace.</li>
    </ul>

    <h2>5. Utilisation du site</h2>
    <p>L’utilisateur s’engage à une utilisation respectueuse et conforme aux lois en vigueur. Il est strictement interdit de perturber le fonctionnement du Site ou d'y diffuser des contenus illicites, diffamatoires ou portant atteinte à l'image de la Maison Nahilys.</p>

    <h2>6. Propriété intellectuelle</h2>
    <p>L’ensemble du contenu du Site — textes, photographies de créations, logos et design — constitue le patrimoine de la Maison <strong>Nahilys</strong> et est protégé par le droit international de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans notre consentement écrit préalable.</p>

    <h2>7. Données personnelles (RGPD)</h2>
    <p>Conformément au RGPD, nous veillons à la protection de vos données. Vous disposez d’un droit d’accès, de rectification, de suppression et de portabilité de vos informations. Pour toute demande, veuillez nous contacter à l'adresse : <a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a>.</p>

    <h2>8. Responsabilité</h2>
    <p>La Maison Nahilys décline toute responsabilité en cas d'interruptions de réseau, d'erreurs d'omission dans les informations publiées ou de dommages indirects résultant de l'usage du Site. Notre responsabilité est limitée au cadre légal français.</p>

    <h2>9. Liens hypertextes</h2>
    <p>Le Site peut proposer des liens vers des partenaires tiers. N'exerçant aucun contrôle sur ces derniers, Nahilys décline toute responsabilité quant à leur contenu ou leurs politiques de confidentialité.</p>

    <h2>10. Modifications des CGU</h2>
    <p>La Maison Nahilys se réserve la faculté de faire évoluer les présentes conditions. Nous vous invitons à les consulter régulièrement pour vous tenir informé des derniers raffinements de nos services.</p>

    <h2>11. Loi applicable</h2>
    <p>Les présentes CGU sont régies par le droit français. À défaut de résolution amiable, tout litige sera porté devant les tribunaux compétents du ressort de Versailles.</p>
</section>
      <Footer />
    </div>
  );
}
