import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // ===== 1. AUTHENTIFICATION =====
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to checkout." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ===== 2. LECTURE DU PANIER (on ignore le prix envoyé !) =====
    const { items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const productIds = items.map((item: any) => String(item.id));

    // ===== 3. PRIX RECALCULÉS DEPUIS LA BASE =====
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length === 0) {
      return NextResponse.json({ error: "Invalid products" }, { status: 400 });
    }

    // Produits digitaux → 1 exemplaire par produit
    const total = products.reduce((sum, p) => sum + p.price, 0);
    const roundedTotal = Math.round(total * 100) / 100;

    if (roundedTotal <= 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    // ===== 4. CRÉATION DE LA COMMANDE =====
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: roundedTotal,
        status: "pending",
        orderItems: {
          create: products.map((p) => ({
            productId: p.id,
            price: p.price, // ✅ prix serveur, plus de .replace()
          })),
        },
      },
    });

    // ===== 5. APPEL CRYPTOMUS =====
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const payload = {
      amount: roundedTotal.toFixed(2),
      currency: "USD",
      order_id: order.id,
      url_return: `${baseUrl}/cart`,
      url_success: `${baseUrl}/dashboard`,
      url_callback: `${baseUrl}/api/cryptomus/webhook`, // ✅ INDISPENSABLE
      lifetime: 3600,
    };

    const data = Buffer.from(JSON.stringify(payload)).toString("base64");
    const sign = crypto
      .createHash("md5")
      .update(data + process.env.CRYPTOMUS_PAYMENT_KEY)
      .digest("hex");

    const response = await fetch("https://api.cryptomus.com/v1/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        merchant: process.env.CRYPTOMUS_MERCHANT_UUID!,
        sign: sign,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!result.result?.url) {
      console.error("CRYPTOMUS ERROR:", JSON.stringify(result, null, 2));
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "failed" },
      });
      return NextResponse.json(
        { error: "Payment gateway error: " + (result.message || "Unknown") },
        { status: 500 }
      );
    }

    return NextResponse.json({ pay_url: result.result.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}