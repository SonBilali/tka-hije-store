"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { client } from "@/sanity/lib/client"; // Na duhet për të kontrolluar kodin

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    size: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;

    // Pjesa e re për Kuponat
    totalPrice: number;        // Çmimi final (me zbritje)
    subtotal: number;          // Çmimi pa zbritje
    discountAmount: number;    // Sa euro u ulën
    couponCode: string | null; // Kodi që u përdor
    applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
    removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // State për zbritjen
    const [discount, setDiscount] = useState<{ type: 'percentage' | 'fixed'; value: number } | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);

    // Load cart from LocalStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                try { setCartItems(JSON.parse(savedCart)); } catch (e) { }
            }
        }
    }, []);

    // Save cart to LocalStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addItem = (newItem: CartItem) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === newItem.id);
            if (existing) return prev;
            return [...prev, newItem];
        });
    };

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Funksioni që kontrollon kodin në Sanity
    const applyCoupon = async (code: string) => {
        try {
            // Kërkojmë në database nëse ekziston ky kod dhe është aktiv
            const query = `*[_type == "coupon" && code == "${code.toUpperCase()}" && isActive == true][0]`;
            const coupon = await client.fetch(query);

            if (coupon) {
                setDiscount({ type: coupon.discountType, value: coupon.value });
                setCouponCode(code.toUpperCase());
                return { success: true, message: `Kodi ${code} u aplikua!` };
            } else {
                return { success: false, message: "Kodi është i pavlefshëm ose ka skaduar." };
            }
        } catch (error) {
            return { success: false, message: "Gabim në verifikim." };
        }
    };

    const removeCoupon = () => {
        setDiscount(null);
        setCouponCode(null);
    };

    // --- MATEMATIKA E ÇMIMEVE ---
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

    let discountAmount = 0;
    if (discount) {
        if (discount.type === 'percentage') {
            discountAmount = (subtotal * discount.value) / 100;
        } else {
            discountAmount = discount.value; // Vlerë fikse (psh 50€)
        }
    }

    // Sigurohemi që totali s'bëhet negativ
    const totalPrice = Math.max(0, subtotal - discountAmount);

    return (
        <CartContext.Provider value={{
            cartItems, addItem, removeItem,
            totalPrice, subtotal, discountAmount, couponCode, // Të rejat
            applyCoupon, removeCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}