const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <p className="text-xs tracked-ultra text-muted-foreground mb-4">
              THE ART OF SOFTNESS
            </p>
            <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-8 leading-snug">
              Where function meets sculptural design
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                STUDIO CLOUD is geboren uit een simpele observatie: waarom moeten 
                praktische tassen saai zijn? Onze collectie omarmt het 'puffy' 
                silhouet — zacht, volume-rijk, maar onmiskenbaar stijlvol.
              </p>
              <p>
                Elke tas wordt gemaakt met zachte, gewatteerde 'quilted' textuur, 
                ruime hoofdvakken voor laptop en dagelijkse benodigdheden, en de 
                verfijnde details die je verwacht van een premium merk.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-12 border-t border-border">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Materiaal</h4>
                <p className="text-sm text-muted-foreground">Premium quilted nylon</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Duurzaamheid</h4>
                <p className="text-sm text-muted-foreground">Ontworpen voor jaren</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Formaat</h4>
                <p className="text-sm text-muted-foreground">Past 15" laptop</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Kleuren</h4>
                <p className="text-sm text-muted-foreground">Stone, Black, Cream</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-secondary" />
            <div className="absolute bottom-6 right-6 bg-background px-6 py-4">
              <p className="text-xs tracked-wide text-muted-foreground">SINCE 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
