import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) initializeApp();
const db = getFirestore();
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Mercado Pago envía múltiples tipos. Para pagos:
    // data.type === 'payment' y data.data.id es el payment_id
    const type = data.type || data.action;
    const paymentId = data.data?.id || data?.resource?.split("/").pop();

    if (type !== "payment" || !paymentId) return NextResponse.json({ ok: true });

    // Obtener detalles del pago
    const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    const pay = await payRes.json();

    const orderId = pay.external_reference;
    if (!orderId) return NextResponse.json({ ok: true });

    const ref = db.collection("orders").doc(orderId);

    const status = pay.status; // approved, rejected, etc.
    const update: any = {
      updatedAt: new Date(),
      "payment.paymentId": String(paymentId),
      "payment.statusDetail": pay.status_detail,
    };

    if (status === "approved") {
      update.status = "paid";
      update["payment.paidAt"] = new Date();
      update["buyer.email"] = pay.payer?.email || null;
    } else if (status === "rejected") {
      update.status = "cancelled";
    }

    await ref.set(update, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("MP webhook error", e);
    return NextResponse.json({ ok: false }, { status: 200 }); // devolver 200 para que MP no reintente eternamente
  }
}
