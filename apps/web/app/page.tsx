import Link from "next/link";

import { Footer } from "../components/footer";
import { ProductCardPremium } from "../components/product-card-premium";
import { SiteHeader } from "../components/site-header";
import { TrustStrip } from "../components/trust-strip";
import { LuxuryButton } from "../components/ui/luxury-button";
import { SectionHeading } from "../components/ui/section-heading";
import { featuredProducts } from "../data/products";

const collections = [
  { title: "Élégance florale", label: "Pour elle", text: "Rose, jasmin et muscs délicats composent des sillages lumineux.", href: "/catalogue?collection=Femme", className: "collection-card--rose" },
  { title: "Caractère boisé", label: "Pour lui", text: "Des bois profonds, des épices et une fraîcheur parfaitement maîtrisée.", href: "/catalogue?collection=Homme", className: "collection-card--wood" },
  { title: "Signatures libres", label: "À partager", text: "Des créations sans frontière, pensées pour être portées selon l’envie.", href: "/catalogue?collection=Mixte", className: "collection-card--sage" },
];

export default function HomePage() {
  return (
    <main>
      <section className="luxury-hero">
        <div className="luxury-hero__glow" />
        <div className="luxury-hero__bottle" aria-hidden="true">
          <div className="luxury-hero__bottle-cap" />
          <div className="luxury-hero__bottle-label"><span>INSPIRE</span><small>PARIS · LIBREVILLE</small></div>
        </div>
        <SiteHeader theme="dark" />
        <div className="container-inspire luxury-hero__content">
          <p className="eyebrow eyebrow--light animate-fade-up">Nouvelle maison de parfums</p>
          <h1 className="hero-title animate-fade-up-delay">Une fragrance.<br /><em>Votre signature.</em></h1>
          <p className="luxury-hero__lead animate-fade-up-delay-2">Des compositions choisies pour raconter votre personnalité, disponibles en France et au Gabon.</p>
          <div className="luxury-hero__actions animate-fade-up-delay-2">
            <LuxuryButton href="/catalogue" variant="light">Découvrir la collection</LuxuryButton>
            <a href="#histoire" className="text-link text-link--light">Entrer dans l’univers</a>
          </div>
        </div>
        <div className="luxury-hero__scroll">Découvrir <span /></div>
      </section>

      <TrustStrip />

      <section className="section-space">
        <div className="container-inspire">
          <SectionHeading eyebrow="Nos univers" title={<>Choisissez l’émotion<br />que vous voulez laisser.</>} description="Trois portes d’entrée, une même exigence : trouver une fragrance qui vous ressemble vraiment." align="center" />
          <div className="collection-grid">
            {collections.map((collection, index) => (
              <Link key={collection.title} href={collection.href} className={`collection-card ${collection.className}`}>
                <span className="collection-card__number">0{index + 1}</span>
                <div><p>{collection.label}</p><h3>{collection.title}</h3><span className="collection-card__description">{collection.text}</span><span className="collection-card__link">Explorer la collection →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="selection" className="section-space section-tinted">
        <div className="container-inspire">
          <div className="section-intro-row">
            <SectionHeading eyebrow="Sélection INSPIRE" title="Les signatures du moment" description="Des fragrances choisies pour leur caractère, leur tenue et leur capacité à devenir inoubliables." />
            <Link href="/catalogue" className="text-link">Voir tout le catalogue</Link>
          </div>
          <div className="premium-product-grid">
            {featuredProducts.map((product, index) => (
              <ProductCardPremium key={product.id} priority={index < 2} product={{ ...product, volume_ml: 50 }} />
            ))}
          </div>
        </div>
      </section>

      <section id="histoire" className="brand-story">
        <div className="brand-story__visual">
          <div className="brand-story__rings" />
          <p>INSPIRE</p><span>L’inspiration sur la peau</span>
        </div>
        <div className="brand-story__content">
          <p className="eyebrow eyebrow--gold">La maison</p>
          <h2 className="display-title display-title--light">Le parfum est une mémoire que l’on choisit de porter.</h2>
          <p>INSPIRE est née d’une conviction simple : une fragrance ne complète pas seulement une tenue. Elle révèle une présence, accompagne un instant et grave un souvenir.</p>
          <p>Notre sélection réunit des univers olfactifs accessibles, intenses et expressifs, avec une disponibilité pensée pour la France comme pour le Gabon.</p>
          <LuxuryButton href="/catalogue" variant="gold">Explorer nos fragrances</LuxuryButton>
        </div>
      </section>

      <section className="section-space consultation-section">
        <div className="container-inspire consultation-section__inner">
          <p className="eyebrow">Inspire Match</p>
          <h2 className="display-title">Votre prochain parfum<br />commence par une émotion.</h2>
          <p>Un futur parcours guidé vous aidera à choisir selon vos goûts, vos habitudes et l’empreinte que vous souhaitez laisser.</p>
          <LuxuryButton href="/catalogue" variant="dark">Commencer par le catalogue</LuxuryButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
