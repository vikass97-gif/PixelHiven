import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        where: { status: "paid" }, // On ne prend que les commandes payées
        include: {
          orderItems: true,
        },
      },
    },
  });

  // On rassemble tous les produits achetés dans une liste
  const purchasedItems = user?.orders.flatMap(order => order.orderItems) || [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome back, {session.user.name || "User"} 👋
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your purchases and download your digital products.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Your Digital Products</h2>
            
            {purchasedItems.length === 0 ? (
              <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-500">You haven't purchased any products yet.</p>
                <a 
                  href="/shop" 
                  className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Browse the Shop
                </a>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {purchasedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                    <div>
                      <p className="font-semibold text-gray-900">Product ID: {item.productId}</p>
                      <p className="text-sm text-gray-500">Price paid: ${item.price}</p>
                    </div>
                    <a
                      href={`/api/download/${item.productId}`}
                      className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}