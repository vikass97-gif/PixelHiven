import { Download, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Discover carefully selected digital assets made to help you create better products faster.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description:
      "Get access to your digital product immediately after your payment is confirmed.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Shop with confidence using a secure checkout experience for every purchase.",
  },
  {
    icon: WalletCards,
    title: "Lifetime Access",
    description:
      "Find your purchased products anytime from your personal dashboard.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y border-gray-100 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Why PixelHiven
          </span>

          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Built for creators who value quality
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Everything you need to discover, purchase, and access premium
            digital products with confidence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-gray-200 bg-gray-50/50 p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={24} strokeWidth={2.2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
