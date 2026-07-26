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
    return new NextResponse("Unauthorized", { status: 401 });
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
    return new NextResponse("Access denied. You have not purchased this product.", { status: 403 });
  }

  // 2. Récupérer le produit pour connaître son fichier
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || !product.filePath) {
    return new NextResponse("File not configured for this product.", { status: 404 });
  }

  // 3. Chemin vers le fichier réel sur le serveur
  const filePath = path.join(process.cwd(), product.filePath);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    // 4. Renvoyer le fichier en tant que téléchargement
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("File read error:", error);
    return new NextResponse("File not found on server.", { status: 404 });
  }
}