"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Start exploring our premium digital products.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Shopping Cart
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      {item.category}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-indigo-600">
                      {item.price}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-lg border p-2 hover:bg-gray-100"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-lg border p-2 hover:bg-gray-100"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 transition hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-gray-600">Total</span>

              <span className="text-3xl font-extrabold text-indigo-600">
                ${totalPrice().toFixed(2)}
              </span>
            </div>

            <button className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-lg font-bold text-white transition hover:bg-indigo-700">
              Proceed to Checkout
            </button>

            <Link
              href="/shop"
              className="mt-4 block text-center font-medium text-indigo-600 hover:text-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}