"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Heart, User } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    // Nëse jemi në Studio (paneli i adminit), nuk e shfaqim këtë navbar
    if (pathname.startsWith("/studio")) return null;

    return (
        <header className="w-full bg-[#051F1A] text-[#D4AF37]">
            {/* Sfondi Jeshile e Errët (#051F1A) dhe Teksti Gold (#D4AF37) */}

            {/* RRJESHTI 1: Logoja, Kërkimi dhe Ikonat */}
            <div className="flex justify-between items-center px-4 md:px-8 py-5 border-b border-[#1A3C34]">

                {/* Majtas: Kërkimi */}
                <div className="flex items-center gap-3 cursor-pointer hover:text-white transition">
                    <Search className="w-5 h-5" />
                    <span className="text-xs font-medium tracking-widest uppercase hidden md:block">Kërko</span>
                </div>

                {/* Qendër: Logoja dhe Nëntitulli */}
                <div className="text-center flex flex-col items-center">
                    <Link href="/">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-[#D4AF37]">
                            T&apos;KA HIJE
                        </h1>
                    </Link>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]/80 mt-1">
                        Krijuar. 2026 • AL-DE
                    </span>
                </div>

                {/* Djathtas: Ikonat */}
                <div className="flex items-center gap-5">
                    <Heart className="w-5 h-5 cursor-pointer hover:text-white transition" />
                    <User className="w-5 h-5 cursor-pointer hover:text-white transition" />
                    <div className="relative cursor-pointer hover:text-white transition">
                        <Link href="/cart">
                            <ShoppingBag className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* RRJESHTI 2: Menytë Naviguese */}
            <div className="flex justify-center py-4">
                <nav>
                    <ul className="flex gap-6 md:gap-10 text-xs md:text-sm font-medium uppercase tracking-widest text-[#F2EFEB]">
                        <Link href="/product/shop/femra" className="hover:text-[#D4AF37] transition-colors">Femra</Link>
                        <Link href="/product/shop/meshkuj" className="hover:text-[#D4AF37] transition-colors">Meshkuj</Link>
                        <Link href="/product/shop/femije" className="hover:text-[#D4AF37] transition-colors">Fëmijë</Link>
                        <Link href="/product/shop/aksesore" className="hover:text-[#D4AF37] transition-colors">Aksesorë</Link>
                        <Link href="/product/shop/outlet" className="hover:text-[#D4AF37] transition-colors">Outlet</Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}