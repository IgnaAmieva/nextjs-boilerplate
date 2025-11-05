import Image from "next/image";
import Link from "next/link";
import SponsorMarquee from "@/components/SponsorMarquee";

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="container-tbv grid md:grid-cols-2 items-center gap-10">
          {/* Texto */}
          <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
            {/* Ocultar “Edición 2025” en teléfono, mostrar en md+ */}
            <p className="hidden md:block text-sm tracking-widest uppercase text-white/70">
              Edición 2025
            </p>

            <h1 className="mt-2 text-5xl md:text-6xl font-extrabold leading-tight">
              Copa <span style={{ color: "var(--tbv-500)" }}>Tunuyán</span>
            </h1>

            <p className="mt-4 text-white/80 text-lg max-w-2xl">
              Horarios verificados, resultados en vivo, sponsors y tienda oficial del torneo.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/partidos" className="btn btn-primary">Ver horarios</Link>
              <Link href="/tienda" className="btn btn-outline">Remera oficial</Link>
              <Link href="/galeria" className="btn btn-outline">Ver galería</Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="animate-fade-up" style={{ animationDelay: "140ms" }}>
            <div className="surface p-3">
              <Image
                src="/hero/torneo.jpg"
                alt="Copa Tunuyán - Imagen del torneo"
                width={1100}
                height={760}
                /* 👇 En móvil NO recortamos (se ve completa). En desktop, cover prolijo. */
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
          <Link
            href="/partidos"
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
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
              </svg>
            </span>
          </Link>

          <Link
            href="/sponsors"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ir a Sponsors"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full bg-white/10">
              Sponsors
            </div>
            <h3 className="mt-3 text-xl font-bold">Marcas que nos apoyan</h3>
            <p className="text-white/70">Grilla por niveles: Gold, Silver y Partners.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[var(--tbv-500)]">
              Ver más
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
              </svg>
            </span>
          </Link>

          <Link
            href="/tienda"
            className="surface block p-7 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tbv-500)]"
            aria-label="Ir a Tienda"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full" style={{background:"var(--tbv-gold)", color:"#111"}}>
              Tienda
            </div>
            <h3 className="mt-3 text-xl font-bold">Remera oficial</h3>
            <p className="text-white/70">Compra segura. Retiro en sede.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[var(--tbv-500)]">
              Ver más
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
