"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
    // Përdorim emrin e saktë 'cartItems' që vjen nga Context
    const { cartItems, removeItem, totalPrice } = useCart();

    return (
        <main className="min-h-screen bg-royal-cream">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="font-serif text-4xl text-royal-green mb-10 text-center">Shporta Juaj</h1>

                {/* Kontrollojmë nëse shporta është bosh */}
                {cartItems.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-300 bg-white/50">
                        <p className="text-gray-500 mb-6 text-lg">Shporta juaj është bosh.</p>
                        <Link
                            href="/"
                            className="inline-block bg-royal-green text-royal-gold px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-900 transition"
                        >
                            Fillo Blerjet
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* KOLONA E MAJTË: Lista e Produkteve */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-6 bg-white p-6 border border-gray-100 items-center shadow-sm hover:shadow-md transition">
                                    {/* Foto e produktit */}
                                    <div className="w-24 h-32 bg-gray-100 relative shrink-0 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Detajet */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{item.brand}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="bg-gray-100 px-2 py-1 rounded">Masa: {item.size}</span>
                                        </div>
                                        <p className="font-bold text-royal-green text-xl mt-2">{item.price.toFixed(2)}€</p>
                                    </div>

                                    {/* Butoni Fshij */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-300 hover:text-red-600 p-2 transition"
                                        title="Hiqe nga shporta"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* KOLONA E DJATHTË: Totali dhe Butoni */}
                        <div className="bg-white p-8 h-fit border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="text-xl font-serif font-bold mb-6 text-royal-green border-b pb-4">Përmbledhja</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Nëntotali</span>
                                    <span className="font-bold">{totalPrice.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Dërgesa</span>
                                    <span className="text-royal-green font-bold">Falas</span>
                                </div>
                            </div>

                            <div className="border-t pt-6 flex justify-between text-2xl font-bold text-royal-green mb-8">
                                <span>Totali</span>
                                <span>{totalPrice.toFixed(2)}€</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full bg-royal-green text-royal-gold text-center py-4 font-bold uppercase tracking-widest hover:bg-gray-900 transition shadow-lg active:scale-95"
                            >
                                Vazhdo te Pagesa
                            </Link>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Pagesa e sigurtë me Kesh ose Kartë
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}