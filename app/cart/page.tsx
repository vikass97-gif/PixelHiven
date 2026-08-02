"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const [loading, setLoading] = useState(false);

  const { items, removeFromCart, totalPrice } = useCartStore();

  const handleCheckout = async () => {
    if (items.length === 0 || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // On envoie seulement les identifiants.
        // Le serveur récupère les vrais prix depuis TiDB.
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
          })),
        }),
      });

      const data = await response.json().catch(() => ({
        error: "Invalid response from the checkout server.",
      }));

      if (response.ok && data.pay_url) {
        window.location.href = data.pay_url;
        return;
      }

      alert(
        data.error ||
          "Payment error. Please make sure that you are logged in."
      );
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:gap-6 sm:p-6"
              >
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-gray-600">{item.category}</p>

                    <p className="mt-3 text-2xl font-bold text-indigo-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                      1 digital license
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-gray-600">
                {items.length} {items.length === 1 ? "product" : "products"}
              </span>

              <span className="text-3xl font-extrabold text-indigo-600">
                ${totalPrice().toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-indigo-600 px-4 py-4 text-base font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
            >
              {loading ? "Redirecting to payment..." : "Proceed to Checkout"}
            </button>

            <Link
              href="/shop"
              className="mt-4 block text-center font-medium text-indigo-600 hover:text-indigo-700"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}