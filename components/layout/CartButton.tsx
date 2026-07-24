"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartButton() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <Link
      href="/cart"
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:border-indigo-600 hover:text-indigo-600"
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="h-5 w-5" />

      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}