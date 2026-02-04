const brands = ["GUCCI", "PRADA", "BURBERRY", "TOM FORD", "LOUIS VUITTON", "CHANEL", "DIOR", "VERSACE"];

const Brands = () => {
    return (
        <section className="bg-royal-green py-12 border-y border-royal-gold/30">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-royal-gold text-xs uppercase tracking-[0.4em] mb-8 opacity-60">
                    Elite Brands
                </p>
                {/* Në një projekt real këto do ishin logo SVG, tani po përdorim tekst elegant */}
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 md:justify-between items-center text-royal-cream/60 font-serif text-xl md:text-2xl">
                    {brands.map((brand) => (
                        <span key={brand} className="hover:text-royal-gold transition cursor-pointer">
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Brands;