import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | PixelHiven",
  description: "Privacy Policy for PixelHiven digital marketplace.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Legal</span>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">
              Last updated: July 31, 2026
            </p>

          <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
            <p>At PixelHiven, we respect your privacy and are committed to protecting your personal data.</p>
            
            <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when creating an account, making a purchase, or contacting support. This includes your name, email address, and order history.</p>

            <h2 className="text-xl font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>We use your data to process transactions, deliver digital downloads, provide customer support, and send account updates.</p>

            <h2 className="text-xl font-bold text-gray-900">3. Data Security</h2>
            <p>Your transactions are encrypted and processed securely. We never store payment details or passwords in plain text.</p>

            <div className="mt-10 border-t border-gray-100 pt-6">
              <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-700">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
