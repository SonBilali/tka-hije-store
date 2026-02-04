"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search, User, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems, removeItem, totalPrice } = useCart();

    return (
        <>
            <nav className="bg-royal-cream border-b border-royal-gold/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* 1. Mobile Menu Button */}
                    <button
                        className="md:hidden text-royal-green"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>

                    {/* 2. LOGO */}
                    <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-royal-green tracking-tighter">
                        T'KA HIJE
                    </Link>

                    {/* 3. Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-600">
                        <Link href="/" className="hover:text-royal-green transition">Ballina</Link>
                        <Link href="/shop/femra" className="hover:text-royal-green transition">Femra</Link>
                        <Link href="/shop/meshkuj" className="hover:text-royal-green transition">Meshkuj</Link>
                        <Link href="/shop/aksesore" className="hover:text-royal-green transition">Aksesorë</Link>
                    </div>

                    {/* 4. Icons (Search, User, Cart) */}
                    <div className="flex items-center gap-5 text-royal-green">
                        <Search className="cursor-pointer hover:text-royal-gold transition hidden sm:block" size={22} />
                        <User className="cursor-pointer hover:text-royal-gold transition hidden sm:block" size={22} />

                        {/* Cart Icon with Badge */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-royal-red text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU (Hapet kur je në celular) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-royal-cream border-t border-royal-gold/20 p-6 flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-gray-600">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Ballina</Link>
                        <Link href="/shop/femra" onClick={() => setIsMobileMenuOpen(false)}>Femra</Link>
                        <Link href="/shop/meshkuj" onClick={() => setIsMobileMenuOpen(false)}>Meshkuj</Link>
                        <Link href="/shop/aksesore" onClick={() => setIsMobileMenuOpen(false)}>Aksesorë</Link>
                    </div>
                )}
            </nav>

            {/* --- CART SIDEBAR (Shporta që hapet anash) --- */}

            {/* Sfondi i errët pas shportës */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* Vetë Shporta */}
            <div className={`fixed top-0 right-0 h-full w-[400px] max-w-[85vw] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header i Shportës */}
                <div className="p-6 border-b flex justify-between items-center bg-royal-green text-royal-gold">
                    <h2 className="text-xl font-serif font-bold">Shporta Juaj</h2>
                    <button onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Lista e Produkteve */}
                <div className="p-6 overflow-y-auto h-[calc(100vh-200px)]">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Shporta është bosh.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-royal-green font-bold underline"
                            >
                                Fillo Blerjet
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4">
                                    {/* Foto e vogël */}
                                    <div className="w-20 h-24 bg-gray-100 shrink-0 overflow-hidden relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Info Produkti */}
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                                        <p className="text-xs text-gray-500">Masa: {item.size}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-bold text-royal-green">{item.price}€</span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer i Shportës (Totali + Butoni Checkout) */}
                {cartItems.length > 0 && (
                    <div className="absolute bottom-0 left-0 w-full bg-white border-t p-6">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Totali:</span>
                            <span>{totalPrice.toFixed(2)}€</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full bg-royal-green text-royal-gold text-center py-4 font-bold uppercase tracking-widest hover:bg-gray-900 transition"
                        >
                            Vazhdo te Pagesa
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;