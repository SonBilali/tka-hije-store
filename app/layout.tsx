import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext"; // <--- Importo Contextin

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
  title: "T'ka Hije | Luxury Fashion",
  description: "Veshje dhe aksesorë origjinalë.",
};

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
      </body>
    </html>
  );
}