import Link from "next/link";
import { CartButton } from "./cart-button";
import { MenuIcon, UserIcon } from "./ui/icons";

export function SiteHeader({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <header className={`site-header site-header--${theme}`}>
      <div className="container-inspire site-header__inner">
        <button type="button" className="site-header__mobile-action" aria-label="Ouvrir le menu">
          <MenuIcon />
        </button>

        <Link href="/" className="site-logo" aria-label="Accueil INSPIRE">
          INSPIRE
          <span>Maison de parfums</span>
        </Link>

        <nav className="site-nav" aria-label="Navigation principale">
          <Link href="/catalogue">Parfums</Link>
          <Link href="/catalogue?collection=Femme">Pour elle</Link>
          <Link href="/catalogue?collection=Homme">Pour lui</Link>
          <Link href="/catalogue?collection=Mixte">À partager</Link>
          <Link href="/#histoire">La maison</Link>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="site-header__account" aria-label="Compte client">
            <UserIcon />
            <span>Compte</span>
          </button>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
