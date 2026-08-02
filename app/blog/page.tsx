import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Digital Product Guides and Resources",
  description:
    "Read practical guides about software licenses, digital delivery, subscriptions, and choosing digital products safely.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "PixelHiven Digital Product Guides",
    description:
      "Practical guides about software licenses, subscriptions, and digital product delivery.",
    type: "website",
  },
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            PixelHiven Journal
          </span>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Practical guides for digital product buyers
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Understand software licenses, subscriptions, digital delivery,
            security, and the questions to ask before purchasing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Featured guides
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Latest articles
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 rounded-3xl bg-indigo-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">
            Explore premium digital products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
            Browse our marketplace after reviewing the guides that help you
            choose the right product for your needs.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Visit the marketplace
          </Link>
        </div>
      </section>
    </main>
  );
}
