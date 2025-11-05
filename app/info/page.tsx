import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";

const TAXIS = [
  { nombre: "Taxi Tunuyán 1", tel: "+54 9 261 xxx xxxx" },
  { nombre: "Taxi Tunuyán 2", tel: "+54 9 261 xxx xxxx" },
];

const HOTELES = [
  { nombre: "Hotel Centro", url: "#", dir: "Av. Principal 123" },
  { nombre: "Hostel Playa", url: "#", dir: "Calle Costanera 456" },
];

export default function InfoPage() {
    
  return (
    <Container className="py-8">
      <SectionTitle title="Info útil" subtitle="Sede, cómo llegar, taxis y alojamientos." />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl overflow-hidden border border-[--tbv-100] bg-white">
          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.999!2d-69.0!3d-33.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z!5e0!3m2!1ses!2sar!4v000"
            className="w-full h-[340px]"
            loading="lazy"
          />
        </div>

        <div className="grid gap-6">
          <div className="rounded-xl border border-[--tbv-100] bg-white p-4">
            <h3 className="font-bold text-lg mb-2">Taxis</h3>
            <ul className="space-y-2">
              {TAXIS.map(t => (
                <li key={t.nombre} className="flex items-center justify-between">
                  <span>{t.nombre}</span>
                  <a href={`tel:${t.tel}`} className="px-3 py-1 rounded-lg bg-[--tbv-600] text-white text-sm">Llamar</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[--tbv-100] bg-white p-4">
            <h3 className="font-bold text-lg mb-2">Alojamientos</h3>
            <ul className="space-y-2">
              {HOTELES.map(h => (
                <li key={h.nombre} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{h.nombre}</div>
                    <div className="text-sm text-[--tbv-700]/70">{h.dir}</div>
                  </div>
                  <a href={h.url} className="px-3 py-1 rounded-lg border border-[--tbv-200] hover:bg-[--tbv-50] text-sm">Ver</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
