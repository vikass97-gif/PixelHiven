"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema } from "@/modules/products/schemas/product.validation";

export async function createProduct(prevState: any, formData: FormData) {
  // ========== 1. SÉCURITÉ (obligatoire dans l'action !) ==========
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Unauthorized. Please log in." };
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    return { error: "Forbidden. Admin access required." };
  }
  // ===============================================================

  // 2. Préparation des données
  const rawData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    image: (formData.get("image") as string) || "/images/products/product-1.jpg",
    filePath: (formData.get("filePath") as string) || "private/downloads/product-1.txt",
    badge: (formData.get("badge") as string) || "New",
  };

  // 3. Validation avec VOTRE schéma Zod
  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    const firstError = validation.error.issues[0];
    return { error: `${firstError.path.join(".")}: ${firstError.message}` };
  }

  // 4. Création en base
  try {
    await prisma.product.create({
      data: validation.data,
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create product. This slug might already exist." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}