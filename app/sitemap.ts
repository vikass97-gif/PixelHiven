import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixelhiven.com";

  let products: { slug: string; updatedAt: Date }[] = [];

  try {
    products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  const routes = [
    "",
    "/shop",
    "/categories",
    "/about",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...productUrls];
}
