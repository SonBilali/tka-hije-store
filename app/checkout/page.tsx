"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, CreditCard, Banknote, Tag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    // 1. Marrim të gjitha funksionet nga Context
    const {
        cartItems,
        totalPrice,
        removeItem,
        subtotal,
        discountAmount,
        applyCoupon,
        couponCode,
        removeCoupon
    } = useCart();

    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [isProcessing, setIsProcessing] = useState(false);

    // State për inputin e kuponit
    const [couponInput, setCouponInput] = useState("");

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Logjika e Kuponit
    const handleApplyCoupon = async () => {
        if (!couponInput.trim()) return;
        const result = await applyCoupon(couponInput);
        if (result.success) {
            alert(result.message);
            setCouponInput("");
        } else {
            alert(result.message);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            if (paymentMethod === 'cod') {
                router.push("/success");
            } else {
                alert("Sistemi i kartave do të aktivizohet së shpejti!");
                setIsProcessing(false);
            }
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-royal-cream flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-serif text-royal-green mb-4">Shporta juaj është bosh</h2>
                    <a href="/" className="bg-royal-green text-royal-gold px-8 py-3 text-sm font-bold uppercase tracking-widest">
                        Kthehu në Dyqan
                    </a>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-royal-cream">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-serif text-royal-green mb-10 text-center">Përfundo Porosinë</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* MAJTAS: Formularit */}
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Të dhënat personale */}
                        <div className="bg-white p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Adresa e Dërgesës</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input required name="firstName" placeholder="Emri" onChange={handleInputChange} className="border p-3 w-full focus:outline-none focus:border-royal-green" />
                                <input required name="lastName" placeholder="Mbiemri" onChange={handleInputChange} className="border p-3 w-full focus:outline-none focus:border-royal-green" />
                            </div>
                            <input required name="email" type="email" placeholder="Email" onChange={handleInputChange} className="border p-3 w-full mt-4 focus:outline-none focus:border-royal-green" />
                            <input required name="phone" type="tel" placeholder="Numri i Telefonit" onChange={handleInputChange} className="border p-3 w-full mt-4 focus:outline-none focus:border-royal-green" />
                            <input required name="address" placeholder="Adresa (Rruga, Pallati)" onChange={handleInputChange} className="border p-3 w-full mt-4 focus:outline-none focus:border-royal-green" />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <input required name="city" placeholder="Qyteti" onChange={handleInputChange} className="border p-3 w-full focus:outline-none focus:border-royal-green" />
                                <input required name="zip" placeholder="Kodi Postar" onChange={handleInputChange} className="border p-3 w-full focus:outline-none focus:border-royal-green" />
                            </div>
                        </div>

                        {/* 2. Mënyra e Pagesës */}
                        <div className="bg-white p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Mënyra e Pagesës</h2>
                            <div className="space-y-4">
                                <div onClick={() => setPaymentMethod('card')} className={`flex items-center gap-4 border p-4 cursor-pointer transition ${paymentMethod === 'card' ? 'border-royal-green bg-green-50' : 'border-gray-200'}`}>
                                    <CreditCard className={paymentMethod === 'card' ? 'text-royal-green' : 'text-gray-400'} />
                                    <div>
                                        <span className="block font-bold text-sm text-gray-800">Kartë Krediti / Debit</span>
                                        <span className="text-xs text-gray-500">Paguaj sigurtë me Stripe</span>
                                    </div>
                                </div>
                                <div onClick={() => setPaymentMethod('cod')} className={`flex items-center gap-4 border p-4 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-royal-green bg-green-50' : 'border-gray-200'}`}>
                                    <Banknote className={paymentMethod === 'cod' ? 'text-royal-green' : 'text-gray-400'} />
                                    <div>
                                        <span className="block font-bold text-sm text-gray-800">Pagesë në Dorëzim</span>
                                        <span className="text-xs text-gray-500">Paguaj cash kur të vijë pakoja</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button disabled={isProcessing} type="submit" className="w-full bg-royal-green text-royal-gold py-4 uppercase tracking-widest font-bold hover:bg-gray-900 transition duration-300 disabled:opacity-50">
                            {isProcessing ? "Po procesohet..." : `Paguaj ${totalPrice.toFixed(2)}€`}
                        </button>
                    </form>

                    {/* DJATHTAS: Përmbledhja */}
                    <div className="bg-gray-50 p-8 h-fit border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Përmbledhja</h3>

                        {/* Lista e Produkteve */}
                        <div className="space-y-6 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-white border">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-gray-500">Masa: {item.size}</p>
                                        <p className="text-sm font-bold text-royal-green">{item.price}€</p>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* KUPONI */}
                        <div className="mb-6 border-t border-b border-gray-200 py-6">
                            <div className="flex items-center gap-2 mb-3 text-gray-500">
                                <Tag size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Gift Card / Kod Zbritje</span>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value)}
                                    placeholder="Kodi"
                                    className="flex-1 border p-3 text-sm uppercase focus:outline-none focus:border-royal-green"
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="bg-gray-900 text-white px-6 text-xs font-bold uppercase hover:bg-royal-green transition"
                                >
                                    Apliko
                                </button>
                            </div>

                            {/* Mesazhi kur kodi është aktiv */}
                            {couponCode && (
                                <div className="mt-3 flex justify-between items-center bg-green-100 border border-green-200 p-3 rounded text-xs text-green-800 animate-fade-in">
                                    <span className="font-bold">Kodi "{couponCode}" është aktiv!</span>
                                    <button onClick={removeCoupon} className="text-red-600 underline font-bold hover:text-red-800">
                                        Hiqe
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* TOTALET */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nëntotali</span>
                                <span className="font-bold">{subtotal.toFixed(2)}€</span>
                            </div>

                            {discountAmount > 0 && (
                                <div className="flex justify-between text-royal-red font-bold">
                                    <span>Zbritje</span>
                                    <span>-{discountAmount.toFixed(2)}€</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-600">Dërgesa</span>
                                <span className="font-bold text-royal-green">Falas</span>
                            </div>

                            <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4 mt-4 text-royal-green">
                                <span>Totali</span>
                                <span>{totalPrice.toFixed(2)}€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}