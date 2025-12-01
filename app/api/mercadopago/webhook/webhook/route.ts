import "server-only";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // MP envía distintos tipos; nos interesa payment
    const topic = data.type || data.action || data.topic;
    const resource = data.data?.id || data?.data?.resource?.split("/").pop();

    if ((topic === "payment" || data.type === "payment") && resource) {
      // Traer el pago
      const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${resource}`, {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      });
      const payment = await payRes.json();

      const orderId = payment?.metadata?.orderId as string | undefined;
      if (orderId) {
        const ref = adminDb.collection("orders").doc(orderId);
        await ref.set(
          {
            mp: {
              id: payment.id,
              status: payment.status,
              status_detail: payment.status_detail,
            },
            status: payment.status === "approved" ? "paid" : payment.status,
            paidAt: payment.status === "approved" ? new Date() : null,
          },
          { merge: true }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
