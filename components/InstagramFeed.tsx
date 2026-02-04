import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';

const InstagramFeed = () => {
    return (
        <Link
            href="https://www.instagram.com/tkahije.de/"
            target="_blank"
            className="block bg-royal-green border-y border-royal-gold/30 group cursor-pointer"
        >
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

                {/* Ana e Majtë: Teksti dhe Ikona */}
                <div className="flex items-center gap-4">
                    <div className="bg-royal-gold/10 p-2 rounded-full text-royal-gold group-hover:bg-royal-gold group-hover:text-royal-green transition duration-300">
                        <Instagram size={20} />
                    </div>
                    <div>
                        <span className="block text-xs text-royal-gold/80 uppercase tracking-widest mb-1">Stay Connected</span>
                        <span className="block text-white font-serif text-lg tracking-wide group-hover:text-royal-gold transition">
                            @tkahije.de
                        </span>
                    </div>
                </div>

                {/* Ana e Djathtë: Shigjeta që lëviz */}
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                    <span className="hidden md:block opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Shiko Profilin
                    </span>
                    <ArrowRight className="text-royal-gold transform group-hover:translate-x-2 transition duration-300" size={20} />
                </div>

            </div>
        </Link>
    );
};

export default InstagramFeed;