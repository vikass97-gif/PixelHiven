import Link from "next/link";

export default function Footer() {
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
                <Link href="/shop">Shop</Link>
              </li>

              <li>
                <Link href="/categories">Categories</Link>
              </li>

              <li>
                <Link href="/blog">Blog</Link>
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
                <Link href="/about">About</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <li>
                <Link href="/privacy">Privacy</Link>
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

              <button className="rounded-r-xl bg-indigo-600 px-5 text-white hover:bg-indigo-700">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} PixelHiven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}