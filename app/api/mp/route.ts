import { NextResponse } from "next/server";

function getBaseUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (!env) return "http://localhost:3000";
  try {
    const url = new URL(env);
    return url.origin;
  } catch {
    return "http://localhost:3000";
  }
}

export async function POST(req: Request) {
  try {
    const { items, total } = await req.json();

    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      console.error("❌ MP_ACCESS_TOKEN missing");
      return NextResponse.json(
        { error: "MP_ACCESS_TOKEN missing" },
        { status: 500 }
      );
    }

    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    const BASE = getBaseUrl();

    const preference = {
      items: [
        {
          title: "Compra Copa Tunuyán",
          quantity: 1,
          unit_price: Number(total) || 1,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${BASE}/tienda/ok`,
        failure: `${BASE}/tienda/error`,
        pending: `${BASE}/tienda/error`,
      },
      auto_return: "approved",
    };

    const res = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Mercado Pago error", res.status, data);
      return NextResponse.json(
        { error: "Mercado Pago error", detail: data },
        { status: res.status }
      );
    }

    const init_point = data.init_point || data.sandbox_init_point;
    if (!init_point) {
      console.error("❌ No init_point from MP", data);
      return NextResponse.json(
        { error: "No init_point from Mercado Pago", detail: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ init_point });
  } catch (e: any) {
    console.error("❌ /api/mp error", e);
    return NextResponse.json(
      { error: e?.message || "internal error" },
      { status: 500 }
    );
  }
}
