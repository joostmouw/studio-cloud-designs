import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount, isAuthenticated } = useStore();

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="text-sm lg:text-base font-bold tracked-ultra text-foreground">
            S T U D I O &nbsp; C L O U D
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <Link to="/product/hobo-bag-1" className="text-xs tracked-wide text-foreground underline-animation">
              SHOP
            </Link>
            <a href="/#collection" className="text-xs tracked-wide text-foreground underline-animation">
              COLLECTION
            </a>
            <a href="/#about" className="text-xs tracked-wide text-foreground underline-animation">
              ABOUT
            </a>
          </div>

          {/* Cart, Account & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Account */}
            <button
              onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
              className="hidden sm:flex text-foreground hover:opacity-60 transition-opacity"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative text-foreground hover:opacity-60 transition-opacity"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-background border-t border-border animate-slide-down"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link
              to="/product/hobo-bag-1"
              className="text-sm tracked-wide text-foreground hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOP
            </Link>
            <a
              href="/#collection"
              className="text-sm tracked-wide text-foreground hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              COLLECTION
            </a>
            <a
              href="/#about"
              className="text-sm tracked-wide text-foreground hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <hr className="border-border" />
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="text-sm tracked-wide text-foreground hover:opacity-60 transition-opacity flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} />
              {isAuthenticated ? 'ACCOUNT' : 'INLOGGEN'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
