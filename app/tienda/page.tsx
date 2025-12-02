"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import { useRouter } from "next/navigation";

type Producto = {
  id: string;
  nombre: string;
  precio: number; // ARS
  imagen: string;
  categoria: "Camiseta" | "Short" | "Entrenamiento";
};

const NUMERO_WPP = "5492622465311";

export default function TiendaPage() {
  const router = useRouter();
  const { add } = useCart();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [talle, setTalle] = useState("M");
  const [color, setColor] = useState("Celeste");
  const [cantidad, setCantidad] = useState(1);
  const [adding, setAdding] = useState(false); // anti doble-click

  const colores = [
    { nombre: "Celeste", hex: "#84B9E6" },
    { nombre: "Blanca", hex: "#e6edf3" },
    { nombre: "Negra", hex: "#0c1116" },
  ];
  const talles = ["S", "M", "L", "XL", "XXL", "XXXL"];

  // ✅ Producto principal (único que se paga online)
  const productoPrincipal: Producto = {
    id: "remera-oficial",
    nombre: "Remera oficial del torneo",
    precio: 35000, // 👈 NUEVO PRECIO
    imagen: "/tienda/remera-blanca.jpg",
    categoria: "Camiseta",
  };

  // ✅ Otras prendas → solo WhatsApp
  const productos: Producto[] = [
    {
      id: "remera-celeste",
      nombre: "Camiseta celeste",
      precio: 0,
      imagen: "/tienda/remera-celeste1.jpg",
      categoria: "Camiseta",
    },
    {
      id: "remera-negra",
      nombre: "Camiseta negra",
      precio: 0,
      imagen: "/tienda/remera-negra1.jpg",
      categoria: "Camiseta",
    },
    {
      id: "short-negro",
      nombre: "Short negro",
      precio: 0,
      imagen: "/tienda/short-negro.jpg",
      categoria: "Short",
    },
    {
      id: "train-negra",
      nombre: "Remera entrenamiento",
      precio: 0,
      imagen: "/tienda/train-negra.jpg",
      categoria: "Entrenamiento",
    },
  ];

  const abrirModal = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setTalle("M");
    setColor("Celeste");
    setCantidad(1);
    setModalAbierto(true);
  };

  const agregarAlCarrito = () => {
    if (!productoSeleccionado || adding) return;
    setAdding(true);

    // 👉 Se guarda en el contexto del carrito
    add({
      id: productoSeleccionado.id,
      name: productoSeleccionado.nombre,
      image: productoSeleccionado.imagen,
      price: productoSeleccionado.precio,
      color,
      size: talle,
      qty: cantidad,
    });

    setAdding(false);
    setModalAbierto(false);

    // 👉 Los llevo a la pantalla donde completan todos los datos
    router.push("/carrito");
  };

  const consultarPorWhatsApp = (producto: Producto) => {
    const mensaje = `Hola! Quería consultar si hay disponibilidad de *${producto.nombre}* de la Copa Tunuyán. ¿Qué talles y colores tienen?`;
    window.location.href = `https://wa.me/${NUMERO_WPP}?text=${encodeURIComponent(
      mensaje
    )}`;
  };

  return (
    <main>
      {/* ===== Producto principal ===== */}
      <section className="pt-[4.8rem] md:pt-[3.2rem] pb-10 md:pb-12">
        <div className="container-tbv">
          <div className="surface p-5 md:p-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2">
              <Image
                src={productoPrincipal.imagen}
                alt={productoPrincipal.nombre}
                width={900}
                height={900}
                className="w-full h-auto rounded-2xl object-contain cursor-pointer"
                onClick={() => abrirModal(productoPrincipal)}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
                {productoPrincipal.nombre}
              </h1>

              <p className="text-white/80 mb-6">
                Edición 2025 · Tela deportiva premium, liviana y respirable.
                Estampado frontal y dorsal de la Copa Tunuyán.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <span className="text-3xl font-bold text-[var(--tbv-gold)]">
                  $
                  {productoPrincipal.precio.toLocaleString("es-AR", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>

              <button
                type="button"
                onClick={() => abrirModal(productoPrincipal)}
                className="btn btn-primary w-full md:w-auto text-lg"
                aria-label="Comprar remera oficial del torneo"
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 cards (solo WhatsApp) ===== */}
      <section className="pb-24 md:pb-28">
        <div className="container-tbv">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center md:text-left">
            Otras prendas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {productos.map((p) => (
              <button
                key={p.id}
                type="button"
                className="surface overflow-hidden hover:brightness-110 transition block p-0 text-left"
                onClick={() => consultarPorWhatsApp(p)}
                aria-label={`Consultar por WhatsApp sobre ${p.nombre}`}
              >
                <Image
                  src={p.imagen}
                  alt={p.nombre}
                  width={600}
                  height={600}
                  className="w-full h-44 object-cover rounded-xl"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="px-4 py-3">
                  <p className="font-semibold text-sm">{p.nombre}</p>
                  <p className="text-xs text-[var(--tbv-500)] mt-1">
                    Consultar disponibilidad por WhatsApp
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="text-white/60 hover:text-[var(--tbv-500)] text-sm underline"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Modal compra (solo remera oficial) ===== */}
      {modalAbierto && productoSeleccionado && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 relative"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,30,45,1), rgba(15,22,30,.95))",
              border: "1px solid rgba(255,255,255,.1)",
              boxShadow: "0 0 40px rgba(0,0,0,.5)",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Comprar ${productoSeleccionado.nombre}`}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-white/60 hover:text-white text-xl"
              onClick={() => setModalAbierto(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <Image
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                width={480}
                height={480}
                className="w-full h-48 object-contain rounded-xl mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">
                {productoSeleccionado.nombre}
              </h2>
              <p className="text-[var(--tbv-gold)] font-semibold text-lg">
                $
                {productoSeleccionado.precio.toLocaleString("es-AR", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            {/* Color */}
            <div className="mb-5">
              <h4 className="text-sm uppercase text-white/60 font-bold mb-2 text-center">
                Color
              </h4>
              <div className="flex gap-3 justify-center">
                {colores.map((c) => (
                  <button
                    key={c.nombre}
                    type="button"
                    onClick={() => setColor(c.nombre)}
                    className={`w-9 h-9 rounded-full border-2 ${
                      color === c.nombre
                        ? "border-[var(--tbv-500)] scale-110"
                        : "border-white/20"
                    } transition`}
                    style={{ background: c.hex }}
                    aria-label={`Color ${c.nombre}`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-center text-white/70">{color}</p>
            </div>

            {/* Talle */}
            <div className="mb-5">
              <h4 className="text-sm uppercase text-white/60 font-bold mb-2 text-center">
                Talle
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {talles.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTalle(t)}
                    className={`w-12 py-2 text-sm font-semibold rounded-md transition border ${
                      talle === t
                        ? "border-[var(--tbv-500)] bg-[var(--tbv-700)]"
                        : "border-white/20 bg-transparent hover:border-white/40"
                    }`}
                    aria-label={`Talle ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-sm text-center text-white/70">{talle}</p>
            </div>

            {/* Cantidad */}
            <div className="mb-6 text-center">
              <h4 className="text-sm uppercase text-white/60 font-bold mb-2">
                Cantidad
              </h4>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="px-3 py-1 rounded-md bg-white/10 text-lg"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  aria-label="Restar cantidad"
                >
                  -
                </button>
                <span className="text-xl font-bold" aria-live="polite">
                  {cantidad}
                </span>
                <button
                  type="button"
                  className="px-3 py-1 rounded-md bg-white/10 text-lg"
                  onClick={() => setCantidad(cantidad + 1)}
                  aria-label="Sumar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold">Total:</h3>
              <span className="text-2xl font-bold text-[var(--tbv-500)]">
                {(
                  productoSeleccionado.precio * cantidad
                ).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary w-full text-lg"
              onClick={agregarAlCarrito}
              disabled={adding}
            >
              {adding ? "Agregando…" : "Agregar al carrito"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
