import { GlobeIcon, ShieldIcon, SparklesIcon, TruckIcon } from "./ui/icons";

const promises = [
  { icon: SparklesIcon, title: "Extraits sélectionnés", text: "Des signatures intenses et mémorables" },
  { icon: TruckIcon, title: "Livraison maîtrisée", text: "Expédition depuis la France ou le Gabon" },
  { icon: GlobeIcon, title: "France & Gabon", text: "Disponibilité locale clairement affichée" },
  { icon: ShieldIcon, title: "Achat en confiance", text: "Réservation de stock et paiement sécurisé" },
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Les engagements INSPIRE">
      <div className="container-inspire trust-strip__grid">
        {promises.map(({ icon: Icon, title, text }) => (
          <div key={title} className="trust-strip__item">
            <Icon className="trust-strip__icon" />
            <div><strong>{title}</strong><p>{text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
