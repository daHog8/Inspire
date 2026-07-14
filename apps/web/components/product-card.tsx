import Link from "next/link";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${product.accent}`}>
          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/5" />

          <div className="absolute inset-x-0 bottom-0 top-1/4 flex items-end justify-center pb-10">
            <div className="relative h-52 w-32 rounded-t-[3rem] border border-white/60 bg-white/35 shadow-2xl backdrop-blur-sm transition duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03]">
              <div className="absolute left-1/2 top-[-28px] h-10 w-14 -translate-x-1/2 bg-black/80" />
              <div className="absolute inset-x-3 bottom-8 border border-black/40 bg-white/65 p-3 text-center">
                <p className="serif text-lg tracking-widest">INSPIRE</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em]">{product.name}</p>
              </div>
            </div>
          </div>

          <span className="absolute left-4 top-4 bg-white/85 px-3 py-1 text-[11px] uppercase tracking-widest">
            {product.collection}
          </span>
        </div>

        <div className="pt-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{product.family}</p>
          <h3 className="serif mt-2 text-2xl transition duration-300 group-hover:text-[#9a7242]">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">{product.notes.join(" · ")}</p>

          <div className="mt-4 flex items-center justify-between">
            <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
            <span className="border-b border-black pb-1 text-xs uppercase tracking-widest transition duration-300 group-hover:border-[#9a7242] group-hover:text-[#9a7242]">
              Découvrir
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
