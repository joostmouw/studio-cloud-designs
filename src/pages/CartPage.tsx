import { useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  const shippingThreshold = 50;
  const freeShippingRemaining = Math.max(0, shippingThreshold - cartTotal);
  const hasItems = cart.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <h1 className="text-2xl lg:text-3xl font-light tracking-wide mb-8">
            Winkelwagen
            <span className="text-muted-foreground ml-2">({cartCount})</span>
          </h1>

          {!hasItems ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-light mb-2">Je winkelwagen is leeg</h2>
              <p className="text-muted-foreground mb-6">
                Ontdek onze collectie en voeg producten toe aan je winkelwagen.
              </p>
              <Button onClick={() => navigate('/')} variant="outline">
                BEKIJK COLLECTIE
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free shipping banner */}
                {freeShippingRemaining > 0 ? (
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm">
                      Nog <span className="font-medium">€{freeShippingRemaining.toFixed(2)}</span> tot gratis verzending!
                    </p>
                    <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground transition-all duration-500"
                        style={{ width: `${Math.min(100, (cartTotal / shippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                    <p className="text-sm font-medium">🎉 Je komt in aanmerking voor gratis verzending!</p>
                  </div>
                )}

                {/* Items */}
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.value}`}
                    className="flex gap-4 p-4 border border-border rounded-lg"
                  >
                    {/* Product image placeholder */}
                    <div
                      className="w-24 h-24 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: item.selectedColor.value }}
                    >
                      <ShoppingBag size={32} className="text-white/50" />
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium truncate pr-2">{item.product.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor.value)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        Kleur: {item.selectedColor.name}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(
                              item.product.id,
                              item.selectedColor.value,
                              item.quantity - 1
                            )}
                            className="p-2 hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 py-2 min-w-[40px] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(
                              item.product.id,
                              item.selectedColor.value,
                              item.quantity + 1
                            )}
                            className="p-2 hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-medium">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary/30 p-6 rounded-lg sticky top-28">
                  <h2 className="text-lg font-medium mb-4">Overzicht</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotaal</span>
                      <span>€{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verzending</span>
                      <span>{cartTotal >= shippingThreshold ? 'Gratis' : 'Berekend bij checkout'}</span>
                    </div>
                  </div>

                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Totaal</span>
                      <span className="text-lg">€{cartTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Inclusief BTW
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate('/checkout')}
                    className="w-full mt-6 h-12 text-sm tracked-wide bg-foreground text-background hover:bg-foreground/90"
                  >
                    AFREKENEN
                    <ArrowRight size={16} className="ml-2" />
                  </Button>

                  <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="w-full mt-2 text-sm"
                  >
                    Verder winkelen
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
