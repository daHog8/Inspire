"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/api";

type Availability = {
  selected_source: "GABON" | "FRANCE" | null;
  status: "LOCAL" | "FRANCE" | "UNAVAILABLE";
  available_quantity: number;
  customer_message: string;
};

export function AvailabilityBadge({ slug }: { slug: string }) {
  const [data, setData] = useState<Availability | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/products/${slug}/availability`, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => setData(null));
  }, [slug]);

  if (!data) return <span className="text-sm text-neutral-500">Vérification du stock…</span>;

  const label =
    data.status === "LOCAL" ? "Disponible au Gabon"
    : data.status === "FRANCE" ? "Disponible depuis la France"
    : "Indisponible";

  const classes =
    data.status === "LOCAL" ? "bg-emerald-100 text-emerald-800"
    : data.status === "FRANCE" ? "bg-amber-100 text-amber-900"
    : "bg-red-100 text-red-800";

  return (
    <div>
      <span className={`inline-flex px-3 py-2 text-xs uppercase tracking-[0.14em] ${classes}`}>{label}</span>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{data.customer_message}</p>
    </div>
  );
}
