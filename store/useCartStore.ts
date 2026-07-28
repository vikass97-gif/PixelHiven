import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/modules/products/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const existing = get().items.find(
          (item) => item.id === product.id
        );

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });

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

      removeFromCart: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      increaseQuantity: (id) =>
        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          items: get()
            .items
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () =>
        set({
          items: [],
        }),

      totalItems: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      // C'EST ICI QU'ON A CORRIGÉ ! Plus besoin de replace()
      totalPrice: () =>
        get().items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0),
    }),
    {
      name: "pixelhiven-cart",
    }
  )
);