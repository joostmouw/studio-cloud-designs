import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";

// Import Puffy Bag images
import puffyBagCream from "@/assets/puffy-bag-cream.avif";
import puffyBagBlack from "@/assets/puffy-bag-black.avif";
import puffyBagOlive from "@/assets/puffy-bag-olive.avif";

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

// Color palettes
const CLOUD_TOTE_COLORS = [
  { name: "Off White", value: "#F5F0E8" },
  { name: "Midnight Black", value: "#2A2A2A" },
  { name: "Moss Green", value: "#5C6B4A" },
];

const PUFFY_BAG_COLORS = [
  { name: "Cream", value: "#F5E6D3" },
  { name: "Black", value: "#1A1A1A" },
  { name: "Olive", value: "#6B7B5A" },
];

type Category = "all" | "totes" | "puffy";

const cloudToteProducts = [
  {
    id: "cloud-tote-white",
    name: "The Cloud Tote — Off White",
    price: "€34,95",
    image: weekendToteWhiteImages[0],
    images: weekendToteWhiteImages.slice(1),
    colors: CLOUD_TOTE_COLORS,
    isNew: true,
    category: "totes" as const,
  },
  {
    id: "cloud-tote-black",
    name: "The Cloud Tote — Midnight Black",
    price: "€34,95",
    image: weekendToteBlackImages[0],
    images: weekendToteBlackImages.slice(1),
    colors: CLOUD_TOTE_COLORS,
    isNew: false,
    category: "totes" as const,
  },
  {
    id: "cloud-tote-green",
    name: "The Cloud Tote — Moss Green",
    price: "€34,95",
    image: weekendToteGreenImages[0],
    images: weekendToteGreenImages.slice(1),
    colors: CLOUD_TOTE_COLORS,
    isNew: false,
    category: "totes" as const,
  },
];

const puffyBagProducts = [
  {
    id: "puffy-bag-cream",
    name: "The Puffy Bag — Cream",
    price: "€49,95",
    image: puffyBagCream,
    images: [],
    colors: PUFFY_BAG_COLORS,
    isNew: true,
    category: "puffy" as const,
  },
  {
    id: "puffy-bag-black",
    name: "The Puffy Bag — Black",
    price: "€49,95",
    image: puffyBagBlack,
    images: [],
    colors: PUFFY_BAG_COLORS,
    isNew: false,
    category: "puffy" as const,
  },
  {
    id: "puffy-bag-olive",
    name: "The Puffy Bag — Olive",
    price: "€49,95",
    image: puffyBagOlive,
    images: [],
    colors: PUFFY_BAG_COLORS,
    isNew: false,
    category: "puffy" as const,
  },
];

const allProducts = [...cloudToteProducts, ...puffyBagProducts];

const ProductSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProducts = activeCategory === "all" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "Alles" },
    { id: "totes", label: "Canvas Totes" },
    { id: "puffy", label: "Puffy Bags" },
  ];

  return (
    <section id="collection" className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
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

        {/* Category Tabs */}
        <div className="flex justify-center gap-8 mb-12 lg:mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-xs tracked-wide pb-2 transition-all border-b-2 ${
                activeCategory === category.id
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {category.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
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
