import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, Truck, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder, isAuthenticated } = useStore();

  const order = orderId ? getOrder(orderId) : undefined;

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 lg:pt-24">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <h1 className="text-2xl font-light mb-4">Bestelling niet gevonden</h1>
            <p className="text-muted-foreground mb-6">
              We konden de bestelling niet vinden. Mogelijk is deze al verwerkt.
            </p>
            <Button onClick={() => navigate('/')}>Terug naar home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-foreground" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-light tracking-wide mb-2">
              Bedankt voor je bestelling!
            </h1>
            <p className="text-muted-foreground">
              Je bestelling is bevestigd en wordt zo snel mogelijk verzonden.
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Bestelnummer</p>
                <p className="text-xl font-medium">{order.orderNumber}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-muted-foreground">Status</p>
                <span className="inline-flex items-center gap-1 text-foreground font-medium">
                  <CheckCircle2 size={16} />
                  Bevestigd
                </span>
              </div>
            </div>

            {/* Email confirmation notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Een bevestigingsmail is verzonden naar het opgegeven e-mailadres. Check ook je spam folder als je deze niet ontvangt.
              </p>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Address */}
            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-muted-foreground" />
                <h3 className="font-medium">Bezorgadres</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                {order.shippingAddress.street} {order.shippingAddress.houseNumber}
                {order.shippingAddress.houseNumberAddition}<br />
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
            </div>

            {/* Shipping Method */}
            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={18} className="text-muted-foreground" />
                <h3 className="font-medium">Verzendmethode</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {order.shippingMethod.name}<br />
                {order.shippingMethod.estimatedDays}
              </p>
              {order.pickupPoint && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm font-medium">Afhaalpunt:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.pickupPoint.name}<br />
                    {order.pickupPoint.address}<br />
                    {order.pickupPoint.postalCode} {order.pickupPoint.city}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="border border-border rounded-lg p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-muted-foreground" />
              <h3 className="font-medium">Bestelde producten</h3>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.value}`}
                  className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div
                    className="w-16 h-16 rounded flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: item.selectedColor.value }}
                  >
                    <ShoppingBag size={20} className="text-white/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Kleur: {item.selectedColor.name} • Aantal: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotaal</span>
                <span>€{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verzendkosten</span>
                <span>
                  {order.shippingCost === 0 ? 'Gratis' : `€${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t border-border">
                <span>Totaal</span>
                <span>€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h3 className="font-medium mb-4">Wat gebeurt er nu?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-foreground/10 text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Bestelling ontvangen</p>
                  <p className="text-sm text-muted-foreground">We hebben je bestelling ontvangen en verwerken deze zo snel mogelijk.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Verzending</p>
                  <p className="text-sm text-muted-foreground">Je ontvangt een e-mail met trackinggegevens zodra je pakket onderweg is.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Levering</p>
                  <p className="text-sm text-muted-foreground">
                    {order.pickupPoint
                      ? 'Je kunt je pakket ophalen bij het gekozen afhaalpunt.'
                      : 'Je pakket wordt bezorgd op het opgegeven adres.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button
                onClick={() => navigate('/account/orders')}
                variant="outline"
                className="min-w-[200px]"
              >
                Bekijk bestellingen
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/account')}
                variant="outline"
                className="min-w-[200px]"
              >
                Account aanmaken
              </Button>
            )}
            <Button
              onClick={() => navigate('/')}
              className="min-w-[200px] bg-foreground text-background hover:bg-foreground/90"
            >
              Verder winkelen
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
