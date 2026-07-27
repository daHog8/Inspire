"use client";

import { useEffect, useState } from "react";

import { API_URL, ProductAvailability } from "../lib/api";

export function AvailabilityPanel({ slug }: { slug: string }) {
  const [data, setData] = useState<ProductAvailability | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/products/${slug}/availability`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Disponibilité inaccessible");
        }
        return response.json();
      })
      .then(setData)
      .catch(() => setFailed(true));
  }, [slug]);

  if (failed) {
    return (
      <p className="mt-8 text-sm text-red-700">
        Les stocks n’ont pas pu être chargés.
      </p>
    );
  }

  if (!data) {
    return <p className="mt-8 text-sm text-neutral-500">Vérification des stocks…</p>;
  }

  return (
    <section className="mt-9 border-y border-black/10 py-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Disponibilité réelle
          </p>
          <p className="serif mt-2 text-2xl">
            France &amp; Gabon
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          Délai annoncé avant paiement
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.options.map((option) => {
          const available = option.available_quantity > 0;
          const local = option.location_code === "GABON";
          return (
            <article
              key={option.location_code}
              className={`border p-5 ${
                available
                  ? local
                    ? "border-emerald-700/30 bg-emerald-50"
                    : "border-amber-700/30 bg-amber-50"
                  : "border-black/10 bg-neutral-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <strong className="text-sm">
                  {local ? "Stock Gabon" : "Stock France"}
                </strong>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    available ? (local ? "bg-emerald-600" : "bg-amber-500") : "bg-neutral-300"
                  }`}
                />
              </div>
              <p className="mt-4 text-2xl">{option.available_quantity}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                exemplaire(s) disponible(s)
              </p>
              <p className="mt-4 text-sm leading-6 text-neutral-700">
                {available
                  ? `Livraison estimée : ${option.delivery_days_min} à ${option.delivery_days_max} jour(s).`
                  : "Rupture sur ce lieu de stockage."}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
