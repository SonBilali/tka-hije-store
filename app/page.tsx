import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryGrid from "../components/CategoryGrid";
import InstagramFeed from "../components/InstagramFeed";
import Footer from "../components/Footer";
import Brands from "../components/Brands";
import { client } from "@/sanity/lib/client"; // <--- Lidhja me Sanity

export const dynamic = "force-dynamic";
// Kjo e bën faqen të rifreskohet automatikisht kur shton produkte të reja (0 sekonda vonesë)
export const revalidate = 0;

// Funksioni që shkarkon produktet reale nga Sanity
async function getProducts() {
  // Query i përmirësuar: Merr çmimin dhe foton nga varianti i parë (variants[0])
  const query = `*[_type == "product"] | order(_createdAt desc) [0...8] {
    _id,
    name,
    brand,
    "price": variants[0].price,        // <-- Merr çmimin e variantit të parë
    "oldPrice": variants[0].oldPrice,  // <-- Merr çmimin e vjetër të variantit të parë
    "image": variants[0].images[0].asset->url, // <-- Merr foton e parë të variantit të parë
    isNew,
    category
  }`;

  const products = await client.fetch(query);
  return products;
}

export default async function Home() {
  // Marrim produktet reale
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-royal-cream pb-0">
      <Navbar />
      <Hero />
      <Brands />

      {/* Seksioni i Produkteve Reale */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10 border-b border-royal-gold/20 pb-4">
          <div>
            <span className="text-royal-gold text-xs font-bold tracking-[0.3em] uppercase">Ekskluzive</span>
            <h2 className="text-3xl font-serif text-royal-green mt-2">Të Përzgjedhura për Ju</h2>
          </div>
        </div>

        {/* Nëse nuk ka produkte, trego një mesazh */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Po ngarkohen produktet e reja...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product: any) => (
              <ProductCard
                key={product._id}
                id={product._id} // Përdorim ID-në reale nga Sanity
                brand={product.brand}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                // Nëse s'ke vënë foto, vendos një foto mbushëse automatikisht
                image={product.image || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"}
                isNew={product.isNew}
              />
            ))}
          </div>
        )}
      </section>

      <CategoryGrid />
      <InstagramFeed />
      <Footer />






















    </main>
  );
}