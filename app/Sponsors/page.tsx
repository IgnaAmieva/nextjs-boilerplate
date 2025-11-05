import Image from "next/image";

const SPONSORS = {
  gold:   [{ name:"Marca Gold", logo:"/sponsors/gold.png", url:"#"}],
  silver: [{ name:"Marca Silver", logo:"/sponsors/silver.png", url:"#"}],
  partner:[{ name:"Partner", logo:"/sponsors/partner.png", url:"#"}],
};

function Tier({title, items}:{title:string; items:{name:string;logo:string;url?:string}[]}) {
  return (
    <section className="container-tbv py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className={title==="Gold" ? "badge-gold" : "badge-info"}>{items.length} Patrocinadores</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(s => (
          <a key={s.name} href={s.url ?? "#"} className="card p-5 grid place-items-center hover:shadow-md">
            <Image src={s.logo} alt={s.name} width={180} height={90} className="object-contain opacity-80 hover:opacity-100 transition" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function SponsorsPage() {
  return (
    <main className="pb-10">
      <header className="bg-[--tbv-50] border-b border-[--tbv-100]">
        <div className="container-tbv py-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[--tbv-700]">Sponsors oficiales</h1>
          <p className="text-[--tbv-700]/70">Gracias por hacer posible el torneo.</p>
        </div>
      </header>
      <Tier title="Gold" items={SPONSORS.gold} />
      <Tier title="Silver" items={SPONSORS.silver} />
      <Tier title="Partners" items={SPONSORS.partner} />
    </main>
  );
}
