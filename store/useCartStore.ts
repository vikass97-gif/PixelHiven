import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/modules/products/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const alreadyInCart = get().items.some(
          (item) => item.id === product.id
        );

        // Une seule unité par référence numérique.
        if (alreadyInCart) {
          return;
        }

        set({
          items: [
            ...get().items,
            {
              ...product,
              quantity: 1,
            },
          ],
        });
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      clearCart: () => {
        set({
          items: [],
        });
      },

      // Chaque référence numérique compte comme un seul article.
      totalItems: () => get().items.length,

      // Le prix est calculé sans quantité, car chaque référence est unique.
      totalPrice: () =>
        get().items.reduce((total, item) => {
          return total + item.price;
        }, 0),
    }),
    {
      name: "pixelhiven-cart",
    }
  )
);