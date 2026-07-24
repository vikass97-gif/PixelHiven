import Link from "next/link";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Categories
          </span>

          <h2 className="mt-3 text-4xl font-extrabold text-gray-900">
            Explore Our Categories
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Find the perfect digital products for your next project.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="/categories"
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-xl"
            >
              <div className="text-5xl">{category.icon}</div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-indigo-600">
                {category.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}