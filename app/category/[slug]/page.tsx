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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixelhiven.com";

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | PixelHiven",
      robots: { index: false, follow: false },
    };
  }

  const title = `${category.title} | PixelHiven`;
  const description = `Shop premium ${category.title} products at PixelHiven. ${category.description}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/category/${category.slug}`,
      type: "website",
    },
  };
}

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

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: currentCategory.title,
    description: currentCategory.description,
    url: `${baseUrl}/category/${currentCategory.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: product.image,
          sku: product.id,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  const otherCategories = categories.filter(
    (category) => category.slug !== currentCategory.slug
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link
            href="/"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
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

          <p className="mt-6 max-w-3xl text-base leading-7 text-gray-600">
            Explore our curated selection of {currentCategory.title.toLowerCase()} products,
            including software licenses, digital keys, subscriptions, and professional tools.
            Every purchase includes secure payment, reliable delivery, and responsive support.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500">
              No products available in this category yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <ProductImage
                      src={product.image}
                      alt={`${product.title} - ${product.category} digital license`}
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

            <section className="mt-16 rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions about {currentCategory.title}
              </h2>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    How do I receive the product?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    After a successful purchase, eligible items become available in
                    your dashboard. Digital keys and files are usually delivered instantly,
                    while some account-based products may require manual processing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    What if the product doesn't work?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Contact our support team within the warranty period listed on the
                    product page. Include your order ID and a clear description of the issue.
                    Do not share passwords or full license keys in public chat.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Can I get a refund?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Refund eligibility depends on the product status and the Refund Policy.
                    Some digital goods are non-refundable once activated or downloaded.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-gray-900">Explore more categories</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-500 hover:text-indigo-600"
              >
                {category.icon} {category.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
