import Link from "next/link";

export const metadata = {
  title: "Terms of Service | PixelHiven",
  description: "Terms of Service for PixelHiven digital marketplace.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Legal</span>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900">1. Digital Products License</h2>
            <p>When you purchase a digital product on PixelHiven, you are granted a non-exclusive license to use the product in personal or commercial projects.</p>

            <h2 className="text-xl font-bold text-gray-900">2. Refunds Policy</h2>
            <p>Due to the digital nature of downloadable files, purchases are generally final once downloaded, unless a technical flaw makes the file unusable.</p>

            <div className="mt-10 border-t border-gray-100 pt-6">
              <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-700">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
