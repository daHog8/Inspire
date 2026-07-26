"use client";

import { useState } from "react";
import { useCart } from "../context/cart-context";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  volume_ml: number;
  collection: string;
};

export function AddToCartButton({
  product,
  disabled,
}: {
  product: Product;
  disabled?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className="mt-5 w-full bg-black px-8 py-5 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#9a7242] disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}
