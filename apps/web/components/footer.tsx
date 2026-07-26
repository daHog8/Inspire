import Link from "next/link";

export function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="container-inspire luxury-footer__top">
        <div className="luxury-footer__brand">
          <p className="site-logo site-logo--footer">INSPIRE<span>Maison de parfums</span></p>
          <p>Des fragrances choisies pour révéler une émotion, accompagner un instant et laisser une empreinte.</p>
        </div>
        <div>
          <p className="luxury-footer__title">Collections</p>
          <Link href="/catalogue?collection=Femme">Pour elle</Link>
          <Link href="/catalogue?collection=Homme">Pour lui</Link>
          <Link href="/catalogue?collection=Mixte">À partager</Link>
        </div>
        <div>
          <p className="luxury-footer__title">La maison</p>
          <Link href="/#histoire">Notre histoire</Link>
          <Link href="/catalogue">Toutes les fragrances</Link>
          <span>Conseil olfactif</span>
        </div>
        <div>
          <p className="luxury-footer__title">Service</p>
          <span>Livraison France & Gabon</span>
          <span>Contact</span>
          <span>Retours</span>
        </div>
      </div>
      <div className="container-inspire luxury-footer__bottom">
        <span>© 2026 INSPIRE</span><span>L’inspiration sur la peau.</span>
      </div>
    </footer>
  );
}
