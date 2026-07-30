import Link from "next/link";
import { Mail, MessageCircle, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Contact | PixelHiven",
  description: "Contact the PixelHiven team for support, questions, and partnerships.",
};

const supportEmail = "support@pixelhiven.com";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Contact Us
          </span>

          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 md:text-5xl">
            How can we help?
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Have a question about a product, an order, or PixelHiven? Our team
            is here to help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Mail size={23} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Email Support
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Send us your question and we will get back to you as soon as
              possible.
            </p>

            <a
              href={`mailto:${supportEmail}`}
              className="mt-5 inline-block font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {supportEmail}
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ShoppingBag size={23} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Product Questions
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Need help before purchasing? Include the product name in your
              email so we can assist you faster.
            </p>

            <Link
              href="/shop"
              className="mt-5 inline-block font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Browse the shop →
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <MessageCircle size={23} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Order Support
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              For an existing order, please include the email address used for
              your purchase.
            </p>

            <Link
              href="/dashboard"
              className="mt-5 inline-block font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View my purchases →
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Send us a message
          </h2>

          <p className="mt-3 text-gray-600">
            Click the button below to contact the PixelHiven team by email.
          </p>

          <a
            href={`mailto:${supportEmail}?subject=PixelHiven%20Support%20Request`}
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
}
