import "server-only";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type Payload = {
  fullName: string;
  email: string;
  phone: string;
  size: "XS"|"S"|"M"|"L"|"XL";
  quantity: number;
  delivery: "retiro"|"envio";
  address?: string;
  notes?: string;
};

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Precio unitario de la remera (ARS)
const UNIT_PRICE = 20000;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // 1) Crear orden en Firestore
    const orderRef = adminDb.collection("orders").doc();
    const orderDoc = {
      id: orderRef.id,
      createdAt: new Date(),
      status: "pending",
      product: "Remera oficial TBV",
      unitPrice: UNIT_PRICE,
      ...body,
      amount: UNIT_PRICE * (body.quantity || 1),
    };

    await orderRef.set(orderDoc);

    // 2) Si no hay MP configurado, devolvemos ok sin init_point
    if (!MP_ACCESS_TOKEN) {
      return NextResponse.json({ ok: true, orderId: orderRef.id });
    }

    // 3) Crear preferencia en Mercado Pago (REST)
    const prefRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "Remera oficial TBV",
            quantity: body.quantity || 1,
            currency_id: "ARS",
            unit_price: UNIT_PRICE,
          },
        ],
        payer: {
          name: body.fullName,
          email: body.email,
        },
        back_urls: {
          success: `${SITE_URL}/tienda/ok`,
          failure: `${SITE_URL}/tienda/error`,
          pending: `${SITE_URL}/tienda/ok`,
        },
        auto_return: "approved",
        metadata: {
          orderId: orderRef.id,
        },
        notification_url: `${SITE_URL}/api/mercadopago/webhook`,
      }),
    });

    if (!prefRes.ok) {
      const errTxt = await prefRes.text();
      console.error("MP error:", errTxt);
      return NextResponse.json({ error: "No se pudo crear la preferencia" }, { status: 500 });
    }

    const pref = await prefRes.json();
    return NextResponse.json({ init_point: pref.init_point, id: orderRef.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 });
  }
}
