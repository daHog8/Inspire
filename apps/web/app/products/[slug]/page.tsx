"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AddToCartButton } from "../../../components/add-to-cart-button";
import { AvailabilityPanel } from "../../../components/availability-panel";
import { Footer } from "../../../components/footer";
import { ReserveButton } from "../../../components/reserve-button";
import { SiteHeader } from "../../../components/site-header";
import { LuxuryBadge } from "../../../components/ui/luxury-badge";
import { API_URL, Product } from "../../../lib/api";

const profileByFamily: Record<string, { intensity: number; longevity: string; projection: string; seasons: string[]; occasions: string[] }> = {
  Gourmand: { intensity: 4, longevity: "8 à 10 h", projection: "Enveloppante", seasons: ["Automne", "Hiver"], occasions: ["Soirée", "Rendez-vous"] },
  "Oriental boisé": { intensity: 5, longevity: "10 à 12 h", projection: "Intense", seasons: ["Automne", "Hiver"], occasions: ["Soirée", "Cérémonie"] },
  Aquatique: { intensity: 3, longevity: "6 à 8 h", projection: "Fraîche", seasons: ["Printemps", "Été"], occasions: ["Quotidien", "Travail"] },
};

function getProfile(product: Product) {
  const direct = profileByFamily[product.family];
  if (direct) return direct;
  const family = product.family.toLowerCase();
  if (family.includes("gourmand")) return profileByFamily.Gourmand;
  if (family.includes("oriental") || family.includes("oud") || family.includes("boisé")) return profileByFamily["Oriental boisé"];
  if (family.includes("aquatique") || family.includes("frais") || family.includes("hespéridé")) return profileByFamily.Aquatique;
  return { intensity: 4, longevity: "8 à 10 h", projection: "Équilibrée", seasons: ["Toute saison"], occasions: ["Quotidien", "Sortie"] };
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    fetch(`${API_URL}/api/v1/products/${params.slug}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Produit introuvable");
        return response.json();
      })
      .then(setProduct)
      .catch(() => setFailed(true));
  }, [params.slug]);

  const profile = useMemo(() => (product ? getProfile(product) : null), [product]);

  if (failed) {
    return (
      <main className="page-shell">
        <SiteHeader />
        <div className="product-state">
          <h1>Produit introuvable.</h1>
          <Link href="/catalogue" className="text-link">Retour au catalogue</Link>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product || !profile) {
    return <main className="page-shell"><SiteHeader /><div className="product-state">Chargement du parfum…</div></main>;
  }

  const available = (product.inventory?.quantity ?? 0) > 0;
  const image = product.images?.[0];
  const story = `${product.name} révèle une signature ${product.family.toLowerCase()}, construite autour de ${[...product.top_notes, ...product.heart_notes, ...product.base_notes].slice(0, 3).join(", ")}. Une création pensée pour laisser un sillage personnel, élégant et mémorable.`;

  return (
    <main className="page-shell product-page">
      <SiteHeader />

      <nav className="product-breadcrumb container-inspire" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link><span>/</span><Link href="/catalogue">Catalogue</Link><span>/</span><span>{product.name}</span>
      </nav>

      <section className="product-detail container-inspire">
        <div className="product-gallery">
          <div className="product-gallery__main">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt_text || product.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
                className="product-gallery__image"
              />
            ) : (
              <div className="product-gallery__fallback">INSPIRE</div>
            )}
          </div>
          <div className="product-gallery__caption">
            <span>Visuel produit</span>
            <span>{product.volume_ml} ml</span>
          </div>
        </div>

        <div className="product-info">
          <div className="product-info__badges">
            <LuxuryBadge>{product.collection}</LuxuryBadge>
            <LuxuryBadge tone="gold">Extrait de parfum</LuxuryBadge>
          </div>
          <p className="eyebrow">{product.family}</p>
          <h1>{product.name}</h1>
          <p className="product-info__subtitle">Une fragrance de caractère, pensée pour accompagner les moments qui comptent.</p>

          <div className="product-info__price">
            <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
            <span>{product.volume_ml} ml · {product.category.name}</span>
          </div>

          {product.reference_code ? <p className="product-reference">Référence {product.reference_code}</p> : null}
          <p className="product-description">{product.description}</p>

          <div className="olfactive-pyramid" aria-label="Pyramide olfactive">
            <NoteBlock title="Notes de tête" notes={product.top_notes} />
            <NoteBlock title="Notes de cœur" notes={product.heart_notes} />
            <NoteBlock title="Notes de fond" notes={product.base_notes} />
          </div>

          <div className="product-actions">
            <AddToCartButton disabled={!available} product={{ id: product.id, slug: product.slug, name: product.name, price: product.price, volume_ml: product.volume_ml, collection: product.collection }} />
            <ReserveButton productId={product.id} />
          </div>

          <div className="product-reassurance" aria-label="Garanties INSPIRE">
            <span>Extrait de parfum</span>
            <span>Disponibilité vérifiée</span>
            <span>France & Gabon</span>
          </div>
        </div>
      </section>

      <section className="product-availability-section">
        <div className="container-inspire">
          <div className="product-section-heading">
            <div><p className="eyebrow">Disponibilité réelle</p><h2>France & Gabon</h2></div>
            <p>Délai annoncé avant paiement</p>
          </div>
          <AvailabilityPanel slug={product.slug} />
        </div>
      </section>

      <section className="product-experience section-space">
        <div className="container-inspire product-experience__layout">
          <div className="product-experience__intro">
            <p className="eyebrow">L’expérience olfactive</p>
            <h2>Une signature qui vous ressemble.</h2>
            <p>{story}</p>
          </div>

          <div className="product-profile-grid">
            <ProfileCard title="Intensité">
              <div className="intensity-dots" aria-label={`${profile.intensity} sur 5`}>
                {[1, 2, 3, 4, 5].map((n) => <span key={n} className={n <= profile.intensity ? "is-active" : ""} />)}
              </div>
            </ProfileCard>
            <ProfileCard title="Tenue"><strong>{profile.longevity}</strong><span>sur peau selon les conditions</span></ProfileCard>
            <ProfileCard title="Projection"><strong>{profile.projection}</strong><span>un sillage présent et maîtrisé</span></ProfileCard>
            <ProfileCard title="Moment idéal"><strong>{profile.occasions.join(" · ")}</strong><span>{profile.seasons.join(" · ")}</span></ProfileCard>
          </div>
        </div>
      </section>

      <section className="application-section section-space">
        <div className="container-inspire application-grid">
          <div className="application-intro">
            <p className="eyebrow">Conseils d’application</p>
            <h2>Faites durer votre sillage.</h2>
            <p>Quelques gestes simples pour révéler pleinement la fragrance et accompagner son évolution.</p>
          </div>
          <div className="application-list">
            <ApplicationTip number="01" title="Points de pulsation">Vaporisez sur les poignets, le cou et derrière les oreilles.</ApplicationTip>
            <ApplicationTip number="02" title="Préserver les notes">Évitez de frotter le parfum après application.</ApplicationTip>
            <ApplicationTip number="03" title="Prolonger la diffusion">Vaporisez légèrement sur les vêtements, à bonne distance.</ApplicationTip>
          </div>
        </div>
      </section>

      <section className="product-trust-section">
        <div className="container-inspire product-trust-grid">
          <TrustItem title="Sélection exigeante" text="Des fragrances choisies pour leur caractère et leur tenue." />
          <TrustItem title="Stock transparent" text="Une disponibilité distincte pour la France et le Gabon." />
          <TrustItem title="Service attentif" text="Un accompagnement humain avant et après votre commande." />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function NoteBlock({ title, notes }: { title: string; notes: string[] }) {
  return <div className="note-block"><span>{title}</span><strong>{notes.join(" · ")}</strong></div>;
}

function ProfileCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="profile-card"><p>{title}</p>{children}</article>;
}

function ApplicationTip({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <article className="application-tip"><span>{number}</span><div><h3>{title}</h3><p>{children}</p></div></article>;
}

function TrustItem({ title, text }: { title: string; text: string }) {
  return <article className="product-trust-item"><span aria-hidden="true">✓</span><div><h3>{title}</h3><p>{text}</p></div></article>;
}
