"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const StarfieldBackground = dynamic(() => import("@/components/ui/StarfieldBackground"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      <StarfieldBackground />

      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20 z-10 relative text-center">
        <div className="max-w-4xl flex flex-col items-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl drop-shadow-xl">
            Everything You Need
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-200">
              to Build Faster.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-200 drop-shadow mx-auto">
            Discover premium templates, software keys, UI kits, ebooks,
            AI resources, and digital assets designed for creators,
            developers, and entrepreneurs.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-xl transition hover:bg-indigo-500 hover:scale-105"
            >
              Explore Products
            </Link>

            <Link
              href="/categories"
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-7 py-4 font-semibold text-white transition hover:bg-white/20"
            >
              Browse Categories
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-300 font-medium">
            <span className="flex items-center gap-2">✅ Instant Download</span>
            <span className="flex items-center gap-2">🔒 Secure Payments</span>
            <span className="flex items-center gap-2">⭐ Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
