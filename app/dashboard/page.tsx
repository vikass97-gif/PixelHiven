import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        where: { status: "paid" },
        orderBy: { createdAt: "desc" },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  const purchasedItems =
    user?.orders.flatMap((order) =>
      order.orderItems.map((item) => ({
        ...item,
        orderCreatedAt: order.createdAt,
      }))
    ) ?? [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              My Account
            </span>

            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
              Welcome back, {session.user.name || "User"} 👋
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              Manage your purchases and download your digital products.
            </p>
          </div>

          <Link
            href="/shop"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Your Digital Products
            </h2>

            {purchasedItems.length > 0 && (
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                {purchasedItems.length}{" "}
                {purchasedItems.length === 1 ? "product" : "products"}
              </span>
            )}
          </div>

          {purchasedItems.length === 0 ? (
            <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500">
                You haven&apos;t purchased any products yet.
              </p>

              <Link
                href="/shop"
                className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Browse the Shop
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-gray-900">
                        {item.product.title}
                      </p>

                      <p className="mt-1 text-sm font-medium text-indigo-600">
                        {item.product.category}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Purchased on{" "}
                        {item.orderCreatedAt.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        {" · "} ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`/api/download/${item.productId}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <Download size={17} />
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}