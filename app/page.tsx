import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import ScrollToTop from "@/components/ui/ScrollToTop";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PixelHiven",
  "url": process.env.NEXT_PUBLIC_APP_URL || "https://pixelhiven.com",
  "description": "Premium digital products marketplace for creators, developers and entrepreneurs.",
  "sameAs": [],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <HowItWorks />
      <ScrollToTop />
    </main>
  );
}
