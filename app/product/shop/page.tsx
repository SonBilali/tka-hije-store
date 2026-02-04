import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ShopPage() {
    // Të dhëna fiktive, por më shumë produkte këtë herë
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

            {/* Header i vogël i faqes */}
            <div className="bg-royal-green text-royal-cream py-12 text-center">
                <h1 className="font-serif text-4xl text-royal-gold mb-2">Koleksioni Ekskluziv</h1>
                <p className="text-sm tracking-widest uppercase opacity-70">Femra / Veshje & Aksesorë</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">

                {/* SIDEBAR (Majtas - Filtrat) */}
                <div className="w-full md:w-64 shrink-0 space-y-8">
                    <div className="flex items-center gap-2 font-bold text-royal-green border-b border-royal-gold/20 pb-4">
                        <SlidersHorizontal size={18} />
                        <span>FILTRA</span>
                    </div>

                    {/* Filtër: Kategoritë */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex justify-between cursor-pointer">
                            Kategoritë <ChevronDown size={14} />
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="cursor-pointer hover:text-royal-gold font-bold text-royal-green">Të gjitha</li>
                            <li className="cursor-pointer hover:text-royal-gold">Çanta</li>
                            <li className="cursor-pointer hover:text-royal-gold">Këpucë</li>
                            <li className="cursor-pointer hover:text-royal-gold">Veshje</li>
                            <li className="cursor-pointer hover:text-royal-gold">Aksesorë</li>
                        </ul>
                    </div>

                    {/* Filtër: Marka */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex justify-between cursor-pointer">
                            Marka <ChevronDown size={14} />
                        </h3>
                        <div className="space-y-2">
                            {['Gucci', 'Prada', 'Burberry', 'Rolex', 'Chanel'].map(brand => (
                                <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-royal-gold">
                                    <input type="checkbox" className="rounded border-gray-300 text-royal-green focus:ring-royal-gold" />
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filtër: Çmimi */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Çmimi</h3>
                        <div className="flex gap-2 text-sm">
                            <input type="number" placeholder="Nga" className="w-20 p-2 border border-gray-300 rounded" />
                            <input type="number" placeholder="Deri" className="w-20 p-2 border border-gray-300 rounded" />
                        </div>
                    </div>
                </div>

                {/* PRODUKTET (Djathtas) */}
                <div className="flex-1">
                    {/* Renditja dhe Numri */}
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm text-gray-500">{products.length} Produkte</span>
                        <select className="border-none bg-transparent text-sm font-bold text-royal-green cursor-pointer focus:ring-0">
                            <option>Rendit sipas: Më të rejat</option>
                            <option>Çmimi: I ulët - I lartë</option>
                            <option>Çmimi: I lartë - I ulët</option>
                        </select>
                    </div>

                    {/* Rrjeti i produkteve */}
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

                    {/* Butoni "Shiko më shumë" */}
                    <div className="mt-16 text-center">
                        <button className="border-b border-royal-green pb-1 text-royal-green hover:text-royal-gold hover:border-royal-gold transition uppercase tracking-widest text-sm font-bold">
                            Ngarko më shumë
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    );
}