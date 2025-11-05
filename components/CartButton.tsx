"use client";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";

export default function CartButton() {
  const { state } = useCart();
  const count = state.items.reduce((a,b) => a + b.qty, 0);
  return (
    <Link
      href="/carrito"
      aria-label="Ir al carrito"
      className="relative inline-flex items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10"
    >
      {/* ícono bolsa */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 7h12l-1 12H7L6 7Z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 7a3 3 0 1 1 6 0" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[var(--tbv-gold)] text-black text-xs font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
