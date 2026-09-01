import Link from "next/link";

export const metadata = {
  title: "Refund Policy | PixelHiven",
  description: "Learn about our refund and return policy for digital products.",
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Refund Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="rounded-2xl bg-white p-8 md:p-12 shadow-sm border border-gray-200 text-gray-700 space-y-6">
          <p>
            At PixelHiven, customer satisfaction is our top priority. Because we sell digital products with instant delivery, our refund policy is designed to be fair, transparent, and protective for all users.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">1. Digital Nature of Products</h2>
          <p>
            Digital goods, product keys, and downloaded files are considered &quot;consumed&quot; upon delivery. However, we back our products with a replacement or refund guarantee in specific circumstances.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">2. Refund &amp; Replacement Eligibility</h2>
          <p>You are eligible for a replacement key or full refund if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The software license key is invalid or fails activation (and our support cannot resolve it within 24 hours).</li>
            <li>The digital file is corrupted or incomplete and a working replacement cannot be provided.</li>
            <li>You were charged multiple times for a single order by error.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">3. Non-Eligible Cases</h2>
          <p>Refunds will not be issued if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You purchased the wrong version due to hardware or OS incompatibility clearly stated on the product page.</li>
            <li>The license key was already successfully activated.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">4. How to Request Support or Refund</h2>
          <p>
            To request a refund, please contact our support team at{" "}
            <a href="mailto:support@pixelhiven.com" className="text-indigo-600 font-semibold hover:underline">
              support@pixelhiven.com
            </a>{" "}
            within 7 days of purchase. Please include your order details and the reason for your refund request.
          </p>

          <div className="pt-8 text-center border-t border-gray-100">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-indigo-50 px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
