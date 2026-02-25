import React from "react";
import Header from "../../../../components/Layout/Header/Header";
import Footer from "../../../../components/Layout/Footer/Footer";
import TitleSection from "../../../../components/Elements/TitleSection/TitleSection";

export default function page() {
  return (
    <div>
      <Header />
       
     <section className="legal-container">
      <TitleSection title={"Politique d’échange et de retour"} />
    <p className="legal-intro">La Maison <strong>Nahilys</strong> s'engage à vous offrir une satisfaction totale. Si toutefois votre acquisition ne répondait pas à vos attentes, vous disposez de 14 jours après réception pour demander un retour ou un échange.</p>

    <hr className="legal-divider"/>

    <h2>Conditions de Retour</h2>
    <p>Afin d'être éligibles à un remboursement ou à un échange, les pièces doivent nous être restituées dans un état irréprochable :</p>
    <ul>
        <li>Articles non portés et non lavés</li>
        <li>Étiquettes d’origine intactes et attachées</li>
        <li>Emballage initial préservé</li>
    </ul>
    <p><strong>Exceptions :</strong> Par mesure d'hygiène et d'exclusivité, les sous-vêtements, les articles personnalisés, les articles soldés et les cartes cadeaux ne sont ni repris ni échangés (sauf en cas de défaut avéré).</p>

    <h2>Procédure de Retour</h2>
    <p>Pour initier une demande, nous vous invitons à suivre ces étapes :</p>
    <ul>
        <li>Contactez-nous à l'adresse <a href="mailto:nahilys.contact@gmail.com">nahilys.contact@gmail.com</a> en précisant votre numéro de commande.</li>
        <li>Après validation par notre service client, veuillez renvoyer votre colis à l'adresse suivante :</li>
    </ul>
    
    <blockquote>
        <strong>Leticia Ferhi</strong><br/>
        4 rue Youri Gagarine<br/>
        78280 Guyancourt, France
    </blockquote>

    <p><em>Note : Les frais de retour demeurent à la charge exclusive du Client.</em></p>

    <h2>Échanges & Disponibilités</h2>
    <p>Les échanges sont honorés sous réserve de disponibilité au sein de notre atelier. À défaut de stock disponible pour la pièce souhaitée, un remboursement complet sera automatiquement effectué.</p>

    <h2>Remboursement</h2>
    <p>Dès réception et après vérification de l'état des articles par nos experts, le remboursement sera crédité sous <strong>5 jours ouvrés</strong> via le mode de paiement initialement utilisé lors de votre achat.</p>

    <h2>Article Défectueux ou Erreur</h2>
    <p>Dans le cas exceptionnel d'un article défectueux ou d'une erreur de notre part, nous vous invitons à nous contacter sous <strong>48 heures</strong> à <a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a>. Les frais de retour seront alors intégralement pris en charge par la Maison Nahilys.</p>
</section>
      <Footer />
    </div>
  );
}
