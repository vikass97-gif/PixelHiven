import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <main>
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
