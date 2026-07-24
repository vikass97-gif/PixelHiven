export default function Stats() {
  const stats = [
    {
      value: "500+",
      label: "Digital Products",
    },
    {
      value: "10K+",
      label: "Happy Customers",
    },
    {
      value: "50+",
      label: "Categories",
    },
    {
      value: "99%",
      label: "Positive Reviews",
    },
  ];

  return (
    <section className="border-y border-gray-100 bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center"
          >
            <h2 className="text-5xl font-extrabold text-indigo-600">
              {stat.value}
            </h2>

            <p className="mt-3 text-gray-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}