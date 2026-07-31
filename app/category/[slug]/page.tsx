import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { categories } from "@/data/categories";
import AddToCartButton from "@/components/ui/AddToCartButton";
import CategoryIcon from "@/components/ui/CategoryIcon";
import ProductImage from "@/components/ui/ProductImage";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { category: currentCategory.title },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            ← Back to Home
          </Link>
          <div className="mt-6 flex items-center gap-5">
            <CategoryIcon slug={currentCategory.slug} size="lg" />
            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
              {currentCategory.title}
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            {currentCategory.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500">No products available in this category yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <ProductImage
                    src={product.image}
                    alt={product.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
