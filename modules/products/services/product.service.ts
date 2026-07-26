import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    take: 6,
    orderBy: {
      sales: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
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
}) {
  return prisma.product.create({
    data,
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
) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}