import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  // 1. Vérifier si l'utilisateur est connecté
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2. Récupérer l'utilisateur dans la base pour vérifier son rôle
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // 3. Si ce n'est pas un ADMIN, on le redirige vers l'accueil
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  // 4. Récupérer quelques statistiques pour le tableau de bord
  const [usersCount, productsCount, ordersCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Administration
            </span>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your products, orders, and users.
            </p>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{usersCount}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500">Total Products</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{productsCount}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{ordersCount}</p>
          </div>
        </div>

        {/* Raccourci de gestion */}
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <a 
              href="/admin/products" 
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Manage Products
            </a>
            <a 
              href="#" 
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              View Orders
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}