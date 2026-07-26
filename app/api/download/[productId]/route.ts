import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await params;

  // 1. Vérifier si l'utilisateur a bien acheté CE produit
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        where: { status: "paid" },
        include: { orderItems: true },
      },
    },
  });

  const hasPurchased = user?.orders.some(order =>
    order.orderItems.some(item => item.productId === productId)
  );

  if (!hasPurchased) {
    return NextResponse.json({ error: "Access denied. You have not purchased this product." }, { status: 403 });
  }

  // 2. Chemin vers le fichier (on mappe l'ID du produit à son fichier réel)
  // Pour l'instant, on force le fichier product-1.txt pour la démo
  const filePath = path.join(process.cwd(), "private", "downloads", "product-1.txt");

  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // 3. Renvoyer le fichier en tant que téléchargement
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="product-1.txt"',
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found on server." }, { status: 404 });
  }
}