import { useLanguage } from "@/context/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <p className="text-xs tracked-ultra text-muted-foreground mb-4">
              {t('about.subtitle')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-8 leading-snug">
              {t('about.title')}
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                {t('about.text1')}
              </p>
              <p>
                {t('about.text2')}
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-12 border-t border-border">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">{t('about.material')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.material.value')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">{t('about.durability')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.durability.value')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">{t('about.size')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.size.value')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">{t('about.colors')}</h4>
                <p className="text-sm text-muted-foreground">{t('about.colors.value')}</p>
              </div>
            </div>
          </div>

          {/* Brand Badge */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="border-2 border-border px-12 py-8 text-center">
              <p className="text-xs tracked-ultra text-muted-foreground mb-2">{t('about.est')}</p>
              <p className="text-4xl font-light text-foreground">2024</p>
              <p className="text-xs tracked-wide text-muted-foreground mt-2">{t('about.brand')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
