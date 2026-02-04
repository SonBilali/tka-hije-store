import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

// Rifreskim i menjëhershëm
export const revalidate = 0;

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const categoryParam = params.category.toLowerCase(); // psh: "femra"

    // Query për të marrë produktet e kësaj kategorie
    // Kujdes: Në Sanity fusha 'category' duhet të jetë 'femra', 'meshkuj', etj.
    // Brenda CategoryPage...

    const query = `*[_type == "product" && category == "${categoryParam}"] | order(_createdAt desc) {
    _id,
    name,
    brand,
    "price": variants[0].price,       // <-- Ndryshimi këtu
    "oldPrice": variants[0].oldPrice, // <-- Ndryshimi këtu
    "image": variants[0].images[0].asset->url, // <-- Ndryshimi këtu
    isNew,
    category
  }`;

    const products = await client.fetch(query);
    const displayTitle = decodeURIComponent(categoryParam).toUpperCase();

    return (
        <main className="min-h-screen bg-royal-cream">
            <Navbar />

            {/* Header i Kategorisë */}
            <div className="bg-royal-green text-royal-cream py-12 text-center">
                <h1 className="font-serif text-4xl text-royal-gold mb-2">{displayTitle}</h1>
                <p className="text-sm tracking-widest uppercase opacity-70">Koleksioni i Ri / {displayTitle}</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">

                {/* SIDEBAR (Filtrat Vizualë - Për momentin statikë, por vizualisht të bukur) */}
                <div className="w-full md:w-64 shrink-0 space-y-8 hidden md:block">
                    <div className="flex items-center gap-2 font-bold text-royal-green border-b border-royal-gold/20 pb-4">
                        <SlidersHorizontal size={18} />
                        <span>FILTRA</span>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Kategoritë</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className={categoryParam === 'femra' ? 'text-royal-gold font-bold' : ''}>Femra</li>
                            <li className={categoryParam === 'meshkuj' ? 'text-royal-gold font-bold' : ''}>Meshkuj</li>
                            <li className={categoryParam === 'aksesore' ? 'text-royal-gold font-bold' : ''}>Aksesorë</li>
                        </ul>
                    </div>
                </div>

                {/* PRODUKTET */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm text-gray-500">{products.length} Produkte</span>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">Nuk u gjetën produkte në kategorinë "{displayTitle}".</p>
                            <p className="text-sm text-gray-400 mt-2">Kontrolloni së shpejti për koleksionin e ri.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {products.map((product: any) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    brand={product.brand}
                                    name={product.name}
                                    price={product.price}
                                    oldPrice={product.oldPrice}
                                    image={product.image || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"}
                                    isNew={product.isNew}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </main>
    );
}