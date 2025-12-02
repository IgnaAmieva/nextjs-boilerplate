"use client";

import { FormEvent, useState } from "react";

type MetodoEntrega = "retiro" | "envio";

interface CheckoutFormProps {
  items: any[];
  total: number;
}

export default function CheckoutForm({ items, total }: CheckoutFormProps) {
  const [metodoEntrega, setMetodoEntrega] =
    useState<MetodoEntrega>("retiro");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const nombre = data.get("nombre");
    const apellido = data.get("apellido");
    const email = data.get("email");
    const telefono = data.get("telefono");
    const provincia = data.get("provincia");
    const ciudad = data.get("ciudad");
    const direccion = data.get("direccion");
    const aclaraciones = data.get("aclaraciones");

    // 1) Generar link de Mercado Pago
    let linkPago = "";

    try {
      const res = await fetch("/api/mp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total }),
      });

      const dataMP = await res.json();

      if (dataMP.init_point) {
        linkPago = dataMP.init_point;
      } else {
        linkPago = "No se pudo generar link de pago.";
      }
    } catch (err) {
      console.error(err);
      linkPago = "Error generando link de MP.";
    }

    // 2) Armar mensaje para WhatsApp
    const carritoTexto = items
      .map(
        (item) =>
          `• ${item.name} - Talle ${item.size} - Color ${item.color} x${
            item.qty
          } — $${(item.price * item.qty).toLocaleString("es-AR")}`
      )
      .join("%0A");

    const mensaje = `
🛒 *NUEVA ORDEN DE COMPRA*

👤 *Datos del comprador:*
• Nombre: ${nombre} ${apellido}
• Email: ${email}
• Teléfono: ${telefono}

📍 *Entrega:* ${
      metodoEntrega === "envio" ? "Envío a domicilio" : "Retiro en sede"
    }

${
  metodoEntrega === "envio"
    ? `🏠 *Dirección de envío:*
• Provincia: ${provincia}
• Ciudad: ${ciudad}
• Dirección: ${direccion}`
    : `🏠 Ciudad/Provincia:
• ${ciudad}, ${provincia}`
}

📝 *Aclaraciones:*
${aclaraciones || "Ninguna"}

👕 *Productos:*
${carritoTexto}

💰 *Total:* $${total.toLocaleString("es-AR")}

--------------------

💳 *Pagar con Mercado Pago:*
${linkPago}

--------------------

¿Confirmamos? 🎉
`.trim();

    const numeroDestino = "5492622465311";

    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.location.href = url;
  };

  return (
    <section className="w-full">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Datos para la compra
      </h2>

      <p className="text-white/60 text-sm mb-8">
        Completá tus datos para finalizar la compra.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre y Apellido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input
              name="nombre"
              required
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Apellido</label>
            <input
              name="apellido"
              required
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
            />
          </div>
        </div>

        {/* Email / Teléfono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Teléfono</label>
            <input
              name="telefono"
              required
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
            />
          </div>
        </div>

        {/* Método de entrega */}
        <div className="space-y-2">
          <p className="text-sm">¿Cómo querés recibir la remera?</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMetodoEntrega("retiro")}
              className={`px-4 py-2 rounded-full border ${
                metodoEntrega === "retiro" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              Retiro en sede
            </button>

            <button
              type="button"
              onClick={() => setMetodoEntrega("envio")}
              className={`px-4 py-2 rounded-full border ${
                metodoEntrega === "envio" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              Envío a domicilio
            </button>
          </div>

          <input type="hidden" name="metodoEntrega" value={metodoEntrega} />
        </div>

        {/* Provincia / Ciudad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Provincia</label>
            <input
              name="provincia"
              defaultValue="Mendoza"
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Ciudad</label>
            <input
              name="ciudad"
              defaultValue="Tunuyán"
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
            />
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm mb-1">Dirección</label>
          <input
            name="direccion"
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
          />
        </div>

        {/* Aclaraciones */}
        <div>
          <label className="block text-sm mb-1">Aclaraciones</label>
          <textarea
            name="aclaraciones"
            rows={3}
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-full"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full py-3 bg-[#ffb836] text-black rounded-full font-semibold hover:bg-[#ffc85b] transition"
        >
          Confirmar y pagar por WhatsApp
        </button>
      </form>
    </section>
  );
}
