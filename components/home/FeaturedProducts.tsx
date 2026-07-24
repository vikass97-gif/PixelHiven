import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/data/featured-products";

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Curated Assets
            </span>

            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">
              Featured Products
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Discover top-rated premium digital products crafted for creators and developers.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-6 font-semibold text-indigo-600 transition hover:text-indigo-700 md:mt-0"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-700 shadow-sm backdrop-blur-md">
                  {product.badge}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  {product.category}
                </span>

                <h3 className="mt-2 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <span>⭐ {product.rating}</span>
                  <span>{product.sales}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {product.price}
                  </span>

                  <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}