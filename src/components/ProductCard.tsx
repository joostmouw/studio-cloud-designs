import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  name: string;
  price: string;
  image: string;
  imageWebP?: string;
  colors: string[];
  isNew?: boolean;
}

const ProductCard = ({ id = "hobo-bag-1", name, price, image, imageWebP, colors, isNew }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/product/${id}`}
      className="group cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary overflow-hidden mb-4">
        {isNew && (
          <span className="absolute top-4 left-4 z-10 text-[10px] tracked-wide bg-foreground text-background px-3 py-1">
            NEW
          </span>
        )}
        {/* Placeholder skeleton while loading */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-pulse" />
        )}
        {/* Picture element for WebP with JPG fallback */}
        <picture>
          {imageWebP && <source srcSet={imageWebP} type="image/webp" />}
          <img
            src={image}
            alt={name}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </picture>
        
        {/* View Product Overlay */}
        <div
          className={`absolute inset-0 bg-foreground/5 flex items-end justify-center pb-6 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="bg-background text-foreground text-xs tracked-wide px-6 py-3 hover:bg-foreground hover:text-background transition-colors">
            BEKIJK PRODUCT
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">{name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{price}</p>

        {/* Color Swatches */}
        <div className="flex gap-2 pt-1">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-3 sm:w-4 h-3 sm:h-4 border border-border cursor-pointer hover:scale-110 transition-transform rounded-sm"
              style={{ backgroundColor: color }}
              title={color}
              role="button"
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
