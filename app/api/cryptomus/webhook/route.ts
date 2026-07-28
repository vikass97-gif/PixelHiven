import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const data = JSON.parse(rawBody);

    // Cryptomus place le "sign" DANS le body
    const receivedSign = data.sign || req.headers.get("sign");

    if (!receivedSign) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // On retire sign avant de recalculer
    const { sign: _omit, ...payload } = data;

    const apiKey =
      process.env.CRYPTOMUS_WEBHOOK_KEY || process.env.CRYPTOMUS_PAYMENT_KEY;

    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64");
    const expectedSign = crypto
      .createHash("md5")
      .update(encoded + apiKey)
      .digest("hex");

    // Fallback : ancienne méthode (body brut)
    const legacySign = crypto
      .createHash("md5")
      .update(rawBody + apiKey)
      .digest("hex");

    if (receivedSign !== expectedSign && receivedSign !== legacySign) {
      console.error("Invalid webhook signature", {
        received: receivedSign,
        expected: expectedSign,
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    console.log("Webhook received - status:", data.status);

    if (data.status === "paid" || data.status === "paid_over") {
      const order = await prisma.order.findUnique({
        where: { id: data.order_id },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Idempotence : on ne traite qu'une seule fois
      if (order.status === "paid") {
        return NextResponse.json({ success: true, message: "Already paid" });
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "paid" },
      });

      // Incrémente le compteur de ventes
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: order.id },
      });

      await Promise.all(
        orderItems.map((item) =>
          prisma.product.update({
            where: { id: item.productId },
            data: { sales: { increment: 1 } },
          })
        )
      );
    } else if (["cancel", "fail", "wrong_amount"].includes(data.status)) {
      await prisma.order.update({
        where: { id: data.order_id },
        data: { status: "failed" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
