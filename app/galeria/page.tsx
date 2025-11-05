import Image from "next/image";

const photos = [
  "/MARCA_CODYS_11.png",
  "/MARCA_CODYS_10.png",
  "/logo-cuadrado.png",
  "/logo-negro.png",
  "/logo-blanco.png",
  "/logo-tbv-avatar.png",
  // agregá más archivos en /public/galeria
];

export default function GaleriaPage() {
  return (
    <main>
      <header className="border-b border-white/10 bg-white/[.03]">
        <div className="container-tbv py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">Galería de torneos</h1>
          <p className="text-white/70 mt-2">Momentos de ediciones anteriores.</p>
        </div>
      </header>

      <section className="container-tbv py-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <div key={src + i} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src={src}
                alt={`Foto torneo ${i + 1}`}
                width={900}
                height={700}
                className="w-full h-auto object-cover hover:scale-[1.02] transition"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
