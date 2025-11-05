import Link from "next/link";

export default function Footer(){
  return (
    <footer className="border-t border-white/10 pt-10 pb-12" role="contentinfo">
      <div className="container-tbv grid md:grid-cols-3 gap-10 text-white/80">
        <div>
          <h4 className="font-bold text-white mb-2">Tunuyán Beach Volley</h4>
          <p className="text-sm">Copa Tunuyán · Torneo oficial</p>
        </div>

        <nav className="grid grid-cols-2 gap-2" aria-label="Enlaces del sitio">
          <Link href="/partidos" className="hover:underline">Partidos</Link>
          <Link href="/sponsors" className="hover:underline">Sponsors</Link>
          <Link href="/tienda" className="hover:underline">Tienda</Link>
          <Link href="/galeria" className="hover:underline">Galería</Link>
          <Link href="/info" className="hover:underline">Info útil</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
        </nav>

        <div className="text-sm md:text-right">
          © {new Date().getFullYear()} Tunuyán Beach Volleyball · Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
