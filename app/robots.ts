import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixelhiven.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/cart", "/dashboard/", "/login", "/register"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
