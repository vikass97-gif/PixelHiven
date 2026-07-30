import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />

      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl">
            Everything You Need
            <br />
            to Build Faster.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Discover premium templates, source code, UI kits, ebooks,
            AI resources, and digital assets designed for creators,
            developers, and entrepreneurs.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-700"
            >
              Explore Products
            </Link>

            <Link
              href="/categories"
              className="rounded-xl border border-gray-300 px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Browse Categories
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-500">
            <span>✅ Instant Download</span>
            <span>🔒 Secure Payments</span>
            <span>⭐ Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
