// app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SponsorMarquee from "@/components/SponsorMarquee";

const SHEETS_URL =
  process.env.NEXT_PUBLIC_SHEETS_URL ??
  "https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit"; // poné tu link real acá

const INSCRIPCION_URL = "https://forms.gle/eNhFtDQxdkKFgdm76";

export default function Home() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <main>
      {/* ===== HERO ===== */}
      {/* un poco más compacto en mobile para que se parezca al simulador */}
      <section className="hero-section pt-10 md:pt-8 pb-3 md:pb-8">
        <div className="container-tbv flex flex-col md:flex-row items-center gap-4 md:gap-10">
          {/* Bloque: logo + texto + botones */}
          <div
            className="animate-fade-up text-center md:text-left"
            style={{ animationDelay: "80ms" }}
          >
            <p className="hidden md:block text-sm tracking-widest uppercase text-white/70">
              Edición 2025
            </p>

            {/* Logo principal */}
            <div className="mt-10 md:mt-4 flex justify-center md:justify-start">
              <Image
                src="/hero/LOGO-TITULO.png"
                alt="Copa Tunuyán Beach Vóley"
                width={500}
                height={220}
                className="w-full max-w-[360px] h-auto"
                priority
              />
            </div>

            {/* Texto debajo */}
            <p className="mt-2 text-white/80 text-base md:text-lg max-w-sm md:max-w-2xl mx-auto md:mx-0">
              20 y 21 de diciembre · 3.ª edición.
            </p>

            {/* Botones -> un poco más abajo que el texto, pero sin robar tanto alto */}
            <div className="mt-20 md:mt-10 flex flex-row flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="btn btn-primary"
              >
                Ver horarios
              </button>

              <Link href="/tienda" className="btn btn-outline">
                Tienda
              </Link>

              <Link href="/info" className="btn btn-outline">
                Info útil
              </Link>
            </div>
          </div>

          {/* Bloque: foto secundaria -> pegada a los botones pero sin ocupar tanto alto */}
          <div
            className="animate-fade-up mt-3 md:mt-0"
            style={{ animationDelay: "140ms" }}
          >
            <div className="surface p-3">
              <Image
                src="/hero/torneo.jpg"
                alt="Copa Tunuyán - Imagen del torneo"
                width={1100}
                height={760}
                className="w-[88vw] max-w-[560px] h-auto rounded-2xl object-contain md:object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <SponsorMarquee />

      {/* ===== CARDS ===== */}
      <section className="pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="container-tbv grid md:grid-cols-3 gap-8 md:gap-10">
          {/* Card 1 -> Google Sheets */}
          <a
            href={SHEETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ir a Partidos"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full bg-white/10">
              Horarios
            </div>
            <h3 className="mt-3 text-xl font-bold">Fixture en vivo</h3>
            <p className="text-white/70">Filtrá por día, cancha y categoría.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[var(--tbv-500)]">
              Ver más
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </span>
          </a>

          {/* Card 2 -> Sponsors */}
          <Link
            href="/galeria"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ir a Sponsors"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full bg-white/10">
              Sponsors
            </div>
            <h3 className="mt-3 text-xl font-bold">Marcas que nos apoyan</h3>
            <p className="text-white/70">
              Grilla por niveles: Gold, Silver y Partners.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[var(--tbv-500)]">
              Ver más
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </span>
          </Link>

          {/* Card 3 -> Tienda */}
          <Link
            href="/tienda"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ir a Tienda"
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full"
              style={{ background: "var(--tbv-gold)", color: "#111" }}
            >
              Tienda
            </div>
            <h3 className="mt-3 text-xl font-bold">Remera oficial</h3>
            <p className="text-white/70">Compra segura. Retiro en sede.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[var(--tbv-500)]">
              Ver más
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ===== MODAL VER HORARIOS ===== */}
      {isScheduleModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsScheduleModalOpen(false)}
        >
          <div
            className="max-w-md w-full p-6 rounded-2xl bg-black border border-white/10 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2 text-white">
              Horarios del torneo
            </h2>
            <p className="text-sm text-white/80 mb-3">
              Por el momento no es posible ver los partidos.
              Los horarios se publicarán durante el torneo, el 20 y 21 de diciembre.
            </p>
            <p className="text-sm text-white/80 mb-4">
              Mientras tanto, podés inscribirte a la Copa Tunuyán desde el siguiente enlace:
            </p>

            <a
              href={INSCRIPCION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full text-center"
            >
              Anotarme al torneo
            </a>

            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="mt-3 w-full text-sm text-white/70 hover:text-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
