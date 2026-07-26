"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AddToCartButton } from "../../../components/add-to-cart-button";
import { API_URL, Product } from "../../../lib/api";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/products/${params.slug}`)
      .then((response) => {
        if (!response.ok) throw new Error("Produit introuvable");
        return response.json();
      })
      .then(setProduct)
      .catch(() => setFailed(true));
  }, [params.slug]);

  if (failed) {
    return (
      <main className="container-inspire py-24">
        <p>Produit introuvable.</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container-inspire py-24">
        <p>Chargement…</p>
      </main>
    );
  }

  const available = (product.inventory?.quantity ?? 0) > 0;

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <header className="border-b border-black/10">
        <div className="container-inspire flex h-20 items-center justify-between">
          <Link href="/" className="serif text-2xl tracking-[0.25em]">
            INSPIRE
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/catalogue" className="text-xs uppercase tracking-[0.2em]">
              Catalogue
            </Link>
            <Link href="/cart" className="text-xs uppercase tracking-[0.2em]">
              Panier
            </Link>
          </div>
        </div>
      </header>

      <section className="container-inspire grid gap-12 py-16 md:grid-cols-2">
        <div className="flex min-h-[620px] items-center justify-center bg-gradient-to-br from-[#ead9b6] to-[#9f7549]">
          <div className="relative h-96 w-60 rounded-t-[6rem] border border-white/60 bg-white/30 shadow-2xl backdrop-blur-sm">
            <div className="absolute left-1/2 top-[-46px] h-16 w-24 -translate-x-1/2 bg-black/85" />
            <div className="absolute inset-x-5 bottom-16 border border-black/30 bg-white/70 p-6 text-center">
              <p className="serif text-3xl tracking-widest">INSPIRE</p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em]">
                {product.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9a7242]">
              {product.collection} · {product.family}
            </p>
            <h1 className="serif mt-5 text-5xl md:text-6xl">{product.name}</h1>
            <p className="mt-5 text-2xl">
              {product.price.toFixed(2).replace(".", ",")} €
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              {product.volume_ml} ml
            </p>
            <p className="mt-8 leading-8 text-neutral-600">
              {product.description}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <NoteBlock title="Tête" notes={product.top_notes} />
              <NoteBlock title="Cœur" notes={product.heart_notes} />
              <NoteBlock title="Fond" notes={product.base_notes} />
            </div>

            <p className={`mt-8 text-sm ${available ? "text-emerald-700" : "text-red-700"}`}>
              {available
                ? `${product.inventory?.quantity} exemplaire(s) disponible(s)`
                : "Rupture de stock"}
            </p>

            <AddToCartButton
              disabled={!available}
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                volume_ml: product.volume_ml,
                collection: product.collection,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function NoteBlock({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div className="border-t border-black/20 pt-4">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{title}</p>
      <p className="mt-2 text-sm leading-6">{notes.join(" · ")}</p>
    </div>
  );
}
