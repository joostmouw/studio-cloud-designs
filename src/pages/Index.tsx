import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import Product3DSection from "@/components/Product3DSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProductSection />
      <Product3DSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
