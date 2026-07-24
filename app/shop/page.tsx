import Link from "next/link";
import Image from "next/image";
import { featuredProducts } from "@/data/featured-products";

export const metadata = {
  title: "Shop | PixelHiven",
  description: "Browse our collection of premium digital products, templates, source code, and more.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
            Shop
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Discover our complete collection of premium digital assets. 
            From templates to source code, find everything you need for your next project.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <span className="text-gray-600">
            Showing {featuredProducts.length} products
          </span>
          
          <select className="rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-700 focus:border-indigo-600 focus:outline-none">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
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

<Link href={`/product/${product.slug}`}>
                  <h3 className="mt-2 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600">
                    {product.title}
                  </h3>
                </Link>

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

                  <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}