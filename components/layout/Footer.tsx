import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">
              PixelHiven
            </h2>

            <p className="mt-4 text-gray-600">
              Premium digital products for creators,
              developers and entrepreneurs.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Marketplace
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link href="/shop" className="hover:text-indigo-600 transition">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/categories" className="hover:text-indigo-600 transition">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-indigo-600 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/refund" className="hover:text-indigo-600 transition">
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
                placeholder="Email address"
                className="w-full rounded-l-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
              />

              <button className="rounded-r-xl bg-indigo-600 px-5 text-white hover:bg-indigo-700 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>
            © {currentYear} PixelHiven. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-indigo-600 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 transition">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-indigo-600 transition">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
