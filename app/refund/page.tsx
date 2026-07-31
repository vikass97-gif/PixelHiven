import Link from "next/link";

export const metadata = {
  title: "Refund Policy | PixelHiven",
  description: "Learn about our refund and return policy for digital products.",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Refund Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="mb-6">
            At PixelHiven, we want you to be completely satisfied with your purchase. Due to the nature of digital products,
            our refund policy is as follows:
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Digital Products</h2>
          <p className="mb-6">
            Since our products are delivered digitally and can be downloaded immediately after purchase,
            we generally do not offer refunds. However, we will consider refund requests on a case-by-case basis.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility for Refunds</h2>
          <p className="mb-4">You may be eligible for a refund if:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>The product was not delivered to you</li>
            <li>The product does not function as described</li>
            <li>You purchased the wrong product by mistake</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How to Request a Refund</h2>
          <p className="mb-6">
            To request a refund, please contact our support team at
            <a href="mailto:support@pixelhiven.com" className="text-indigo-600 hover:underline">
              support@pixelhiven.com
            </a>
            within 7 days of purchase. Please include your order details and the reason for your refund request.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Processing Time</h2>
          <p className="mb-6">
            Refunds are typically processed within 3-5 business days after approval. The refund will be credited back
            to your original payment method.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Non-Refundable Items</h2>
          <p className="mb-6">
            The following items are not eligible for refunds:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Software licenses after they have been activated</li>
            <li>Subscription services after the subscription period has started</li>
            <li>Custom orders or personalized products</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about our Refund Policy, please contact us at:
            <br />
            <a href="mailto:support@pixelhiven.com" className="text-indigo-600 hover:underline">
              support@pixelhiven.com
            </a>
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
