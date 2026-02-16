import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        name: 'FEMRA',
        slogan: 'Elegancë',
        // Foto stili Dua Lipa / Versace
        image: 'https://www.hawtcelebs.com/wp-content/uploads/2025/02/dua-lipa-for-puma-speedcat-campaign-3.jpg',
        link: '/shop/femra',
        align: 'left' // Teksti në të majtë
    },
    {
        name: 'MESHKUJ',
        slogan: 'Urban Luxury & Streetwear',
        // Foto stili Reper Gjerman / Luciano
        image: 'https://essentialjournal.co.uk/wp-content/uploads/2023/06/GU774_LUGGAGE-RG_DPS_PR-CROPS_150dpi_5-scaled.jpg',
        link: '/shop/meshkuj',
        align: 'right' // Teksti në të djathtë
    },
    {
        name: 'AKSESORË',
        slogan: 'Detajet bëjnë diferencën',
        // Foto stili Tom Ford / Parfum
        image: 'https://th.bing.com/th/id/R.3bed1d965b4711475b1c8790c8361a55?rik=TRzVC6tzNVZGQg&riu=http%3a%2f%2fwafadutyfree.com%2fcdn%2fshop%2farticles%2f60537547-f06f-441b-99a5-44f3133b17c3_d-stories-beauty-niche-fragrances-hero.jpg%3fv%3d1712971396&ehk=gtLSWug99m1Ts3IZdnqwXVokKjX%2bH%2frcTJA8f%2fnuOXI%3d&risl=&pid=ImgRaw&r=0',
        link: '/shop/aksesore',
        align: 'left' // Teksti në të majtë
    }
];

const CategoryGrid = () => {
    return (
        <section className="w-full">
            <div className="text-center py-16 bg-royal-cream">
                <span className="text-royal-gold text-xs font-bold tracking-[0.4em] uppercase">Koleksionet 2026</span>
                <h2 className="text-3xl md:text-4xl font-serif text-royal-green mt-3">Zbuloni botën tonë të modës.</h2>
            </div>

            <div className="flex flex-col">
                {categories.map((cat, index) => (
                    <Link
                        key={cat.name}
                        href={cat.link}
                        className="group relative h-[75vh] w-full overflow-hidden block cursor-pointer border-b border-royal-cream/10"
                    >
                        {/* Sfondi i Fotos - Lëviz pak kur bën Hover */}
                        <div className="absolute inset-0">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                            />
                            {/* Hije e lehtë sipër fotos që të lexohet shkrimi */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-700"></div>
                        </div>

                        {/* Përmbajtja (Teksti) */}
                        <div className={`absolute inset-0 flex items-center px-8 md:px-24 
                ${cat.align === 'left' ? 'justify-start' : 'justify-end text-right'}
            `}>
                            <div className="max-w-xl text-white transform translate-y-8 group-hover:translate-y-0 transition duration-700 opacity-90 group-hover:opacity-100">
                                <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-royal-gold mb-4">
                                    {cat.slogan}
                                </p>
                                <h3 className="text-5xl md:text-7xl font-serif mb-8 drop-shadow-xl">
                                    {cat.name}
                                </h3>

                                <span className={`inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-bold uppercase tracking-widest hover:text-royal-gold hover:border-royal-gold transition
                        ${cat.align === 'right' ? 'flex-row-reverse' : ''}
                    `}>
                                    Zbulo Koleksionin <ArrowRight size={18} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
