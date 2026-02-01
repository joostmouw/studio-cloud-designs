import { Truck, RotateCcw, Shield, Leaf } from "lucide-react";

const USPBanner = () => {
  const usps = [
    { icon: Truck, text: "Gratis verzending vanaf €50" },
    { icon: RotateCcw, text: "30 dagen gratis retour" },
    { icon: Shield, text: "2 jaar garantie" },
    { icon: Leaf, text: "Duurzaam geproduceerd" },
  ];

  return (
    <div className="bg-secondary/50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-center lg:justify-between py-2 overflow-x-auto gap-6 lg:gap-4">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap"
            >
              <usp.icon size={14} strokeWidth={1.5} />
              <span>{usp.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default USPBanner;
