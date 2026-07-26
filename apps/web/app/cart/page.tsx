"use client";

import Link from "next/link";
import { useCart } from "../../context/cart-context";

export default function CartPage() {
  const {
    items,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const shipping = subtotal >= 120 || subtotal === 0 ? 0 : 7.9;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <header className="border-b border-black/10">
        <div className="container-inspire flex h-20 items-center justify-between">
          <Link href="/" className="serif text-2xl tracking-[0.25em]">
            INSPIRE
          </Link>
          <Link href="/catalogue" className="text-xs uppercase tracking-[0.2em]">
            Continuer mes achats
          </Link>
        </div>
      </header>

      <section className="container-inspire py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-[#9a7242]">
          Votre sélection
        </p>
        <h1 className="serif mt-4 text-5xl md:text-6xl">Panier</h1>

        {items.length === 0 ? (
          <div className="mt-12 border border-black/10 bg-white py-20 text-center">
            <p className="serif text-3xl">Votre panier est vide.</p>
            <p className="mt-4 text-neutral-500">
              Découvrez les fragrances qui pourraient vous inspirer.
            </p>
            <Link
              href="/catalogue"
              className="mt-8 inline-block bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#9a7242]"
            >
              Explorer le catalogue
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-6 border-b border-black/10 pb-6 sm:grid-cols-[140px_1fr_auto]"
                >
                  <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-[#ead9b6] to-[#b48250]">
                    <div className="relative h-28 w-20 rounded-t-[2rem] border border-white/60 bg-white/30 shadow-lg">
                      <div className="absolute left-1/2 top-[-16px] h-6 w-9 -translate-x-1/2 bg-black/80" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      {item.collection}
                    </p>
                    <Link
                      href={`/products/${item.slug}`}
                      className="serif mt-2 block text-2xl hover:text-[#9a7242]"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-2 text-sm text-neutral-500">
                      {item.volume_ml} ml
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-5 text-xs uppercase tracking-[0.15em] text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-6 sm:flex-col sm:items-end">
                    <strong>
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </strong>

                    <div className="flex items-center border border-black/20">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-2"
                      >
                        −
                      </button>
                      <span className="min-w-10 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Vider le panier
              </button>
            </div>

            <aside className="h-fit bg-[#f8f3eb] p-8">
              <h2 className="serif text-3xl">Récapitulatif</h2>

              <div className="mt-8 space-y-4 border-b border-black/10 pb-6 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>
                    {shipping === 0
                      ? "Offerte"
                      : `${shipping.toFixed(2).replace(".", ",")} €`}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-lg">
                <strong>Total</strong>
                <strong>{total.toFixed(2).replace(".", ",")} €</strong>
              </div>

              {subtotal < 120 && (
                <p className="mt-5 text-sm leading-6 text-neutral-600">
                  Plus que {(120 - subtotal).toFixed(2).replace(".", ",")} € pour
                  bénéficier de la livraison offerte.
                </p>
              )}

              <button
                type="button"
                className="mt-8 w-full bg-black px-8 py-5 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#9a7242]"
              >
                Passer au paiement
              </button>

              <p className="mt-5 text-center text-xs leading-5 text-neutral-500">
                Paiement sécurisé. La connexion à Stripe arrivera au prochain
                sprint.
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
