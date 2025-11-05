"use client";
import { useCart } from "@/src/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CarritoPage() {
  const { state, setQty, remove, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const search = useSearchParams();
  const status = search.get("status"); // success | failure | pending

  const subtotal = state.items.reduce((a, b) => a + b.price * b.qty, 0);

  const banner = useMemo(() => {
    if (!status) return null;
    const base = "rounded-lg p-3 mb-6 text-sm";
    if (status === "success")
      return <div className={`${base}`} style={{background:"rgba(16,90,40,.35)", border:"1px solid rgba(46,204,113,.35)"}}>✅ Pago aprobado. ¡Gracias por tu compra!</div>;
    if (status === "failure")
      return <div className={`${base}`} style={{background:"rgba(120,0,0,.35)", border:"1px solid rgba(231,76,60,.35)"}}>❌ El pago fue rechazado o cancelado.</div>;
    return <div className={`${base}`} style={{background:"rgba(60,60,0,.35)", border:"1px solid rgba(241,196,15,.35)"}}>⏳ El pago está pendiente.</div>;
  }, [status]);

  const pagar = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: state.items }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Error al crear preferencia:", data);
        alert(
          `No se pudo iniciar el pago.\nMotivo: ${data?.error || res.status}\n` +
          (data?.details ? `Detalles: ${JSON.stringify(data.details)}` : "") +
          (data?.sent ? `\n\nPayload enviado:\n${JSON.stringify(data.sent, null, 2)}` : "")
        );
        return;
      }

      if (data?.init_point) {
        window.location.href = data.init_point; // redirige a MP
      } else {
        alert("No se recibió init_point de Mercado Pago.");
      }
    } catch (e: any) {
      alert(`Error iniciando el pago: ${e?.message || "Desconocido"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-24">
      <div className="container-tbv">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Tu carrito</h1>
        {banner}

        {state.items.length === 0 ? (
          <div className="surface p-8 text-center">
            <p className="text-white/70 mb-4">Tu carrito está vacío.</p>
            <Link href="/tienda" className="btn btn-primary">Ir a la tienda</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-[1fr,380px] gap-8">
            {/* Lista de ítems */}
            <div className="space-y-4">
              {state.items.map((item, i) => (
                <div key={`${item.id}-${item.color}-${item.size}-${i}`} className="surface p-4 flex gap-4 items-center">
                  <Image src={item.image} alt={item.name} width={100} height={100} className="w-24 h-24 rounded-lg object-cover"/>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-white/70">
                          {item.color ? <>Color: {item.color} · </> : null}
                          {item.size ? <>Talle: {item.size}</> : null}
                        </p>
                      </div>
                      <button className="text-white/70 hover:text-white" onClick={() => remove(item.id, item.color, item.size)}>
                        Eliminar
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button className="px-3 py-1 rounded-md bg-white/10" onClick={() => setQty(item.id, Math.max(1, item.qty - 1), item.color, item.size)}>-</button>
                        <span className="font-semibold">{item.qty}</span>
                        <button className="px-3 py-1 rounded-md bg-white/10" onClick={() => setQty(item.id, item.qty + 1, item.color, item.size)}>+</button>
                      </div>
                      <div className="text-[var(--tbv-gold)] font-bold">
                        ${(item.price * item.qty).toLocaleString("es-AR")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <aside className="surface p-6 h-fit">
              <h2 className="font-bold text-xl mb-4">Resumen</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70">Subtotal</span>
                <span className="font-semibold">${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/70">Envío</span>
                <span className="font-semibold">A calcular</span>
              </div>
              <button className="btn btn-primary w-full mb-3" onClick={pagar} disabled={loading}>
                {loading ? "Redirigiendo…" : "Ir a pagar con Mercado Pago"}
              </button>
              <button className="btn btn-outline w-full" onClick={clear}>Vaciar carrito</button>
              <p className="text-xs text-white/60 mt-4">
                Al continuar serás redirigido al checkout seguro de Mercado Pago.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
