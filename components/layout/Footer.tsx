"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                PixelHiven
              </span>
            </Link>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Premium digital products, source code, UI kits and templates for creators and entrepreneurs.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Marketplace
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/shop" className="transition hover:text-indigo-600">Shop All</Link>
              </li>

              <li>
                <Link href="/categories" className="transition hover:text-indigo-600">Categories</Link>
              </li>

              <li>
                <Link href="/blog" className="transition hover:text-indigo-600">Journal & Blog</Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/about" className="transition hover:text-indigo-600">About Us</Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-indigo-600">Contact & Support</Link>
              </li>

              <li>
                <Link href="/privacy" className="transition hover:text-indigo-600">Privacy Policy</Link>
              </li>

              <li>
                <Link href="/terms" className="transition hover:text-indigo-600">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Stay Updated
            </h3>

            <p className="mt-4 text-sm text-gray-600">
              Get notified when new premium digital assets arrive.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-l-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-600"
              />

              <button type="submit" className="rounded-r-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} PixelHiven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
