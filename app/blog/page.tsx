import Link from "next/link";

export const metadata = {
  title: "Blog | PixelHiven",
  description: "Resources, guides, and news for creators and digital makers.",
};

const articles = [
  {
    category: "Resources",
    title: "How to Choose the Right Digital Assets for Your Project",
    description:
      "A practical guide to selecting templates, source code, graphics, and other assets that fit your goals.",
    date: "Coming soon",
  },
  {
    category: "Design",
    title: "Why Design Systems Save Time for Modern Teams",
    description:
      "Discover how reusable components and consistent design systems improve product development.",
    date: "Coming soon",
  },
  {
    category: "Development",
    title: "Starting Your Next Project with a Premium Starter Kit",
    description:
      "Learn how a well-structured starter kit can help you launch faster without sacrificing quality.",
    date: "Coming soon",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            PixelHiven Journal
          </span>

          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Ideas for creators and builders
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Guides, inspiration, and practical resources to help you create
            better digital products.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                {article.category}
              </span>

              <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900">
                {article.title}
              </h2>

              <p className="mt-4 flex-1 leading-7 text-gray-600">
                {article.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="text-sm text-gray-500">{article.date}</span>
                <span className="text-sm font-semibold text-indigo-600">
                  Read soon →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-indigo-600 px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-bold">
            More articles are coming soon.
          </h2>
          <p className="mt-3 text-indigo-100">
            Explore our marketplace while we prepare useful resources for you.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </main>
  );
}
