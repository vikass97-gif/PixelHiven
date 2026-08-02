import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://pixelhiven.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${post.publishedAt}T00:00:00Z`));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "PixelHiven",
      url: baseUrl,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>

            <span className="mt-8 block text-sm font-semibold uppercase tracking-widest text-indigo-600">
              {post.category}
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-8 text-gray-600">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span>{post.author}</span>
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  {section.heading}
                </h2>

                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-lg leading-8 text-gray-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-lg leading-8 text-gray-700"
                      >
                        <span
                          className="mt-3 h-2 w-2 shrink-0 rounded-full bg-indigo-600"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="mt-16 rounded-3xl border border-indigo-100 bg-indigo-50 p-8">
            <ShoppingBag
              className="h-9 w-9 text-indigo-600"
              aria-hidden="true"
            />

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Ready to explore the marketplace?
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Review product descriptions, compatibility, delivery times, and
              license conditions before completing your purchase.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Browse products
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}
