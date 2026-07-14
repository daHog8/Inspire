import Link from "next/link";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/20 text-white backdrop-blur-[2px]">
      <div className="container-inspire flex h-20 items-center justify-between">
        <Link
          href="/"
          className="serif text-2xl tracking-[0.25em] transition duration-300 hover:text-[#ead9b6]"
        >
          INSPIRE
        </Link>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] md:flex">
          <Link href="/catalogue" className="transition duration-300 hover:text-[#ead9b6]">
            Catalogue
          </Link>
          <a href="#selection" className="transition duration-300 hover:text-[#ead9b6]">
            Sélection
          </a>
          <a href="#histoire" className="transition duration-300 hover:text-[#ead9b6]">
            Notre histoire
          </a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <button className="transition duration-300 hover:text-[#ead9b6]">Compte</button>
          <button className="transition duration-300 hover:text-[#ead9b6]">Panier</button>
        </div>
      </div>
    </header>
  );
}
