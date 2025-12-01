"use client";

import { useCart } from "@/src/context/CartContext";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";
import Link from "next/link";

export default function CarritoPage() {
  // 👇 ahora sí respetamos la forma real del contexto
  const { state, remove, clear } = useCart();
  const { items } = state;
  const total = items.reduce(
    (sum: number, item: any) => sum + (item.price ?? 0) * (item.qty ?? 0),
    0
  );

  const hayItems = items.length > 0;

  return (
    <main className="pt-[5rem] md:pt-[4rem] pb-20">
      <div className="container-tbv">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
          Carrito &amp; datos de compra
        </h1>

        {!hayItems && (
          <div className="surface p-6 text-center">
            <p className="text-white/70 mb-4">
              Todavía no agregaste ninguna prenda al carrito.
            </p>
            <Link href="/tienda" className="btn btn-primary">
              Ir a la tienda
            </Link>
          </div>
        )}

        {hayItems && (
          <div className="grid lg:grid-cols-[1.25fr,1fr] gap-8 md:gap-10">
            {/* --- Resumen de productos --- */}
            <section className="surface p-5 md:p-7 self-start">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold">Tu selección</h2>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-white/60 hover:text-white underline"
                >
                  Vaciar carrito
                </button>
              </div>

              <ul className="space-y-4">
                {items.map((item: any) => (
                  <li
                    key={item.id + (item.size ?? "") + (item.color ?? "")}
                    className="flex gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-white/60">
                        Talle: <strong>{item.size}</strong>{" "}
                        · Color: <strong>{item.color}</strong>
                      </p>
                      <p className="text-sm text-white/60">
                        Cantidad: <strong>{item.qty}</strong>
                      </p>
                      <p className="mt-1 font-semibold text-[var(--tbv-gold)]">
                        $
                        {(item.price * item.qty).toLocaleString("es-AR", {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(item.id, item.size, item.color)}
                      className="text-sm text-white/60 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-white/60">Total</span>
                <span className="text-2xl font-bold text-[var(--tbv-gold)]">
                  $
                  {total.toLocaleString("es-AR", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>

              <p className="mt-3 text-xs text-white/50">
                * El total final puede incluir costos de envío dependiendo de la
                dirección que ingreses.
              </p>
            </section>

            {/* --- Formulario de datos + pago --- */}
            <section className="surface p-5 md:p-7 self-start">
              {/* 👇 le pasamos los items y total reales */}
              <CheckoutForm items={items} total={total} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
