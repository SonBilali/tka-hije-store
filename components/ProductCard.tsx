import Link from 'next/link'; // <--- Importuam Link
import { Heart } from 'lucide-react';

interface ProductProps {
    id: number | string; // <--- Shtuar ID
    image: string;
    brand: string;
    name: string;
    price: number;
    oldPrice?: number;
    isNew?: boolean;
}

const ProductCard = ({ id, image, brand, name, price, oldPrice, isNew }: ProductProps) => {
    return (
        <Link href={`/product/${id}`}> {/* <--- Kjo e bën gjithë kartën të klikueshme */}
            <div className="group cursor-pointer relative">
                {/* Korniza e fotos */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 border border-transparent group-hover:border-royal-gold/30 transition-all duration-300">

                    {/* Etiketa NEW ose SALE */}
                    {isNew && (
                        <span className="absolute top-2 left-2 bg-royal-green text-royal-gold text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                            E Re
                        </span>
                    )}
                    {oldPrice && !isNew && (
                        <span className="absolute top-2 left-2 bg-royal-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                            -30%
                        </span>
                    )}

                    {/* Butoni Zemër (Duhet kujdes që klikimi te zemra mos të hapë produktin, por për thjeshtësi po e lëmë vizual) */}
                    <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-royal-red z-10">
                        <Heart size={18} />
                    </button>

                    <img
                        src={image}
                        alt={name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-royal-green/90 text-royal-gold text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 uppercase text-xs tracking-widest font-bold z-20">
                        Shto në Shportë
                    </div>
                </div>

                <div className="text-left">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">{brand}</p>
                    <h3 className="text-sm text-gray-900 font-serif mb-2 truncate">{name}</h3>

                    <div className="flex items-baseline gap-3">
                        <span className="text-royal-green font-bold text-base">
                            {/* Sigurohemi që price ekziston, nëse jo shfaqim 0 */}
                            {(price || 0).toFixed(2)}€
                        </span>
                        {oldPrice && (
                            <span className="text-gray-400 text-xs line-through decoration-royal-red">
                                {oldPrice.toFixed(2)}€
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;