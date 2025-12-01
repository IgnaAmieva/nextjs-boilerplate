import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items, total } = await req.json();

    // 🔵 REEMPLAZÁ con tu token de MercadoPago
    const TOKEN = process.env.MP_ACCESS_TOKEN;

    const body = {
      items: [
        {
          title: "Compra Copa Tunuyán",
          quantity: 1,
          unit_price: total,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://tuweb.com/success",
        failure: "https://tuweb.com/error",
        pending: "https://tuweb.com/pending",
      },
      auto_return: "approved",
    };

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json({
      init_point: data.init_point,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creando link" }, { status: 500 });
  }
}
