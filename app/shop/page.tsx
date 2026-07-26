import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/ui/AddToCartButton";

export const metadata = {
  title: "Shop | PixelHiven",
  description: "Browse our collection of premium digital products, templates, source code, and more.",
};

export default async function ShopPage() {
  // On récupère les vrais produits dans la base de données
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
            Shop
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Discover our complete collection of premium digital assets. 
            From templates to source code, find everything you need for your next project.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-gray-600">
            Showing {products.length} products
          </span>
          
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-indigo-600 focus:outline-none">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              // On adapte le prix (qui est un nombre en BDD) pour qu'il soit compatible avec le panier
              const cartProduct = {
                ...product,
                price: `$${product.price.toFixed(2)}`,
              };

              return (
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

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <span>Digital Download</span>
                      <span>Instant Access</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>

                      <AddToCartButton product={cartProduct} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}