import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { items, total } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 1. Créer la commande en base de données (statut: pending)
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        status: "pending",
        orderItems: {
          create: items.map((item: any) => ({
            productId: String(item.id),
            price: Number(item.price.replace("$", "")),
          })),
        },
      },
    });

    // 2. Préparer la requête pour Cryptomus
    const payload = {
      amount: String(total),
      currency: "USD",
      order_id: order.id,
      url_return: "http://localhost:3000/dashboard",
      url_success: "http://localhost:3000/dashboard",
      lifetime: 3600,
    };

    const data = Buffer.from(JSON.stringify(payload)).toString("base64");
    const sign = crypto
      .createHash("md5")
      .update(data + process.env.CRYPTOMUS_PAYMENT_KEY)
      .digest("hex");

    // 3. Appeler l'API Cryptomus
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

    if (!result.result || !result.result.url) {
      console.error("Cryptomus error:", result);
      return NextResponse.json({ error: "Payment gateway error" }, { status: 500 });
    }

    // 4. Renvoyer l'URL de paiement au frontend
    return NextResponse.json({ pay_url: result.result.url });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}