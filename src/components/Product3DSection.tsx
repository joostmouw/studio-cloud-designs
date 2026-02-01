import { Suspense } from "react";
import BagViewer3D from "./BagViewer3D";

const Product3DSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-xs tracked-ultra text-muted-foreground mb-4">
              360° WEERGAVE
            </p>
            <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-6">
              Bekijk elk detail
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Draai de tas met je muis om het ontwerp van alle kanten te bekijken. 
              Onze Cloud Tote is ontworpen met oog voor detail — van de zachte canvas 
              textuur tot de brede schouderband voor optimaal draagcomfort.
            </p>
            
            <ul className="space-y-4 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>Duurzaam canvas materiaal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>Verstelbare schouderband</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>Ruim hoofdvak met binnenzak</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>Verkrijgbaar in 5 kleuren</span>
              </li>
            </ul>
          </div>
          
          {/* 3D Viewer */}
          <div className="order-1 lg:order-2">
            <Suspense fallback={
              <div className="h-[400px] lg:h-[500px] w-full bg-secondary/30 rounded-lg flex items-center justify-center">
                <div className="text-muted-foreground text-sm">Laden...</div>
              </div>
            }>
              <BagViewer3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product3DSection;
