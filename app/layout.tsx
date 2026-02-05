import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext"; // <--- Importo 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "T'KA HIJE | Vishu si të ka Hije",
  description: "Dyqani zyrtar - Koleksioni i ri pranverë 2026. Veshje për femra, meshkuj dhe fëmijë.",
  metadataBase: new URL('https://tka-hije-store.vercel.app'), // Zëvendëso me linkun tënd të saktë nëse është ndryshe
  openGraph: {
    title: "T'KA HIJE | Vishu si të ka Hije",
    description: "Zbuloni elegancën e re. Krijuar 2026 • AL-DE",
    siteName: "T'KA HIJE",
    locale: 'sq_AL',
    type: 'website',
  },
};
<Navbar />
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body className={`${playfair.variable} ${lato.variable} bg-royal-cream text-gray-900`}>
        {/* Mbështjellja me Provider e bën shportën globale */}
        <CartProvider>
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}