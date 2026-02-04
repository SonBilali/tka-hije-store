import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-royal-cream flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <CheckCircle className="text-royal-green w-20 h-20 mb-6" />
                <h1 className="text-4xl font-serif text-royal-green mb-4">Faleminderit!</h1>
                <p className="text-gray-600 mb-8 text-lg max-w-md">
                    Porosia juaj u regjistrua me sukses. <br />
                    Do t'ju kontaktojmë së shpejti për konfirmimin e dërgesës.
                </p>
                <Link
                    href="/"
                    className="bg-royal-green text-royal-gold px-10 py-4 uppercase tracking-widest font-bold text-sm hover:bg-gray-900 transition"
                >
                    Kthehu në Ballinë
                </Link>
            </div>
            <Footer />
        </div>
    );
}