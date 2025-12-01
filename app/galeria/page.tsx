import Image from "next/image";

const sponsors = [
  { name: "Sponsor 1", src: "/sponsors/s1.png" },
  { name: "Sponsor 2", src: "/sponsors/s2.png" },
  { name: "Sponsor 3", src: "/sponsors/s3.png" },
  { name: "Sponsor 4", src: "/sponsors/s4.png" },
];

export default function GaleriaPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6">
      <h1 className="text-4xl font-extrabold mt-2 md:mt-4">Galería de Sponsors</h1>
      <p className="text-white/70 mt-2">Todas las marcas que acompañan la Copa Tunuyán.</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {sponsors.map((s) => (
          <div key={s.name} className="rounded-2xl bg-white/5 p-6 flex items-center justify-center">
            <Image src={s.src} alt={s.name} width={220} height={90} className="object-contain" />
          </div>
        ))}
      </div>
    </main>
  );
}
