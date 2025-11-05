import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/src/context/CartContext";

export const metadata: Metadata = {
  title: "Tunuyán Beach Volleyball",
  description: "Torneo de Beach Vóley · Horarios en vivo · Sponsors · Tienda oficial",
  icons: [{ rel: "icon", url: "/logo-tbv-avatar.png" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>

        {/* 🛒 Carrito global envuelve toda la app */}
        <CartProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
