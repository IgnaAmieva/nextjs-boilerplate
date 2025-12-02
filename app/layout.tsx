// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/src/context/CartContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  // 👇 Muy importante para que genere bien las URLs absolutas (OG, etc.)
  metadataBase: new URL("https://tunuyanbeachvoley.vercel.app"),

  title: "Tunuyán Beach Vóley",
  description:
    "Torneo de Beach Vóley · Horarios en vivo · Sponsors · Tienda oficial",

  // 👇 Favicon / icono de la pestaña
  icons: [
    { rel: "icon", url: "/logo-cuadrado.png" }, // usa tu logo cuadrado
  ],

  // 👇 Lo que ve WhatsApp / Facebook / etc. al compartir el link
  openGraph: {
    title: "Tunuyán Beach Vóley",
    description:
      "Toda la info del torneo, horarios en vivo, sponsors y tienda oficial.",
    url: "/",
    siteName: "Tunuyán Beach Vóley",
    images: [
      {
        url: "/logo-cuadrado.png", // tu logo cuadrado como imagen de preview
        width: 800,
        height: 800,
        alt: "Logo Tunuyán Beach Vóley",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // 👇 Para Twitter/X y otras redes
  twitter: {
    card: "summary_large_image",
    title: "Tunuyán Beach Vóley",
    description:
      "Torneo de Beach Vóley · Horarios en vivo · Sponsors · Tienda oficial.",
    images: ["/logo-cuadrado.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>

        <CartProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
