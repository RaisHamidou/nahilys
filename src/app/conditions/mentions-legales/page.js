import React from "react";
import Header from "../../../../components/Layout/Header/Header";
import Footer from "../../../../components/Layout/Footer/Footer";
import TitleSection from "../../../../components/Elements/TitleSection/TitleSection";

export default function page() {
  return (
    <div>
      <Header />
      
      <section className="legal-container">
       <TitleSection title={"Mentions légales"}/>
    <p className="legal-intro">L'entreprise individuelle <strong>Nahilys</strong>, soucieuse des droits des individus et dans une volonté de transparence absolue, a mis en place la présente politique de confidentialité pour ses clients exigeants.</p>
    
    <p>Pour toute information complémentaire sur la protection de vos données : <a href="https://www.cnil.fr/" target="_blank">cnil.fr</a></p>

    <hr className="legal-divider"/>

    <h2>Article 1 — Mentions légales</h2>
    
    <h3>1.1 Éditeur</h3>
    <p><strong>Entreprise individuelle Nahilys</strong></p>
    <ul>
        <li>4 Rue Youri Gagarine, 78280 Guyancourt, France</li>
        <li>SIREN : 939 248 514 RCS Versailles</li>
        <li>Contact : <a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a></li>
    </ul>

    <h3>1.2 Hébergement</h3>
    <p><strong>Vercel Inc.</strong><br/>
    440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>

    <h2>Article 2 — Accès au site</h2>
    <p>L'accès au site est réservé à un usage strictement personnel. L’utilisateur s’engage à ne pas utiliser ce site à des fins de sollicitation commerciale non sollicitée, préservant ainsi l'exclusivité de notre univers.</p>

    <h2>Article 3 — Propriété intellectuelle</h2>
    <p>Chaque création, photographie et illustration présente sur ce site est la propriété exclusive de Nahilys. Toute reproduction non autorisée est une atteinte à notre patrimoine intellectuel.</p>

    <h2>Article 8 — Vos Droits</h2>
    <p>Conformément au RGPD, vous disposez d'un droit de regard total sur vos informations :</p>
    <ul>
        <li>Droit d’accès et de rectification</li>
        <li>Droit à l’effacement (droit à l’oubli)</li>
        <li>Droit à la portabilité des données</li>
    </ul>
    <p>Pour exercer vos droits, contactez-nous en toute confidentialité à : <a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a></p>

    <h2>Article 15 — Loi applicable</h2>
    <p>Les présentes mentions sont régies par la loi française. Les litiges relèvent de la compétence exclusive des tribunaux de Versailles.</p>
</section>
      <Footer />
    </div>
  );
}
