import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import heroImageWebP from "@/assets/hero-tote.webp";
import heroImage from "@/assets/hero-tote.jpg";

const Hero = () => {
  const { t, currentLanguage } = useLanguage();

  const renderTitle = () => {
    const titleParts = {
      en: <>Experience the intersection of{" "}<span className="font-medium italic">volume</span> and{" "}<span className="font-medium italic">minimalism</span></>,
      nl: <>Ervaar de kruising van{" "}<span className="font-medium italic">volume</span> en{" "}<span className="font-medium italic">minimalisme</span></>,
      da: <>Oplev krydsningen af{" "}<span className="font-medium italic">volumen</span> og{" "}<span className="font-medium italic">minimalisme</span></>
    };
    return titleParts[currentLanguage as keyof typeof titleParts] || titleParts.en;
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={heroImageWebP} type="image/webp" />
          <img
            src={heroImage}
            alt="STUDIO CLOUD - Premium Canvas Tote Bag"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-xl">
          <p className="text-xs tracked-ultra text-muted-foreground mb-4 animate-fade-in">
            {t('hero.subtitle')}
          </p>

          <h1 className="text-4xl lg:text-6xl font-light text-foreground leading-tight mb-6 animate-fade-in-delay">
            {renderTitle()}
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground mb-10 leading-relaxed animate-fade-in-delay-2">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
            <Button variant="hero" asChild>
              <Link to="/product/hobo-bag-1">{t('hero.cta.shop')}</Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <a href="#about">{t('hero.cta.story')}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-delay-2">
        <span className="text-[10px] tracked-ultra text-muted-foreground">{t('hero.scroll')}</span>
        <div className="w-px h-12 bg-foreground/20" />
      </div>
    </section>
  );
};

export default Hero;
