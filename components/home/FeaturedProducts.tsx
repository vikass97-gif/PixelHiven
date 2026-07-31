export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/ui/AddToCartButton";
import ProductImage from "@/components/ui/ProductImage";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="bg-gray-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Featured Collection
            </span>

            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">
              Featured Digital Software
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Discover our top genuine software keys, licenses, subscriptions, and dev tools.
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
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <Link href={`/product/${product.slug}`}>
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <ProductImage
                      src={product.image}
                      alt={product.title}
                      sizes="(max-width:768px)100vw,33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                    {product.category}
                  </span>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="mt-3 text-xl font-bold text-gray-900 transition hover:text-indigo-600">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-3xl font-extrabold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>

                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
