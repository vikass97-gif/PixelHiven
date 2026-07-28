import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";

// Dossier racine autorisé — RIEN ne peut sortir d'ici
const DOWNLOADS_DIR = path.join(process.cwd(), "private", "downloads");

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { productId } = await params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        where: { status: "paid" },
        include: { orderItems: true },
      },
    },
  });

  const hasPurchased = user?.orders.some((order) =>
    order.orderItems.some((item) => item.productId === productId)
  );

  if (!hasPurchased) {
    return new NextResponse(
      "Access denied. You have not purchased this product.",
      { status: 403 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product?.filePath) {
    return new NextResponse("File not configured for this product.", {
      status: 404,
    });
  }

  // 🔒 Sécurité : on ne garde que le nom du fichier
  const safeFileName = path.basename(product.filePath);
  const absolutePath = path.join(DOWNLOADS_DIR, safeFileName);

  if (!absolutePath.startsWith(DOWNLOADS_DIR)) {
    return new NextResponse("Invalid file path.", { status: 400 });
  }

  try {
    const fileBuffer = await readFile(absolutePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Disposition": `attachment; filename="${safeFileName}"`,
        "Content-Type": "application/octet-stream",
        "Content-Length": String(fileBuffer.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("File read error:", error);
    return new NextResponse("File not found on server.", { status: 404 });
  }
}
