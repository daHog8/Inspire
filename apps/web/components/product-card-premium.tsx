import Image from "next/image";
import Link from "next/link";
import { LuxuryBadge } from "./ui/luxury-badge";

type ProductCardPremiumProps = {
  product: {
    id: number;
    slug: string;
    name: string;
    collection: string;
    family: string;
    price: number;
    volume_ml?: number;
    image?: string;
    notes?: string[];
    quantity?: number | null;
  };
  priority?: boolean;
};

function palette(collection: string) {
  if (collection === "Femme") return "product-visual--rose";
  if (collection === "Homme") return "product-visual--smoke";
  return "product-visual--sage";
}

export function ProductCardPremium({ product, priority = false }: ProductCardPremiumProps) {
  const lowStock = typeof product.quantity === "number" && product.quantity > 0 && product.quantity <= 5;

  return (
    <article className="product-card-premium">
      <Link href={`/products/${product.slug}`} className="product-card-premium__link">
        <div className={`product-visual ${palette(product.collection)}`}>
          <div className="product-card-premium__badges">
            <LuxuryBadge>{product.collection}</LuxuryBadge>
            {lowStock ? <LuxuryBadge tone="gold">Stock limité</LuxuryBadge> : null}
          </div>

          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="product-card-premium__image"
            />
          ) : (
            <div className="inspire-bottle" aria-hidden="true">
              <div className="inspire-bottle__cap" />
              <div className="inspire-bottle__label">
                <span>INSPIRE</span>
                <small>{product.name}</small>
              </div>
            </div>
          )}

          <span className="product-card-premium__quick">Voir le parfum</span>
        </div>

        <div className="product-card-premium__content">
          <p className="product-card-premium__family">{product.family}</p>
          <h3>{product.name}</h3>
          {product.notes?.length ? <p className="product-card-premium__notes">{product.notes.join(" · ")}</p> : null}
          <div className="product-card-premium__meta">
            <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
            {product.volume_ml ? <span>{product.volume_ml} ml</span> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
