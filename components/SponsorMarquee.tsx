"use client";

import Image from "next/image";

type Sponsor = { name: string; logo: string; url?: string };

const sponsors: Sponsor[] = [
  { name: "Sponsor 1", logo: "/MARCA_CODYS_11.png", url: "#" },
  { name: "Sponsor 2", logo: "/MARCA_CODYS_10.png", url: "#" },
  { name: "Sponsor 3", logo: "/logo-cuadrado.png", url: "#" },
  { name: "Sponsor 4", logo: "/logo-negro.png", url: "#" },
  { name: "Sponsor 5", logo: "/logo-blanco.png", url: "#" },
];

export default function SponsorMarquee() {
  // Duplicamos los ítems dentro de la MISMA fila para loop perfecto (una sola línea)
  const track = [...sponsors, ...sponsors];

  return (
    <section aria-label="Sponsors del torneo" className="pt-6 pb-8">
      <div className="container-tbv">
        {/* Logos (deben quedar por ENCIMA de la línea dorada) */}
        <div className="marquee">
          <ul className="marquee__row">
            {track.map((s, i) => (
              <li key={`${s.name}-${i}`} className="marquee__item">
                <a
                  href={s.url ?? "#"}
                  className="opacity-80 hover:opacity-100 transition"
                  aria-label={s.name}
                >
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={220}
                    height={88}
                    className="h-12 w-auto object-contain"
                    priority={i < 6}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Línea dorada ABAJO */}
        <div className="h-2 mt-6" style={{ background: "var(--tbv-gold)" }} />
      </div>
    </section>
  );
}
