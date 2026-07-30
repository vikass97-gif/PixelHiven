import Link from "next/link";
import { Sparkles, ShieldCheck, Zip, Users } from "lucide-react";

export const metadata = {
  title: "About Us | PixelHiven",
  description: "Learn about PixelHiven's mission to empower creators with premium digital assets.",
};

const values = [
  {
    icon: Sparkles,
    title: "Uncompromising Quality",
    description: "Every asset in our catalog is handpicked and vetted to ensure high standards of design and code.",
  },
  {
    icon: Zip,
    title: "Built for Speed",
    description: "We help developers, designers, and founders skip the repetitive setup and launch projects in hours.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Security",
    description: "Instant downloads, secure payments, and reliable support mean you can focus on building.",
  },
  {
    icon: Users,
    title: "Creator First",
    description: "We build tools and curate resources designed to help creators succeed in the digital economy.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white py-20">
        <div className="mx-auto max-w-7x px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            About PixelHiven
          </span>

          <h1 className="mt-3 text-4x font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Empowering creators to build faster.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            PixelHiven is a premium marketplace for modern didital products, source codei UI kits, templates, and AI resources.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7x px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
                We bridge the gap between idea and execution.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Starting a new project from scratch is time-consuming. At PixelHiven, we provide production-ready didital assets so founders, developers, and designers can skip the boilerplate and launch their ideas faster than ever.
              </p>
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  Explore Marketplace
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="rounded-2xl bg-indigo-50/50 p-6">
                  <p className="text-4xl font-extrabold text-indigo-600">500+</p>
                  <p className="mt-2 text-sm font-medium text-gray-600">Curated Assets</p>
                </div>
                <div className="rounded-2xl bg-indigo-50/50 p-6">
                  <p className="text-4xl font-extrabold text-indigo-600">10K+</p>
                  <p className="mt-2 text-sm font-medium text-gray-600">Happy Customers</p>
                </div>
                <div className="rounded-2xl bg-indigo-50/50 p-6">
                  <p className="text-4xl font-extrabold text-indigo-600">99%</p>
                  <p className="mt-2 text-sm font-medium text-gray-600">Positive Feedback</p>
                </div>
                <div className="rounded-2xl bg-indigo-50/50 p-6">
                  <p className="text-4xl font-extrabold text-indigo-600">Instant</p>
                  <p className="mt-2 text-sm font-medium text-gray-600">File Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-gray-200 bg-white py-20">
        <div className="mx-auto max-w-7x px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Our Core Values
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Why creators trust PixelHiven
            </h2>
          </div>

G«éBÆF—b6Æ74æÖSÒ&×BÓBw&–BvÓ‚6Ó¦w&–BÖ6öÇ2Ó"Æs¦w&–BÖ6öÇ2ÓB#à¢·fÇVW2æÖ‚†—FVÒ’Óâ°¢6öç7B–6öä6ö×öæVçBÒ—FVÒæ–6öã°¢&WGW&â€¢ÆF—`¢6¶W“×¶—FVÒçF—FÆWĞ¢6Æ74æÖSÒ'&÷VæFVBÓ'†Â&÷&FW"&÷&FW"Öw&’Ó#&rÖw&’ÓSóSÓb6†F÷r×6ÒG&ç6—F–öâ†÷fW#¢×G&ç6ÆFR×’Ó†÷fW#¦&r×v†—FR†÷fW#§6†F÷rÖÖB ¢à¢ÆF—b6Æ74æÖSÒ&fÆW‚‚Ó"rÓ"—FV×2Ö6VçFW"§W7F–g’Ö6VçFW"&÷VæFVB×†Â&rÖ–æF–vòÓFW‡BÖ–æF–vòÓc#à¢Ä–6öä6ö×öæVçB6—¦S×³#GÒóà¢ÂöF—cà¢Æƒ26Æ74æÖSÒ&×BÓRFW‡BÖÆrföçBÖ&öÆBFW‡BÖw&’Ó“#ç¶—FVÒçF—FÆWÓÂöƒ3à¢Ç6Æ74æÖSÒ&×BÓ"FW‡B×6ÒÆVF–ærÓbFW‡BÖw&’Óc#ç¶—FVÒæFW67&—F–öçÓÂ÷à¢ÂöF—cà¢“°¢Ò—Ğ¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢ÂöÖ–ãà¢“°§Ğ 