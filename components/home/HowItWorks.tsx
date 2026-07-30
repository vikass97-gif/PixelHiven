import { Search, CreditCard, Download } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse & Choose",
    description:
      "Explore our collection of premium digital products and find the perfect asset for your next project.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Secure Checkout",
    description:
      "Proceed to a fast and secure payment with cryptocurrency via Cryptomus. No account creation hurdles.",
  },
  {
    icon: Download,
    step: "03",
    title: "Instant Download",
    description:
      "Access your files immediately from your dashboard. Lifetime access guaranteed on every purchase.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            How It Works
          </span>

          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Start in minutes
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Get your digital products in three simple steps.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.step} className="text-center">
                {/* Numéro placé au-dessus, bien espacé */}
                <span className="mb-6 block text-5xl font-extrabold text-indigo-100">
                  {step.step}
                </span>

                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
                  <Icon size={28} className="text-indigo-600" strokeWidth={2.2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
