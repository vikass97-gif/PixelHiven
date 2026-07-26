import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  // Protection de la page : si l'utilisateur n'est pas connecté, on le redirige
  if (!session?.user) {
    redirect("/login");
  }

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
          
          <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            {session.user.email}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Sidebar / Quick Stats */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Account Details</h2>
              <dl className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Name:</dt>
                  <dd className="font-medium text-gray-900">{session.user.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Plan:</dt>
                  <dd className="font-medium text-gray-900">Free Member</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Main Content - Downloads */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Your Digital Products</h2>
              
              <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-500">You haven't purchased any products yet.</p>
                <a 
                  href="/shop" 
                  className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Browse the Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}