import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDisplay from "@/components/ProductDisplay";

export const revalidate = 0;

export default async function ProductPage({ params }: { params: { id: string } }) {
    // Query i ri që merr Variantet
    const query = `*[_type == "product" && _id == "${params.id}"][0] {
    _id,
    name,
    brand,
    details,
    category,
    variants[]{
      colorName,
      price,
      oldPrice,
      sizes,
      "images": images[].asset->url
    }
  }`;

    const product = await client.fetch(query);

    if (!product) {
        return <div className="text-center py-20">Produkti nuk u gjet.</div>;
    }

    return (
        <main className="min-h-screen bg-royal-cream">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">
                    Kreu / {product.category} / <span className="text-royal-green font-bold">{product.name}</span>
                </div>
                <ProductDisplay product={product} />
            </div>
            <Footer />
        </main>
    );
}