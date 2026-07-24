"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-xl"
    >
      Add to Cart
    </button>
  );
}