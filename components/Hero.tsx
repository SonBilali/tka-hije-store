import Link from 'next/link';

const Hero = () => {
    return (
        <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-royal-cream">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-royal-cream via-[#e0e0d8] to-[#dcdccf] z-0"></div>
            <div className="absolute inset-4 md:inset-8 border border-royal-gold/40 z-10 pointer-events-none"></div>
            <div className="absolute inset-6 md:inset-10 border border-royal-gold/20 z-10 pointer-events-none"></div>

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <span className="text-royal-gold tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-4 block">
                </span>
                <h2 className="font-serif text-5xl md:text-8xl text-royal-green mb-6 leading-tight">
                    Vishu si të ka <br /> <span className="italic text-royal-gold">Hije</span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                    <Link href="/shop" className="bg-royal-green text-royal-gold px-10 py-4 uppercase tracking-widest text-sm shadow-xl">
                        Bli Tani
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;