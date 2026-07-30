"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import CartButton from "@/components/layout/CartButton";
import Logo from "@/components/layout/Logo";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

function NavbarContent() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo Moderne */}
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            PixelHiven
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <CartButton />

          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-xl bg-gray-100" />
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                {session.user.name || session.user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <NavbarContent />
  );
}
