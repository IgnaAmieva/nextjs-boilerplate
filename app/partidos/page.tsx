// app/partidos/page.tsx
"use client";

import Link from "next/link";

const INSCRIPCION_URL =
  "https://docs.google.com/forms/d/1dHdpHHzXWw2nZDABaTxdZQIDeEymd0jYNOx_OxfZVHs/edit";

export default function PartidosPage() {
  return (
    <main className="pt-[5rem] md:pt-[4.5rem] pb-12">
      <div className="container-tbv flex items-center justify-center min-h-[60vh]">
        <div className="surface max-w-md w-full p-6 md:p-7 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Horarios del torneo
          </h1>

          <p className="text-sm md:text-base text-white/80 mb-3">
            Por el momento no es posible ver los partidos.
            Los horarios se publicarán durante el torneo, el{" "}
            <strong>20 y 21 de diciembre</strong>.
          </p>

          <p className="text-sm md:text-base text-white/80 mb-5">
            Mientras tanto, podés inscribirte a la <strong>Copa Tunuyán</strong>{" "}
            desde el siguiente enlace:
          </p>

          <a
            href={INSCRIPCION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full mb-3"
          >
            Inscribirme para jugar
          </a>

          <Link
            href="/"
            className="block text-sm text-white/70 hover:text-white underline mt-1"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
