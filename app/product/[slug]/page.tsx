import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProducts } from "@/data/featured-products";
import AddToCartButton from "@/components/ui/AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = featuredProducts.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link
          href="/shop"
          className="font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to Shop
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Information */}
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
                {product.price}
              </span>
              <span className="text-sm font-medium text-gray-500">
                ⭐ {product.rating} · {product.sales}
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
                <li className="flex items-center gap-3">✅ Instant Download</li>
                <li className="flex items-center gap-3">✅ Lifetime Access</li>
                <li className="flex items-center gap-3">✅ Free Updates</li>
                <li className="flex items-center gap-3">✅ Premium Quality</li>
                <li className="flex items-center gap-3">✅ Secure Payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}