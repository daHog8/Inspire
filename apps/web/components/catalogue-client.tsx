"use client";

import Link from "next/link";
import { ProductCardPremium } from "./product-card-premium";
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
      <div className="catalogue-toolbar-heading">
        <div><p className="eyebrow">Sélection active</p><h2>{collectionTitle}</h2></div>
        {collection ? <Link href="/catalogue" className="text-link">Effacer le filtre</Link> : null}
      </div>

      <form onSubmit={handleSearch} className="catalogue-filters">
        <label className="catalogue-field catalogue-field--search"><span>Rechercher</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nom, famille olfactive…" /></label>
        <label className="catalogue-field"><span>Collection</span><select value={collection} onChange={(event) => setCollection(event.target.value)} aria-label="Filtrer par collection"><option value="">Toutes</option><option value="Femme">Femme</option><option value="Homme">Homme</option><option value="Mixte">Mixte</option></select></label>
        <label className="catalogue-field"><span>Trier par</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Trier le catalogue"><option value="name">Nom</option><option value="price_asc">Prix croissant</option><option value="price_desc">Prix décroissant</option></select></label>
        <button className="catalogue-search-button">Rechercher →</button>
      </form>

      <div className="catalogue-result-line"><span>{total} parfum{total > 1 ? "s" : ""}</span><span>France · Gabon</span></div>

      {loading ? <div className="catalogue-status">Chargement du catalogue…</div> : error ? <div className="catalogue-status catalogue-status--error">{error}</div> : products.length === 0 ? (
        <div className="catalogue-empty"><p>Aucun parfum trouvé.</p><span>Modifiez les filtres ou affichez tout le catalogue.</span></div>
      ) : (
        <div className="premium-product-grid premium-product-grid--catalogue">
          {products.map((product, index) => <ProductCardPremium key={product.id} priority={index < 3} product={{ id: product.id, slug: product.slug, name: product.name, collection: product.collection, family: product.family, price: product.price, volume_ml: product.volume_ml, image: product.images?.[0]?.url, notes: [...product.top_notes.slice(0, 1), ...product.heart_notes.slice(0, 1), ...product.base_notes.slice(0, 1)], quantity: product.inventory?.quantity ?? null }} />)}
        </div>
      )}
    </div>
  );
}
