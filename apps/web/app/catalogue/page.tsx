import { Suspense } from "react";
import { CatalogueClient } from "../../components/catalogue-client";
import { Footer } from "../../components/footer";
import { SiteHeader } from "../../components/site-header";

export const metadata = { title: "Catalogue | INSPIRE", description: "Découvrez les parfums INSPIRE pour femme, homme et à partager." };

function CatalogueLoading() { return <div className="catalogue-status">Chargement du catalogue…</div>; }

export default function CataloguePage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="catalogue-hero">
        <div className="container-inspire">
          <p className="eyebrow">La collection</p>
          <h1 className="page-title">Trouvez votre signature.</h1>
          <p>Explorez nos créations par univers, famille olfactive ou prix. Chaque fiche vous indique clairement la disponibilité.</p>
        </div>
      </section>
      <section className="container-inspire catalogue-section">
        <Suspense fallback={<CatalogueLoading />}><CatalogueClient /></Suspense>
      </section>
      <Footer />
    </main>
  );
}
