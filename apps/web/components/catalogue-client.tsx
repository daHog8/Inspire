"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { API_URL, Product, ProductList } from "../lib/api";

const ALLOWED_COLLECTIONS = new Set(["Femme", "Homme", "Mixte"]);

export function CatalogueClient() {
  const searchParams = useSearchParams();

  const initialCollection = useMemo(() => {
    const value = searchParams.get("collection");
    return value && ALLOWED_COLLECTIONS.has(value) ? value : "";
  }, [searchParams]);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState(initialCollection);
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts(
    selectedCollection = collection,
    selectedSort = sort,
    selectedSearch = search,
  ) {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();

    if (selectedSearch.trim()) {
      params.set("search", selectedSearch.trim());
    }

    if (selectedCollection) {
      params.set("collection", selectedCollection);
    }

    params.set("sort", selectedSort);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/products?${params.toString()}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error("Impossible de charger le catalogue");
      }

      const payload: ProductList = await response.json();
      setProducts(payload.items);
      setTotal(payload.total);
    } catch {
      setProducts([]);
      setTotal(0);
      setError("Le catalogue est momentanément indisponible.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCollection(initialCollection);
    loadProducts(initialCollection, sort, search);
    // L'URL pilote le filtre lorsque l'utilisateur arrive depuis la landing page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCollection]);

  useEffect(() => {
    loadProducts(collection, sort, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, sort]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadProducts(collection, sort, search);
  }

  const collectionTitle =
    collection === "Femme"
      ? "Parfums pour elle"
      : collection === "Homme"
        ? "Parfums pour lui"
        : collection === "Mixte"
          ? "Parfums à partager"
          : "Tous les parfums";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#9a7242]">
            Sélection active
          </p>
          <h2 className="serif mt-2 text-3xl">{collectionTitle}</h2>
        </div>

        {collection && (
          <Link
            href="/catalogue"
            className="border-b border-black pb-1 text-xs uppercase tracking-[0.18em] transition hover:text-[#9a7242]"
          >
            Afficher tout le catalogue
          </Link>
        )}
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-10 grid gap-4 border-y border-black/10 py-6 md:grid-cols-[1fr_220px_220px_auto]"
      >
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un parfum ou une famille..."
          className="border border-black/20 bg-white px-4 py-3 outline-none transition focus:border-black"
        />

        <select
          value={collection}
          onChange={(event) => setCollection(event.target.value)}
          className="border border-black/20 bg-white px-4 py-3"
          aria-label="Filtrer par collection"
        >
          <option value="">Toutes les collections</option>
          <option value="Femme">Femme</option>
          <option value="Homme">Homme</option>
          <option value="Mixte">Mixte</option>
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="border border-black/20 bg-white px-4 py-3"
          aria-label="Trier le catalogue"
        >
          <option value="name">Nom</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>

        <button className="bg-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#9a7242]">
          Rechercher
        </button>
      </form>

      <p className="mb-8 text-sm text-neutral-500">
        {total} parfum{total > 1 ? "s" : ""}
      </p>

      {loading ? (
        <p className="py-20 text-center">Chargement du catalogue…</p>
      ) : error ? (
        <p className="py-20 text-center text-red-700">{error}</p>
      ) : products.length === 0 ? (
        <div className="border border-black/10 bg-white py-20 text-center">
          <p className="serif text-3xl">Aucun parfum trouvé.</p>
          <p className="mt-3 text-neutral-500">
            Modifiez les filtres ou affichez tout le catalogue.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="group">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#ead9b6] to-[#b48250]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-64 w-40 rounded-t-[4rem] border border-white/60 bg-white/30 shadow-2xl backdrop-blur-sm transition duration-500 group-hover:-translate-y-3 group-hover:scale-[1.03]">
                      <div className="absolute left-1/2 top-[-30px] h-12 w-16 -translate-x-1/2 bg-black/85" />
                      <div className="absolute inset-x-4 bottom-10 border border-black/30 bg-white/70 p-4 text-center">
                        <p className="serif text-xl tracking-widest">INSPIRE</p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em]">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="absolute left-4 top-4 bg-white/85 px-3 py-1 text-[11px] uppercase tracking-widest">
                    {product.collection}
                  </span>
                </div>

                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {product.family}
                </p>

                <h3 className="serif mt-2 text-3xl transition duration-300 group-hover:text-[#9a7242]">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
                  <span className="text-sm text-neutral-500">
                    {product.volume_ml} ml
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
