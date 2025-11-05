"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/partidos", label: "Partidos" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/tienda", label: "Tienda" },
  { href: "/info", label: "Info útil" },
  { href: "/galeria", label: "Galería" },
];

export default function Navbar() {
  const path = usePathname();
  const [glass, setGlass] = useState(false);
  const [open, setOpen] = useState(false);

  // Cambia estilo al hacer scroll
  useEffect(() => {
    const onScroll = () => setGlass(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className={`navbar navbar-stick ${glass ? "navbar--glass" : ""}`} role="banner">
      <div className="container-tbv h-full flex items-center justify-between">
        {/* ===== Logo ===== */}
        <Link href="/" className="flex items-center gap-3" aria-label="Inicio">
          <Image src="/logo-tbv-avatar.png" alt="TBV" width={56} height={56} className="rounded-lg" priority />
          {/* Ocultar nombre en móvil, mostrar en md+ */}
          <span
            className="hidden md:inline text-lg md:text-xl font-extrabold tracking-wide"
            style={{ color: "var(--tbv-500)" }}
          >
            Tunuyán Beach Volley
          </span>
        </Link>

        {/* ===== Navegación de escritorio ===== */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Navegación principal">
          {links.map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-white/10" : "hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* ===== Botón hamburguesa (móvil) ===== */}
        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            // ícono de cierre (X)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // ícono de menú (☰)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ===== Menú desplegable móvil ===== */}
      {open && (
        <div
          className="md:hidden border-t border-white/10"
          style={{
            background: "#0c1116", // 🔹 color sólido oscuro
            boxShadow: "0 4px 20px rgba(0,0,0,.45)",
          }}
        >
          <nav
            className="container-tbv py-4 grid gap-1"
            aria-label="Navegación móvil"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-3 rounded-md text-[var(--foreground)] font-medium hover:bg-white/10 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
