import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";

// Weekend Tote images in different colors (only existing files)
const weekendToteWhiteImages = [
  "/products/weekend-tote/1-white.jpg",
  "/products/weekend-tote/2-white.jpg",
  "/products/weekend-tote/3-white.jpg",
  "/products/weekend-tote/6-white.jpg",
  "/products/weekend-tote/7-white.jpg",
];

const weekendToteBlackImages = [
  "/products/weekend-tote/1-black.jpg",
];

const weekendToteGreenImages = [
  "/products/weekend-tote/1-green.jpg",
];

// Color palette for Weekend Tote with proper names
const WEEKEND_TOTE_COLORS = [
  { name: "Off White", value: "#F5F0E8" },
  { name: "Midnight Black", value: "#2A2A2A" },
  { name: "Moss Green", value: "#5C6B4A" },
];

const products = [
  {
    id: "hobo-bag-1",
    name: "The Cloud Tote — Off White",
    price: "€34,95",
    image: weekendToteWhiteImages[0],
    images: weekendToteWhiteImages.slice(1),
    colors: WEEKEND_TOTE_COLORS,
    isNew: true,
  },
  {
    id: "hobo-bag-1",
    name: "The Cloud Tote — Midnight Black",
    price: "€34,95",
    image: weekendToteBlackImages[0],
    images: weekendToteBlackImages.slice(1),
    colors: WEEKEND_TOTE_COLORS,
    isNew: false,
  },
  {
    id: "hobo-bag-1",
    name: "The Cloud Tote — Moss Green",
    price: "€34,95",
    image: weekendToteGreenImages[0],
    images: weekendToteGreenImages.slice(1),
    colors: WEEKEND_TOTE_COLORS,
    isNew: false,
  },
];

const ProductSection = () => {
  const { t } = useLanguage();

  return (
    <section id="collection" className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracked-ultra text-muted-foreground mb-4">
            THE COLLECTION
          </p>
          <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-6">
            Daily Essentials, Reimagined
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t('product.collection.desc')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              images={product.images}
              colors={product.colors}
              isNew={product.isNew}
            />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <a
            href="/#collection"
            className="inline-block text-xs tracked-wide text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            ALLE PRODUCTEN BEKIJKEN
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
