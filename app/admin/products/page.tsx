import { prisma } from "@/lib/prisma";
import ProductForm from "./ProductForm";

export default async function AdminProductsPage() {
  // Récupère tous les produits de la base de données
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900">Manage Products</h1>
        <p className="mt-2 text-gray-600">Add new digital products to your marketplace.</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Formulaire d'ajout */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h2>
              <ProductForm />
            </div>
          </div>

          {/* Liste des produits existants */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Existing Products ({products.length})</h2>
              
              {products.length === 0 ? (
                <p className="text-gray-500 py-8 text-center">No products yet. Add your first one!</p>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                      <div>
                        <p className="font-semibold text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-500">${product.price} - {product.category}</p>
                      </div>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}