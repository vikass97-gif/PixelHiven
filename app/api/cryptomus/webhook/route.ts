import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.text(); // On lit en texte brut pour vérifier la signature
    const signature = req.headers.get("sign");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // Vérifier la sécurité du webhook
    const hash = crypto
      .createHash("md5")
      .update(body + process.env.CRYPTOMUS_WEBHOOK_KEY)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const data = JSON.parse(body);

    // Si le paiement est confirmé
    if (data.status === "paid" || data.status === "paid_over") {
      const orderId = data.order_id;

      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}