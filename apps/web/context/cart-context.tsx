"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartProduct = {
  id: number;
  slug: string;
  name: string;
  price: number;
  volume_ml: number;
  collection: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "inspire-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addItem(product: CartProduct, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item,
        );
      }

      return [...current, { ...product, quantity: Math.max(1, quantity) }];
    });
  }

  function removeItem(productId: number) {
    setItems((current) => current.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, 10) }
          : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }

  return context;
}
