import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">
              PixelHiven
            </h2>

            <p className="mt-4 text-gray-600">
              Premium digital products for creators, developers and
              entrepreneurs.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Marketplace
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link
                  href="/shop"
                  className="transition hover:text-indigo-600"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-indigo-600"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="transition hover:text-indigo-600"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-indigo-600"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-indigo-600"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-indigo-600"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-indigo-600"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/refund"
                  className="transition hover:text-indigo-600"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Stay Updated
            </h3>

            <p className="mt-4 text-gray-600">
              Get the latest digital products and offers.
            </p>

            <div className="mt-5 flex">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Email address"
                className="min-w-0 w-full rounded-l-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
              />

              <button
                type="button"
                className="rounded-r-xl bg-indigo-600 px-5 text-white transition hover:bg-indigo-700"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Copyright uniquement */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {currentYear} PixelHiven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
