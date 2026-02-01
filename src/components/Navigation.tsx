import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="text-sm lg:text-base font-bold tracked-ultra text-foreground">
            S T U D I O &nbsp; C L O U D
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <a href="#collection" className="text-xs tracked-wide text-foreground underline-animation">
              COLLECTION
            </a>
            <a href="#about" className="text-xs tracked-wide text-foreground underline-animation">
              ABOUT
            </a>
            <a href="#contact" className="text-xs tracked-wide text-foreground underline-animation">
              CONTACT
            </a>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="relative text-foreground hover:opacity-60 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                0
              </span>
            </button>
            <button 
              className="lg:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-6">
            <a 
              href="#collection" 
              className="text-sm tracked-wide text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              COLLECTION
            </a>
            <a 
              href="#about" 
              className="text-sm tracked-wide text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <a 
              href="#contact" 
              className="text-sm tracked-wide text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
