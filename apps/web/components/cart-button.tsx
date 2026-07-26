"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import { BagIcon } from "./ui/icons";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="cart-link" aria-label={`Panier, ${itemCount} article(s)`}>
      <BagIcon />
      <span className="cart-link__label">Panier</span>
      {itemCount > 0 ? <span className="cart-link__count">{itemCount}</span> : null}
    </Link>
  );
}
