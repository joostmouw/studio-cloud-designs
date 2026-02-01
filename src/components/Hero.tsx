import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImageWebP from "@/assets/hero-tote.webp";
import heroImage from "@/assets/hero-tote.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={heroImageWebP} type="image/webp" />
          <img
            src={heroImage}
            alt="The Cloud Tote - Quilted puffy bag"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-xl">
          <p className="text-xs tracked-ultra text-muted-foreground mb-4 animate-fade-in">
            THE PUFFY TOTE COLLECTION
          </p>
          
          <h1 className="text-4xl lg:text-6xl font-light text-foreground leading-tight mb-6 animate-fade-in-delay">
            Experience the intersection of{" "}
            <span className="font-medium italic">volume</span> and{" "}
            <span className="font-medium italic">minimalism</span>
          </h1>
          
          <p className="text-base lg:text-lg text-muted-foreground mb-10 leading-relaxed animate-fade-in-delay-2">
            Gemaakt voor de moderne minimalist. Onze Cloud Tote collectie combineert 
            een gewatteerd silhouet met functionele ruimte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
            <Button variant="hero" asChild>
              <Link to="/product/hobo-bag-1">SHOP NOW</Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <a href="#about">OUR STORY</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-delay-2">
        <span className="text-[10px] tracked-ultra text-muted-foreground">SCROLL</span>
        <div className="w-px h-12 bg-foreground/20" />
      </div>
    </section>
  );
};

export default Hero;
