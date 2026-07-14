import Link from "next/link";
import { Suspense } from "react";

import { CatalogueClient } from "../../components/catalogue-client";

export const metadata = {
  title: "Catalogue | INSPIRE",
  description:
    "Découvrez les parfums INSPIRE pour femme, homme et à partager.",
};

function CatalogueLoading() {
  return (
    <div className="py-20 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
        Chargement du catalogue…
      </p>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <header className="border-b border-black/10">
        <div className="container-inspire flex h-20 items-center justify-between">
          <Link
            href="/"
            className="serif text-2xl tracking-[0.25em]"
          >
            INSPIRE
          </Link>

          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em]"
          >
            Retour à l’accueil
          </Link>
        </div>
      </header>

      <section className="container-inspire py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-[#9a7242]">
          La collection
        </p>

        <h1 className="serif mt-4 text-5xl md:text-6xl">
          Trouvez votre signature.
        </h1>

        <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
          Explorez nos créations par univers, famille olfactive ou intensité.
        </p>

        <Suspense fallback={<CatalogueLoading />}>
          <CatalogueClient />
        </Suspense>
      </section>
    </main>
  );
}