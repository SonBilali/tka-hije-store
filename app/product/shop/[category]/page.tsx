import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

// Kjo pjesa këtu merr emrin e kategorisë nga URL (psh: femra)
export default function CategoryPage({ params }: { params: { category: string } }) {
    // E konvertojmë emrin: nga "femra" në "FEMRA"
    const categoryName = params.category.toUpperCase();
    // DecodeURI heq simbolet e çuditshme nëse ka (psh %20)
    const displayTitle = decodeURIComponent(categoryName);

    // Produkte shembull (Këtu mund t'i filtroni më vonë sipas kategorisë)
    const products = [
        { id: 1, brand: "Gucci", name: "Dionysus Small GG Bag", price: 2450.00, oldPrice: 2800.00, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", isNew: false },
        { id: 2, brand: "Burberry", name: "Heritage Trench Coat", price: 1890.00, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", isNew: true },
        { id: 3, brand: "Rolex", name: "Submariner Date 41mm", price: 14500.00, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop", isNew: false },
        { id: 4, brand: "Prada", name: "Monolith Loafers", price: 890.00, oldPrice: 1100.00, image: "https://images.unsplash.com/photo-1603123882772-9bd2c2196696?q=80&w=800&auto=format&fit=crop", isNew: false },
        { id: 5, brand: "Louis Vuitton", name: "Neverfull MM", price: 1500.00, image: "https://images.unsplash.com/photo-1590874102752-16b75c87a5fa?q=80&w=800&auto=format&fit=crop", isNew: true },
        { id: 6, brand: "Chanel", name: "Classic Flap Bag", price: 9500.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", isNew: false },
    ];

    return (
        <main className="min-h-screen bg-royal-cream">
            <Navbar />

            {/* Header Dinamik - Ndryshon sipas kategorisë */}
            <div className="bg-royal-green text-royal-cream py-12 text-center">
                <h1 className="font-serif text-4xl text-royal-gold mb-2">{displayTitle}</h1>
                <p className="text-sm tracking-widest uppercase opacity-70">Koleksioni i Ri / {displayTitle}</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">

                {/* SIDEBAR (Filtrat) */}
                <div className="w-full md:w-64 shrink-0 space-y-8">
                    <div className="flex items-center gap-2 font-bold text-royal-green border-b border-royal-gold/20 pb-4">
                        <SlidersHorizontal size={18} />
                        <span>FILTRA</span>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex justify-between cursor-pointer">
                            Kategoritë <ChevronDown size={14} />
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            {/* Këtu bëjmë që kategoria aktive të jetë me ngjyrë Gold */}
                            <li className={`cursor-pointer hover:text-royal-gold ${params.category === 'femra' ? 'text-royal-gold font-bold' : ''}`}>Femra</li>
                            <li className={`cursor-pointer hover:text-royal-gold ${params.category === 'meshkuj' ? 'text-royal-gold font-bold' : ''}`}>Meshkuj</li>
                            <li className={`cursor-pointer hover:text-royal-gold ${params.category === 'aksesore' ? 'text-royal-gold font-bold' : ''}`}>Aksesorë</li>
                        </ul>
                    </div>

                    {/* Pjesa tjetër e filtrave (Marka, Çmimi) është njëlloj... */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Marka</h3>
                        <div className="space-y-2">
                            {['Gucci', 'Prada', 'Burberry', 'Rolex'].map(brand => (
                                <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-royal-gold">
                                    <input type="checkbox" className="rounded border-gray-300 text-royal-green focus:ring-royal-gold" />
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PRODUKTET */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                brand={product.brand}
                                name={product.name}
                                price={product.price}
                                oldPrice={product.oldPrice}
                                image={product.image}
                                isNew={product.isNew}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    );
}