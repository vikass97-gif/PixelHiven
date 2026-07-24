import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}