import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Truck, RotateCcw, Clock, MapPin, Package, CheckCircle2 } from 'lucide-react';

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">
              Verzending & Retour
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We willen dat je 100% tevreden bent met je aankoop. Lees hieronder alles over onze verzend- en retourmogelijkheden.
            </p>
          </div>

          {/* Shipping Options */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Truck size={24} />
              Verzendopties
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Standaard</h3>
                  <span className="text-lg font-medium">€4,95</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Bezorging via PostNL
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-muted-foreground" />
                  <span>2-3 werkdagen</span>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6 relative">
                <span className="absolute -top-2 right-4 bg-foreground text-background text-xs px-2 py-0.5 rounded">
                  Populair
                </span>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Express</h3>
                  <span className="text-lg font-medium">€7,95</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Volgende werkdag bezorgd
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-muted-foreground" />
                  <span>1 werkdag</span>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Afhaalpunt</h3>
                  <span className="text-lg font-medium">€3,95</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Ophalen bij PostNL punt
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-muted-foreground" />
                  <span>2-3 werkdagen</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-foreground/10 border border-green-200 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Gratis verzending</strong> bij bestellingen vanaf €50
              </p>
            </div>
          </section>

          {/* Delivery Info */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <MapPin size={24} />
              Bezorging
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <CheckCircle2 size={20} className="text-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Track & Trace</p>
                  <p className="text-sm text-muted-foreground">
                    Na verzending ontvang je een e-mail met trackingcode waarmee je je pakket kunt volgen.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={20} className="text-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Flexibele bezorging</p>
                  <p className="text-sm text-muted-foreground">
                    Via de PostNL app kun je de bezorging aanpassen naar een ander moment of adres.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={20} className="text-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Verzendgebied</p>
                  <p className="text-sm text-muted-foreground">
                    We verzenden naar Nederland en België. Uitbreiding naar andere landen volgt binnenkort.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <RotateCcw size={24} />
              Retourneren
            </h2>

            <div className="bg-secondary/30 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-light mb-1">30</p>
                  <p className="text-sm text-muted-foreground">dagen bedenktijd</p>
                </div>
                <div>
                  <p className="text-3xl font-light mb-1">Gratis</p>
                  <p className="text-sm text-muted-foreground">retourneren</p>
                </div>
                <div>
                  <p className="text-3xl font-light mb-1">5-7</p>
                  <p className="text-sm text-muted-foreground">dagen terugbetaling</p>
                </div>
              </div>
            </div>

            <h3 className="font-medium mb-4">Zo werkt het</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium">Meld je retour aan</p>
                  <p className="text-sm text-muted-foreground">
                    Log in op je account en ga naar je bestellingen. Selecteer de items die je wilt retourneren.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium">Print het retourlabel</p>
                  <p className="text-sm text-muted-foreground">
                    Je ontvangt direct een gratis retourlabel per e-mail. Print deze uit en plak hem op je pakket.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium">Verstuur je pakket</p>
                  <p className="text-sm text-muted-foreground">
                    Breng je pakket naar een PostNL punt. Bewaar je verzendbewijs tot je terugbetaling binnen is.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-medium">Ontvang je geld terug</p>
                  <p className="text-sm text-muted-foreground">
                    Na ontvangst en controle van je retour storten we het bedrag binnen 5-7 werkdagen terug.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Conditions */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Package size={24} />
              Voorwaarden
            </h2>

            <div className="border border-border rounded-lg divide-y">
              <div className="p-4">
                <p className="font-medium mb-1">Staat van het product</p>
                <p className="text-sm text-muted-foreground">
                  Het product moet ongebruikt zijn, met alle labels en in de originele verpakking.
                </p>
              </div>
              <div className="p-4">
                <p className="font-medium mb-1">Termijn</p>
                <p className="text-sm text-muted-foreground">
                  Je hebt 30 dagen na ontvangst om je aankoop te retourneren.
                </p>
              </div>
              <div className="p-4">
                <p className="font-medium mb-1">Beschadigde producten</p>
                <p className="text-sm text-muted-foreground">
                  Ontvang je een beschadigd product? Neem direct contact met ons op, dan lossen we het op.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="p-6 bg-secondary/30 rounded-lg text-center">
            <h3 className="font-medium mb-2">Hulp nodig?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ons klantenserviceteam helpt je graag verder
            </p>
            <a
              href="mailto:hello@studiocloud.store"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              hello@studiocloud.store
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPage;
