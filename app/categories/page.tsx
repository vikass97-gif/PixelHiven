import Link from "next/link";
import { categories } from "@/data/categories";
import CategoryIcon from "@/components/ui/CategoryIcon";

export const metadata = {
  title: "Categories | PixelHiven",
  description: "Browse all our digital product categories.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
            Categories
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Find the perfect digital products for your next project.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-xl"
            >
              <CategoryIcon slug={category.slug} size="md" />

              <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-indigo-600">
                {category.title}
              </h3>

              <p className="mt-3 text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
