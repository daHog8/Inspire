import Link from "next/link";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ProductCard } from "../components/product-card";
import { featuredProducts } from "../data/products";

const collections = [
  {
    title: "Pour elle",
    text: "Florales, lumineuses et enveloppantes.",
    tone: "bg-[#ead9b6]",
    href: "/catalogue?collection=Femme",
  },
  {
    title: "Pour lui",
    text: "Boisées, fraîches et affirmées.",
    tone: "bg-[#c9a063]",
    href: "/catalogue?collection=Homme",
  },
  {
    title: "À partager",
    text: "Libres, inattendues et sans frontière.",
    tone: "bg-[#d8d2c4]",
    href: "/catalogue?collection=Mixte",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[92vh] overflow-hidden bg-[#171512] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(201,160,99,0.42),transparent_30%),linear-gradient(120deg,#0d0d0d_30%,#32261b)]" />
        <div className="animate-float-soft absolute -right-24 top-24 h-[620px] w-[420px] rounded-[50%] border border-white/20 bg-white/5 shadow-2xl backdrop-blur-sm" />

        <Header />

        <div className="container-inspire relative z-10 flex min-h-[92vh] items-center pt-20">
          <div className="max-w-3xl py-24">
            <p className="animate-fade-up mb-6 text-xs uppercase tracking-[0.35em] text-[#ead9b6]">
              Maison de parfums
            </p>

            <h1 className="animate-fade-up-delay serif text-6xl leading-[0.95] md:text-8xl">
              L’inspiration
              <br />
              sur la peau.
            </h1>

            <p className="animate-fade-up-delay-2 mt-8 max-w-xl text-lg leading-8 text-white/70">
              Trouvez la fragrance qui raconte votre histoire et laisse une empreinte inoubliable.
            </p>

            <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="bg-white px-7 py-4 text-xs uppercase tracking-[0.2em] text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ead9b6]"
              >
                Découvrir le catalogue
              </Link>

              <a
                href="#histoire"
                className="border border-white/50 px-7 py-4 text-xs uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10"
              >
                Notre univers
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="py-24">
        <div className="container-inspire">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9a7242]">Nos univers</p>
            <h2 className="serif mt-4 text-4xl md:text-5xl">Une fragrance pour chaque histoire</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className={`${collection.tone} group flex min-h-80 flex-col justify-end overflow-hidden p-8 transition duration-500 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <h3 className="serif text-4xl transition duration-300 group-hover:translate-x-1">
                  {collection.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6">{collection.text}</p>
                <span className="mt-6 w-fit border-b border-black pb-1 text-xs uppercase tracking-widest">
                  Explorer
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="selection" className="bg-[#f8f3eb] py-24">
        <div className="container-inspire">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9a7242]">Sélection Inspire</p>
              <h2 className="serif mt-4 text-4xl md:text-5xl">Les signatures du moment</h2>
            </div>

            <Link
              href="/catalogue"
              className="text-xs uppercase tracking-[0.2em] transition duration-300 hover:text-[#9a7242]"
            >
              Voir toute la collection →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="histoire" className="grid md:grid-cols-2">
        <div className="min-h-[520px] bg-[radial-gradient(circle_at_center,#ead9b6,#9f7549)]" />

        <div className="flex items-center bg-[#0d0d0d] px-8 py-20 text-white md:px-16">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c9a063]">Notre histoire</p>
            <h2 className="serif mt-5 text-4xl leading-tight md:text-5xl">
              Le parfum comme source d’émotion.
            </h2>
            <p className="mt-7 leading-8 text-white/65">
              Inspire est née d’une conviction : une fragrance ne complète pas seulement une tenue.
              Elle révèle une personnalité, accompagne un instant et grave un souvenir.
            </p>

            <Link
              href="/catalogue"
              className="mt-8 inline-block border-b border-[#c9a063] pb-2 text-xs uppercase tracking-[0.2em] transition duration-300 hover:text-[#ead9b6]"
            >
              Explorer les fragrances
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container-inspire max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9a7242]">Inspire Match</p>
          <h2 className="serif mt-4 text-4xl md:text-5xl">Quel parfum vous ressemble ?</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-neutral-600">
            Répondez à quelques questions et laissez notre futur conseiller olfactif vous guider vers votre signature.
          </p>
          <button className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#9a7242]">
            Commencer le quiz
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
