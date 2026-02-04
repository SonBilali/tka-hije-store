"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Truck, ShieldCheck } from "lucide-react";

export default function ProductDisplay({ product }: { product: any }) {
    const { addItem } = useCart();

    // Menaxhojmë cili variant (ngjyrë) është zgjedhur. Fillimisht i pari (0).
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    // Varianti aktual aktiv
    const activeVariant = product.variants && product.variants[selectedVariantIndex];

    // Nëse s'ka variante (për siguri), përdorim array bosh
    const images = activeVariant?.images || [];
    const sizes = activeVariant?.sizes || [];
    const price = activeVariant?.price || 0;
    const oldPrice = activeVariant?.oldPrice;

    // Foto kryesore (fillimisht e para e variantit)
    const [mainImage, setMainImage] = useState(images[0] || "");
    const [selectedSize, setSelectedSize] = useState("");

    // Kur ndryshon varianti, ndrysho foton kryesore dhe reseto masën
    const handleVariantChange = (index: number) => {
        setSelectedVariantIndex(index);
        const newVariantImages = product.variants[index].images || [];
        setMainImage(newVariantImages[0] || "");
        setSelectedSize(""); // Reseto masën kur ndërron ngjyrën
    };

    const handleAddToCart = () => {
        if (sizes.length > 0 && !selectedSize) {
            alert("Ju lutem zgjidhni masën!");
            return;
        }

        addItem({
            id: `${product._id}-${activeVariant.colorName}-${selectedSize}`, // ID unike për variantin
            name: `${product.name} (${activeVariant.colorName})`,
            price: price,
            image: mainImage,
            brand: product.brand,
            size: selectedSize || "Standard",
        });
        alert("U shtua në shportë!");
    };

    if (!activeVariant) return <div>Ky produkt nuk ka variante të konfiguruara.</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* MAJTAS: FOTOT */}
            <div className="space-y-4">
                <div className="aspect-[3/4] w-full bg-white overflow-hidden border border-gray-200 relative">
                    <img
                        src={mainImage || "https://via.placeholder.com/600"}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-500"
                    />
                </div>

                {/* Galeria e Vogël */}
                {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img: string, idx: number) => (
                            <div
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`aspect-square bg-white border cursor-pointer p-1 overflow-hidden ${mainImage === img ? 'border-royal-green' : 'border-transparent'}`}
                            >
                                <img src={img} className="w-full h-full object-cover hover:scale-110 transition" alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* DJATHTAS: DETAJET */}
            <div>
                <h2 className="text-royal-gold font-bold tracking-[0.2em] text-sm uppercase mb-2">{product.brand}</h2>
                <h1 className="text-4xl font-serif text-royal-green mb-4">{product.name}</h1>

                <div className="flex items-center gap-6 mb-8 border-b border-royal-gold/20 pb-8">
                    <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-bold text-gray-900">{price.toFixed(2)}€</span>
                        {oldPrice && (
                            <span className="text-lg text-gray-400 line-through decoration-royal-red">{oldPrice.toFixed(2)}€</span>
                        )}
                    </div>
                </div>

                {/* ZGJEDHJA E NGJYRËS (VARIANTIT) */}
                <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-3">
                        Ngjyra: <span className="text-royal-green">{activeVariant.colorName}</span>
                    </span>
                    <div className="flex gap-3">
                        {product.variants.map((variant: any, index: number) => (
                            <button
                                key={index}
                                onClick={() => handleVariantChange(index)}
                                className={`px-4 py-2 border text-sm font-bold transition
                            ${selectedVariantIndex === index
                                        ? "border-royal-green bg-royal-green text-white"
                                        : "border-gray-300 text-gray-600 hover:border-royal-green"}
                        `}
                            >
                                {variant.colorName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ZGJEDHJA E MASËS */}
                {sizes.length > 0 && (
                    <div className="mb-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-3">
                            Masa: {selectedSize}
                        </span>
                        <div className="flex flex-wrap gap-3">
                            {sizes.map((size: string) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`min-w-[3rem] h-12 px-2 border flex items-center justify-center text-sm font-bold transition
                                ${selectedSize === size
                                            ? "bg-royal-green text-white border-royal-green"
                                            : "border-gray-300 hover:border-royal-green text-gray-700"}
                            `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-8 prose prose-sm text-gray-600 font-light">
                    <p>{product.details}</p>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-royal-green text-royal-gold py-4 uppercase tracking-widest font-bold text-sm hover:bg-gray-900 transition shadow-xl active:scale-95 mb-10"
                >
                    Shto në Shportë
                </button>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 bg-white p-6 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <Truck size={20} className="text-royal-gold" />
                        <span>Dërgesë 2-3 ditë</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-royal-gold" />
                        <span>Garanci 100%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}