import { NextResponse } from "next/server";

function absoluteBase() {
  const env = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const u = new URL(env);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "http://localhost:3000";
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const itemsIn = Array.isArray(body?.items) ? body.items : [];
    if (!itemsIn.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "MP_ACCESS_TOKEN missing" }, { status: 500 });
    }

    const BASE = absoluteBase();

    const payload: any = {
      items: itemsIn.map((it: any, i: number) => ({
        id: it.id || `item-${i + 1}`,
        title: String(it.name || "Producto"),
        quantity: Math.max(1, Number(it.qty) || 1),
        unit_price: Math.max(1, Number(it.price) || 1),
        currency_id: "ARS",
      })),
      back_urls: {
        success: `${BASE}/carrito?status=success`,
        failure: `${BASE}/carrito?status=failure`,
        pending:  `${BASE}/carrito?status=pending`,
      },
    };

    // ⚠️ En localhost, comentar auto_return para evitar el 400 de MP.
    // En producción (Vercel/https) lo podés activar de nuevo.
    if (!BASE.includes("localhost")) {
      payload.auto_return = "approved";
    }

    console.log("🟦 Enviando a MP:", JSON.stringify(payload, null, 2));

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ MP error", res.status, data);
      return NextResponse.json(
        { error: data?.message || "MercadoPago error", details: data, sent: payload },
        { status: res.status }
      );
    }

    const init_point = data.init_point || data.sandbox_init_point;
    if (!init_point) {
      return NextResponse.json({ error: "No init_point received", details: data }, { status: 500 });
    }

    return NextResponse.json({ init_point, id: data.id });
  } catch (e: any) {
    console.error("❌ /api/checkout exception:", e);
    return NextResponse.json({ error: e?.message || "internal error" }, { status: 500 });
  }
}
