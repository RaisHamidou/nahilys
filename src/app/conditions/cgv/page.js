import React from "react";
import Header from "../../../../components/Layout/Header/Header";
import Footer from "../../../../components/Layout/Footer/Footer";
import TitleSection from "../../../../components/Elements/TitleSection/TitleSection";

export default function page() {
  return (
    <div>
      <Header />
        
      <section className="legal-container">
      <TitleSection title={"Conditions générales de vente (CGV) - vente a distance"}/>
    <p className="legal-intro">Les présentes Conditions Générales de Vente régissent les relations contractuelles entre <strong>Nahilys</strong> et ses Clients, définissant un cadre de confiance et d'excellence pour chaque acquisition.</p>

    <hr className="legal-divider"/>

    <h2>Article 1 — Identification du vendeur</h2>
    <p>Les ventes conclues à distance via ce site sont assurées par :</p>
    <ul>
        <li><strong>Entreprise individuelle :</strong> Nahilys</li>
        <li><strong>Adresse :</strong> 4 Rue Youri Gagarine, 78280 Guyancourt, France</li>
        <li><strong>SIREN :</strong> 939 248 514 — RCS Versailles</li>
        <li><strong>Contact :</strong> 07 65 20 45 39 | <a href="mailto:Nahilys.contact@gmail.com">Nahilys.contact@gmail.com</a></li>
    </ul>

    <h2>Article 2 — Champ d’application</h2>
    <p>Les présentes CGV s’appliquent à toutes les créations de prêt-à-porter réalisées à distance. Toute commande confirme l’acceptation pleine et entière de ces dispositions de vente.</p>

    <h2>Article 3 — Produits</h2>
    <p>Nos pièces et accessoires sont présentés avec la plus grande précision. Toutefois, les photographies, bien que fidèles, conservent un caractère non contractuel. Les offres sont honorées dans la limite de la disponibilité de nos stocks.</p>

    <h2>Article 4 — Prix</h2>
    <p>Nos tarifs sont exprimés en euros (€) TTC. La Maison Nahilys se réserve le droit de réviser ses prix à tout moment ; toutefois, le prix garanti au Client est celui affiché lors de la validation finale de la commande.</p>

    <h2>Article 5 — Commande</h2>
    <h3>5.1 Processus d'acquisition</h3>
    <ul>
        <li>Création de l'espace personnel et sélection des pièces</li>
        <li>Validation du panier de commande</li>
        <li>Renseignement des coordonnées de livraison</li>
        <li>Paiement sécurisé</li>
    </ul>
    <p>La vente est considérée comme définitive après l'envoi de notre confirmation par voie électronique.</p>

    <h2>Article 6 — Paiement</h2>
    <p>Le règlement est exigible à la commande. Nous acceptons les cartes bancaires ainsi que PayPal. Chaque transaction bénéficie d'un protocole de cryptage avancé pour garantir la confidentialité de vos données bancaires.</p>

    <h2>Article 7 — Livraison</h2>
    <p><strong>7.1 Zone :</strong> Expéditions assurées en France métropolitaine.</p>
    <p><strong>7.2 Délais :</strong> La préparation de votre commande nécessite 2 à 5 jours ouvrés. Les délais de transport sont fournis à titre indicatif par nos partenaires logistiques.</p>
    <p><strong>7.3 Réserves :</strong> Nous vous invitons à vérifier l'état de votre colis à réception et à nous signaler toute anomalie sous 48 heures.</p>

    <h2>Article 8 — Droit de rétractation</h2>
    <p>Conformément à la législation, vous disposez d’un délai de 14 jours pour vous rétracter sans motif.</p>
    <h3>8.1 Conditions de retour</h3>
    <p>Pour être éligibles, les articles doivent être restitués dans leur état d’origine :</p>
    <ul>
        <li>Pièces non portées et non lavées</li>
        <li>Étiquettes de la Maison intactes</li>
        <li>Emballage d’origine préservé</li>
    </ul>
    <p><strong>8.2 Remboursement :</strong> Le crédit de votre compte interviendra sous 14 jours après réception et contrôle de la pièce par nos soins.</p>

    <h2>Article 11 — Réserve de propriété</h2>
    <p>Les produits demeurent la propriété exclusive de Nahilys jusqu’au paiement intégral et effectif du prix de vente.</p>

    <h2>Article 14 — Propriété intellectuelle</h2>
    <p>L’ensemble des éléments constituant l’univers de ce site est protégé par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est strictement interdite sans notre accord écrit préalable.</p>

    <h2>Article 15 — Litiges</h2>
    <p>Les présentes conditions sont soumises au droit français. En l'absence de résolution amiable, les tribunaux du ressort de Versailles seront seuls compétents.</p>
</section>
      <Footer />
    </div>
  );
}
