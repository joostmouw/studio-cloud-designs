import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  colors: string[];
  isNew?: boolean;
}

const ProductCard = ({ name, price, image, colors, isNew }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
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
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        
        {/* Quick Add Overlay */}
        <div 
          className={`absolute inset-0 bg-foreground/5 flex items-end justify-center pb-6 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="bg-background text-foreground text-xs tracked-wide px-6 py-3 hover:bg-foreground hover:text-background transition-colors">
            QUICK ADD
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{price}</p>
        
        {/* Color Swatches */}
        <div className="flex gap-2 pt-1">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="w-4 h-4 border border-border cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
