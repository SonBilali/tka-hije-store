import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#051F1A] text-[#D4AF37] py-16 mt-20 border-t border-[#1A3C34]">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">

                {/* Logoja në fund */}
                <Link href="/" className="mb-6 block relative">
                    <div className="relative w-32 h-10 md:w-40 md:h-12 mx-auto">
                        <Image
                            src="/logo.png" // Sigurohu për emrin
                            alt="T'KA HIJE Logo Footer"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Teksti i vogël poshtë logos */}
                <p className="text-xs uppercase tracking-[0.3em] opacity-70 mb-10">
                    Krijuar. 2026 • AL-DE
                </p>

                {/* Linqe shtesë (Opsionale) */}
                <div className="flex gap-8 mb-10 text-sm uppercase tracking-widest text-[#F2EFEB]">
                    <Link href="/product/shop" className="hover:text-[#D4AF37] transition">Dyqani</Link>
                    <Link href="#" className="hover:text-[#D4AF37] transition">Rreth Nesh</Link>
                    <Link href="#" className="hover:text-[#D4AF37] transition">Kontakt</Link>
                </div>

                {/* Copyright */}
                <div className="text-sm opacity-50 font-light">
                    © {new Date().getFullYear()} T&apos;KA HIJE. Të gjitha të drejtat e rezervuara.
                </div>
            </div>
        </footer>
    );
}