import Navigation from "@/components/Navigation";
import USPBanner from "@/components/USPBanner";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import Product3DSection from "@/components/Product3DSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16 lg:pt-20">
        <USPBanner />
      </div>
      <Hero />
      <ProductSection />
      <Product3DSection />
      <AboutSection />
      <Footer />
      <NewsletterPopup />
    </div>
  );
};

export default Index;
