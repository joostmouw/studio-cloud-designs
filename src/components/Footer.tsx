import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Facebook, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const { subscribeNewsletter, isNewsletterSubscribed } = useStore();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeNewsletter(email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl lg:text-2xl font-light mb-2">
                Blijf op de hoogte
              </h3>
              <p className="text-sm text-background/60">
                Ontvang 10% korting op je eerste bestelling en blijf op de hoogte van nieuwe collecties.
              </p>
            </div>
            <div>
              {isSubmitted || isNewsletterSubscribed ? (
                <p className="text-sm text-background/80">
                  ✓ Bedankt voor je aanmelding! Check je inbox voor je kortingscode.
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="jouw@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-background/50"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-background text-foreground hover:bg-background/90 border-0"
                  >
                    <ArrowRight size={18} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="text-sm font-bold tracked-ultra mb-4 block">
              S T U D I O &nbsp; C L O U D
            </Link>
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              Premium canvas tassen voor de moderne minimalist.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/studiocloud"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/studiocloud"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:hello@studiocloud.store"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracked-wide mb-4 text-background/40">SHOP</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/product/hobo-bag-1" className="text-sm text-background/80 hover:text-background transition-colors">
                  Alle Producten
                </Link>
              </li>
              <li>
                <Link to="/product/hobo-bag-1" className="text-sm text-background/80 hover:text-background transition-colors">
                  Nieuw Binnen
                </Link>
              </li>
              <li>
                <Link to="/product/hobo-bag-1" className="text-sm text-background/80 hover:text-background transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Klantenservice */}
          <div>
            <h4 className="text-xs tracked-wide mb-4 text-background/40">KLANTENSERVICE</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-sm text-background/80 hover:text-background transition-colors">
                  Veelgestelde vragen
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-background/80 hover:text-background transition-colors">
                  Verzending & Retour
                </Link>
              </li>
              <li>
                <a href="mailto:hello@studiocloud.store" className="text-sm text-background/80 hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs tracked-wide mb-4 text-background/40">ACCOUNT</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-sm text-background/80 hover:text-background transition-colors">
                  Inloggen
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-background/80 hover:text-background transition-colors">
                  Registreren
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-sm text-background/80 hover:text-background transition-colors">
                  Bestellingen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-background/10 px-3 py-1.5 rounded text-xs font-medium">iDEAL</div>
              <div className="bg-background/10 px-3 py-1.5 rounded text-xs font-medium">Visa</div>
              <div className="bg-background/10 px-3 py-1.5 rounded text-xs font-medium">Mastercard</div>
              <div className="bg-background/10 px-3 py-1.5 rounded text-xs font-medium">PayPal</div>
              <div className="bg-background/10 px-3 py-1.5 rounded text-xs font-medium">Klarna</div>
              <div className="bg-background/10 px-3 py-1.5 rounded text-xs font-medium">Bancontact</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-background/40">
              <span>🇳🇱</span>
              <span>Nederlands bedrijf</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Studio Cloud. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6 text-xs text-background/40">
            <span>Privacy Policy</span>
            <span>Algemene Voorwaarden</span>
            <Link to="/cookies" className="text-xs text-background/40 hover:text-background transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
