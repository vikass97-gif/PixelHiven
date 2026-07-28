import { prisma } from "@/lib/prisma";
import { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  return prisma.product.findMany({
    take: limit,
    orderBy: { sales: "desc" },
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { slug },
  });
}

export async function createProduct(data: {
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  filePath: string;
  price: number;
  badge: string;
}): Promise<Product> {
  return prisma.product.create({
    data: {
      ...data,
      price: Number(data.price),
    },
  });
}

export async function updateProduct(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    category: string;
    image: string;
    filePath: string;
    price: number;
    badge: string;
  }>
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await prisma.product.delete({
    where: { id },
  });
}