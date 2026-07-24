import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (product: Product) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  totalItems: () => number;

  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items;

    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      set({
        items: items.map((item) =>
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
        ...items,
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

  totalPrice: () =>
    get().items.reduce((total, item) => {
      const price = Number(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0),
}));