import { Suspense, lazy } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BagViewer3DSkeleton from "./BagViewer3DSkeleton";

// Lazy load 3D viewer component to reduce initial bundle size
const BagViewer3D = lazy(() => import("./BagViewer3D"));

const Product3DSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-xs tracked-ultra text-muted-foreground mb-4">
              {t('3d.title')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-6">
              {t('3d.subtitle')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              {t('3d.description')}
            </p>

            <ul className="space-y-4 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>{t('3d.feature1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>{t('3d.feature2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>{t('3d.feature3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                <span>{t('3d.feature4')}</span>
              </li>
            </ul>
          </div>
          
          {/* 3D Viewer */}
          <div className="order-1 lg:order-2">
            <Suspense fallback={<BagViewer3DSkeleton />}>
              <BagViewer3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product3DSection;
