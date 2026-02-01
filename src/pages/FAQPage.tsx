import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqCategories = [
    {
      title: "Bestellen",
      questions: [
        {
          q: "Hoe plaats ik een bestelling?",
          a: "Selecteer het gewenste product, kies je kleur en voeg het toe aan je winkelwagen. Ga naar de checkout, vul je gegevens in en kies een betaalmethode. Na betaling ontvang je een bevestigingsmail."
        },
        {
          q: "Kan ik mijn bestelling wijzigen of annuleren?",
          a: "Neem zo snel mogelijk contact met ons op via hello@studiocloud.store. Als je bestelling nog niet is verzonden, kunnen we deze aanpassen of annuleren."
        },
        {
          q: "Welke betaalmethodes accepteren jullie?",
          a: "We accepteren iDEAL, Visa, Mastercard, PayPal, Klarna en Bancontact. Alle betalingen worden veilig verwerkt via onze betalingsprovider."
        },
      ]
    },
    {
      title: "Verzending",
      questions: [
        {
          q: "Wat zijn de verzendkosten?",
          a: "Standaard verzending kost €4,95. Express verzending (volgende werkdag) kost €7,95. Bij bestellingen vanaf €50 is de standaard verzending gratis."
        },
        {
          q: "Hoe lang duurt de levering?",
          a: "Standaard verzending duurt 2-3 werkdagen. Express verzending wordt de volgende werkdag geleverd (bij bestelling vóór 16:00)."
        },
        {
          q: "Kan ik mijn pakket volgen?",
          a: "Ja, zodra je bestelling is verzonden ontvang je een e-mail met een track & trace code waarmee je je pakket kunt volgen."
        },
        {
          q: "Leveren jullie ook buiten Nederland?",
          a: "Op dit moment leveren we alleen binnen Nederland en België. We werken aan uitbreiding naar andere landen."
        },
      ]
    },
    {
      title: "Retourneren",
      questions: [
        {
          q: "Wat is het retourbeleid?",
          a: "Je kunt je aankoop binnen 30 dagen na ontvangst retourneren. Het product moet ongebruikt zijn en in de originele verpakking. Retourneren is gratis."
        },
        {
          q: "Hoe retourneer ik een product?",
          a: "Log in op je account en ga naar je bestellingen. Selecteer de bestelling die je wilt retourneren en volg de instructies. Je ontvangt een retourlabel per e-mail."
        },
        {
          q: "Wanneer krijg ik mijn geld terug?",
          a: "Na ontvangst en goedkeuring van je retour wordt het bedrag binnen 5-7 werkdagen teruggestort op je rekening."
        },
      ]
    },
    {
      title: "Product",
      questions: [
        {
          q: "Van welk materiaal zijn de tassen gemaakt?",
          a: "Onze tassen zijn gemaakt van premium gewassen canvas. Dit materiaal is duurzaam, lichtgewicht en wordt mooier naarmate je het langer gebruikt."
        },
        {
          q: "Hoe onderhoud ik mijn tas?",
          a: "Reinig je tas met een vochtige doek. Bij hardnekkige vlekken kun je een mild zeepsopje gebruiken. Laat de tas aan de lucht drogen, niet in de droger."
        },
        {
          q: "Zijn de tassen waterdicht?",
          a: "De canvas tassen zijn waterafstotend maar niet volledig waterdicht. Ze zijn prima voor dagelijks gebruik, maar niet geschikt voor zware regenbuien."
        },
        {
          q: "Hoe groot is de tas?",
          a: "De Canvas Hobo Bag heeft de afmetingen 35 x 40 x 15 cm en weegt ongeveer 380 gram. De tas biedt ruimte voor een laptop tot 13 inch."
        },
      ]
    },
    {
      title: "Account & Privacy",
      questions: [
        {
          q: "Moet ik een account aanmaken om te bestellen?",
          a: "Nee, je kunt ook als gast bestellen. Met een account kun je wel je bestellingen volgen, adressen opslaan en sneller afrekenen."
        },
        {
          q: "Hoe ga ik om met mijn persoonlijke gegevens?",
          a: "We nemen privacy serieus. Je gegevens worden alleen gebruikt voor het verwerken van je bestelling en worden nooit verkocht aan derden. Lees onze privacyverklaring voor meer informatie."
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">
              Veelgestelde vragen
            </h1>
            <p className="text-muted-foreground">
              Vind snel antwoord op je vragen. Staat je vraag er niet bij?{' '}
              <a href="mailto:hello@studiocloud.store" className="underline hover:no-underline">
                Neem contact met ons op
              </a>
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-lg font-medium mb-4">{category.title}</h2>
                <Accordion type="single" collapsible className="border border-border rounded-lg">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="border-b last:border-0"
                    >
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-secondary/30">
                        <span className="text-left">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 bg-secondary/30 rounded-lg text-center">
            <h3 className="font-medium mb-2">Nog vragen?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ons klantenserviceteam staat voor je klaar
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

export default FAQPage;
