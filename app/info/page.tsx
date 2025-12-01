import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";

// 🏐 SEDES DEL TORNEO (mapas oficiales)
const SEDES = [
  {
    nombre: "Tiro Club Sportivo Tunuyán — Spot principal del torneo (3 canchas)",
    mapa: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3331.5108310625186!2d-69.0209351!3d-33.5867763!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967cc2a2b6e320c5%3A0x782e8f3a46491ac2!2sTiro%20Club%20Sportivo%20Tunuy%C3%A1n!5e0!3m2!1ses!2sar!4v1700000000000",
  },
  {
    nombre: "Parque Las Vías — Tunuyán, Mendoza",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.88014901719!2d-69.01613382345588!3d-33.575681373357084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967cc1eb6c08a4f9%3A0xf6762b50e54f9b89!2sParque%20Las%20V%C3%ADas!5e0!3m2!1ses!2sar!4v1700000000001",
  },
];

// 🏠 Alojamientos
const ALOJAMIENTOS = [
  {
    nombre: "Albergue Municipal de Tunuyán",
    url: "https://maps.app.goo.gl/5nDG7WrG9vqGwoiL7?g_st=com.google.maps.preview.copy",
    dir: "Ver ubicación en Google Maps",
  },
  {
    nombre: "Hostal del Sol",
    url: "https://maps.app.goo.gl/AHEC8e87xLqXx9bB9?g_st=com.google.maps.preview.copy",
    dir: "Teléfono: 2622424396",
  },
];

// 🚕 Taxis
const TAXIS = [{ nombre: "Taxi Tunuyán", tel: "424424" }];

// 🍝 Comida
const COMIDA = [
  {
    nombre: "Cantina del Tiro Club",
    desc: "Menú especial con descuento para atletas.",
    tel: "",
  },
];

export default function InfoPage() {
  return (
    <Container className="py-12 md:py-16">
      <SectionTitle
        title="Info útil"
        subtitle="Sedes, alojamiento, taxis y comida para el torneo."
      />

      <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-10">
        {/* 🏐 SEDES */}
        <div className="grid gap-6">
          {SEDES.map((s) => (
            <div key={s.nombre} className="surface overflow-hidden">
              <h3 className="px-5 pt-4 pb-3 text-base md:text-lg font-semibold text-white">
                {s.nombre}
              </h3>
              <div className="border-t border-white/10">
                <iframe
                  title={s.nombre}
                  src={s.mapa}
                  className="w-full h-[260px] md:h-[320px] rounded-b-2xl md:rounded-b-[18px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 🏠 ALOJAMIENTO + TAXIS + COMIDA */}
        <div className="grid gap-6">
          {/* Alojamientos */}
          <div className="surface p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
              Alojamiento
            </h3>
            <ul className="space-y-3">
              {ALOJAMIENTOS.map((a) => (
                <li
                  key={a.nombre}
                  className="flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-medium text-white">{a.nombre}</div>
                    <div className="text-sm text-white/70">{a.dir}</div>
                  </div>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-[var(--tbv-500)] hover:bg-white/5 text-sm text-white transition"
                  >
                    Ver
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Taxis */}
          <div className="surface p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
              Taxis
            </h3>
            <ul className="space-y-2">
              {TAXIS.map((t) => (
                <li
                  key={t.nombre}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-white">{t.nombre}</span>
                  <a
                    href={`tel:${t.tel}`}
                    className="px-3 py-1.5 rounded-lg bg-[var(--tbv-500)] text-sm font-semibold text-[#0b1119] hover:brightness-110 transition"
                  >
                    Llamar
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comida */}
          <div className="surface p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
              Almuerzo y cena
            </h3>
            <ul className="space-y-2">
              {COMIDA.map((c) => (
                <li
                  key={c.nombre}
                  className="flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-medium text-white">{c.nombre}</div>
                    <div className="text-sm text-white/70">{c.desc}</div>
                  </div>
                  {c.tel ? (
                    <a
                      href={`tel:${c.tel}`}
                      className="px-3 py-1.5 rounded-lg bg-[var(--tbv-500)] text-sm font-semibold text-[#0b1119] hover:brightness-110 transition"
                    >
                      Llamar
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
