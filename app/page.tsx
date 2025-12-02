// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import SponsorMarquee from "@/components/SponsorMarquee";

const SHEETS_URL =
  process.env.NEXT_PUBLIC_SHEETS_URL ??
  "https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit";

// 👉 NUEVO link de inscripción (el que me pasaste)
const INSCRIPCION_URL =
  "https://docs.google.com/forms/d/1dHdpHHzXWw2nZDABaTxdZQIDeEymd0jYNOx_OxfZVHs/edit";

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      {/* Más compacto en mobile para que no se corte tanto en iPhone */}
      <section className="hero-section pt-6 md:pt-8 pb-3 md:pb-8">
        <div className="container-tbv flex flex-col md:flex-row items-center gap-3 md:gap-10">
          {/* Bloque: logo + texto + botones */}
          <div className="animate-fade-up text-center md:text-left" style={{ animationDelay: "80ms" }}>
            <p className="hidden md:block text-sm tracking-widest uppercase text-white/70">
              Edición 2025
            </p>

            {/* Logo principal */}
            <div className="mt-6 md:mt-2 flex justify-center md:justify-start">
              <Image
                src="/hero/LOGO-TITULO.png"
                alt="Copa Tunuyán Beach Vóley"
                width={480}
                height={210}
                className="w-full max-w-[320px] md:max-w-[380px] h-auto"
                priority
              />
            </div>

            {/* Texto debajo */}
            <p className="mt-2 text-white/80 text-sm md:text-lg max-w-xs md:max-w-2xl mx-auto md:mx-0">
              20 y 21 de diciembre · 3.ª edición.
            </p>

            {/* Botones */}
            <div className="mt-8 md:mt-8 flex flex-row flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
              {/* 👉 Ahora dice “Inscribirse” y va directo al formulario */}
              <a
                href={INSCRIPCION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Inscribirse
              </a>

              <Link href="/tienda" className="btn btn-outline">
                Tienda
              </Link>

              <Link href="/info" className="btn btn-outline">
                Info útil
              </Link>
            </div>
          </div>

          {/* Bloque: foto secundaria */}
          <div className="animate-fade-up mt-3 md:mt-0" style={{ animationDelay: "140ms" }}>
            <div className="surface p-3">
              <Image
                src="/hero/torneo.jpg"
                alt="Copa Tunuyán - Imagen del torneo"
                width={1100}
                height={760}
                className="
                  w-[90vw] max-w-[520px]
                  h-auto max-h-[260px] md:max-h-none
                  rounded-2xl object-contain md:object-cover
                "
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <SponsorMarquee />

      {/* ===== CARDS ===== */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="container-tbv grid md:grid-cols-3 gap-8 md:gap-10">
          {/* Card 1 -> Google Sheets (fixture) */}
          <a
            href={INSCRIPCION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ver fixture en Google Sheets"
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

          {/* Card 2 -> Sponsors / Galería */}
          <Link
            href="/galeria"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ir a Sponsors (galería)"
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
    </main>
  );
}
