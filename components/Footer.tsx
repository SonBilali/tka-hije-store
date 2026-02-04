import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-royal-green text-royal-cream border-t-4 border-royal-gold pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="font-serif text-2xl text-royal-gold font-bold mb-6">T'KA HIJE</h2>
                <p className="text-sm text-gray-400 mb-6">Destinacioni juaj përfundimtar për modën.</p>
                <div className="border-t border-white/10 pt-8 mt-8">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 T'ka Hije.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;