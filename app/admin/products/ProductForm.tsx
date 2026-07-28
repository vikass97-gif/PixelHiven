"use client";

import { useActionState } from "react";
import { createProduct } from "./actions";
import { categories } from "@/data/categories";

export default function ProductForm() {
  const [state, formAction] = useActionState(createProduct, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input type="text" name="title" required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug * (ex: mon-super-produit)</label>
          <input type="text" name="slug" required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category *</label>
          {/* ✅ Menu déroulant : impossible de se tromper de catégorie */}
          <select
            name="category"
            required
            defaultValue=""
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.icon} {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (USD) *</label>
          <input type="number" step="0.01" min="0.01" name="price" required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Badge</label>
        <select
          name="badge"
          defaultValue="New"
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none"
        >
          <option value="New">New</option>
          <option value="Popular">Popular</option>
          <option value="Trending">Trending</option>
          <option value="Best Seller">Best Seller</option>
          <option value="Featured">Featured</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description * (min. 20 characters)</label>
        <textarea name="description" rows={3} required minLength={20} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input type="text" name="image" placeholder="/images/products/mon-image.jpg" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">File Path (Secure)</label>
        <input type="text" name="filePath" placeholder="private/downloads/mon-fichier.zip" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-600 focus:outline-none" />
        <p className="mt-1 text-xs text-gray-500">Leave empty to use a default test file.</p>
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
      >
        Add Product
      </button>
    </form>
  );
}