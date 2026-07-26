"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const priceStr = formData.get("price") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const filePath = formData.get("filePath") as string;

  if (!title || !slug || !priceStr || !description) {
    return { error: "Please fill all required fields." };
  }

  try {
    await prisma.product.create({
      data: {
        title,
        slug,
        category: category || "General",
        price: parseFloat(priceStr),
        description,
        image: image || "/images/products/product-1.jpg", // Image par défaut si vide
        filePath: filePath || "private/downloads/product-1.txt", // Fichier par défaut si vide
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create product. Slug might already exist." };
  }

  // Rafraîchit la page pour afficher le nouveau produit
  revalidatePath("/admin/products");
  redirect("/admin/products");
}