import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/data/blog-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixelhiven.com";

  // ===== PRODUCTS =====
  let products: Array<{ slug: string; updatedAt: Date }> = [];
  try {
    products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // ===== BLOG POSTS =====
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ===== STATIC PAGES (indexables) =====
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/categories", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/category", priority: 0.6 }, // on ne met pas la racine, mais les catégories dynamiques seront gérées à part
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/refund", priority: 0.3 },
  ];

  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === "" ? "daily" : "monthly",
    priority: page.priority,
  }));

  // ===== CATEGORY PAGES =====
  // On peut récupérer les catégories depuis la base ou le fichier data
  const categories = await prisma.product
    .findMany({
      select: { category: true },
      distinct: ["category"],
    })
    .catch(() => []);

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.category.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls, ...productUrls, ...categoryUrls];
}
