import ProductCard from "./ProductCard";
import toteStone from "@/assets/tote-stone.jpg";
import toteBlack from "@/assets/tote-black.jpg";
import toteCream from "@/assets/tote-cream.jpg";

const products = [
  {
    id: 1,
    name: "The Cloud Tote No. 1",
    price: "€34,95",
    image: toteCream,
    colors: ["#F5F0E8", "#A8A39D", "#1A1A1A"],
    isNew: true,
  },
  {
    id: 2,
    name: "The Cloud Tote — Stone",
    price: "€34,95",
    image: toteStone,
    colors: ["#A8A39D", "#F5F0E8", "#1A1A1A"],
    isNew: false,
  },
  {
    id: 3,
    name: "The Cloud Tote — Midnight",
    price: "€34,95",
    image: toteBlack,
    colors: ["#1A1A1A", "#A8A39D", "#F5F0E8"],
    isNew: false,
  },
];

const ProductSection = () => {
  return (
    <section id="collection" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracked-ultra text-muted-foreground mb-4">
            THE COLLECTION
          </p>
          <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-6">
            Daily Essentials, Reimagined
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Lichtgewicht, ruim en ontworpen om jarenlang gedragen te worden.
            Of je nu onderweg bent naar de studio of de stad verkent.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              colors={product.colors}
              isNew={product.isNew}
            />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <a 
            href="#" 
            className="inline-block text-xs tracked-wide text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            VIEW ALL PRODUCTS
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
