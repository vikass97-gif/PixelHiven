import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/ui/AddToCartButton";
import ProductImage from "@/components/ui/ProductImage";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    take: 3,
  });

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link
          href="/shop"
          className="font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to Shop
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
            <ProductImage
              src={product.image}
              alt={product.title}
              priority
              className="object-cover"
            />
          </div>

          <div>
            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {product.category}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
              {product.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <span className="text-5xl font-extrabold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mt-10">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Product Features
              </h2>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex items-center gap-3">✅ Instant Genuine License</li>
                <li className="flex items-center gap-3">✅ Lifetime Warranty & Access</li>
                <li className="flex items-center gap-3">✅ Free Updates</li>
                <li className="flex items-center gap-3">✅ Official Download Link</li>
                <li className="flex items-center gap-3">✅ Secure Payment</li>
              </ul>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Related Products
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <ProductImage
                      src={related.image}
                      alt={related.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      {related.category}
                    </span>
                    <Link href={`/product/${related.slug}`}>
                      <h3 className="mt-2 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600">
                        {related.title}
                      </h3>
                    </Link>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-gray-900">
                        ${related.price.toFixed(2)}
                      </span>
                      <AddToCartButton product={related} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
