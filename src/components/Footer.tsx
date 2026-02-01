const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracked-ultra mb-4">
              S T U D I O &nbsp; C L O U D
            </h3>
            <p className="text-sm text-background/60 max-w-sm leading-relaxed">
              The Art of Softness. Premium quilted totes designed for the modern 
              minimalist who refuses to compromise on style.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracked-wide mb-6 text-background/40">SHOP</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-background/80 hover:text-background transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/80 hover:text-background transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/80 hover:text-background transition-colors">
                  Best Sellers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracked-wide mb-6 text-background/40">CONTACT</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@studiocloud.store" className="text-sm text-background/80 hover:text-background transition-colors">
                  hello@studiocloud.store
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/80 hover:text-background transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/80 hover:text-background transition-colors">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © 2024 STUDIO CLOUD. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/40 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-background/40 hover:text-background transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
