import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, SHIPPING_OPTIONS, PICKUP_POINTS } from '@/context/StoreContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Truck,
  Zap,
  MapPin,
  ChevronRight,
  Lock,
  CreditCard,
  Check,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { Address, ShippingOption, PickupPoint } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addressSchema = z.object({
  firstName: z.string().min(2, 'Voornaam is verplicht'),
  lastName: z.string().min(2, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().min(10, 'Ongeldig telefoonnummer'),
  street: z.string().min(2, 'Straatnaam is verplicht'),
  houseNumber: z.string().min(1, 'Huisnummer is verplicht'),
  houseNumberAddition: z.string().optional(),
  postalCode: z.string().regex(/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/, 'Ongeldige postcode'),
  city: z.string().min(2, 'Plaats is verplicht'),
});

type AddressFormData = z.infer<typeof addressSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartTotal,
    isAuthenticated,
    user,
    checkoutAddress,
    setCheckoutAddress,
    selectedShipping,
    setSelectedShipping,
    selectedPickupPoint,
    setSelectedPickupPoint,
    createOrder,
    clearCart,
  } = useStore();

  const [step, setStep] = useState<'address' | 'shipping' | 'payment'>('address');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: checkoutAddress ? {
      firstName: checkoutAddress.firstName,
      lastName: checkoutAddress.lastName,
      street: checkoutAddress.street,
      houseNumber: checkoutAddress.houseNumber,
      houseNumberAddition: checkoutAddress.houseNumberAddition || '',
      postalCode: checkoutAddress.postalCode,
      city: checkoutAddress.city,
      email: user?.email || '',
      phone: checkoutAddress.phone || '',
    } : {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const shippingCost = selectedShipping?.price || 0;
  const subtotal = cartTotal;
  const total = subtotal + shippingCost;

  const getShippingIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck': return <Truck size={20} />;
      case 'zap': return <Zap size={20} />;
      case 'map-pin': return <MapPin size={20} />;
      default: return <Truck size={20} />;
    }
  };

  const onAddressSubmit = (data: AddressFormData) => {
    const address: Address = {
      id: 'checkout-address',
      firstName: data.firstName,
      lastName: data.lastName,
      street: data.street,
      houseNumber: data.houseNumber,
      houseNumberAddition: data.houseNumberAddition,
      postalCode: data.postalCode,
      city: data.city,
      country: 'Nederland',
      phone: data.phone,
    };
    setCheckoutAddress(address);
    setStep('shipping');
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
    if (option.id !== 'pickup_point') {
      setSelectedPickupPoint(null);
    }
  };

  const handlePickupPointSelect = (point: PickupPoint) => {
    setSelectedPickupPoint(point);
  };

  const handlePayment = async () => {
    if (!checkoutAddress || !selectedShipping) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = createOrder({
      userId: user?.id || 'guest',
      items: cart,
      shippingAddress: checkoutAddress,
      shippingMethod: selectedShipping,
      pickupPoint: selectedPickupPoint || undefined,
      subtotal,
      shippingCost,
      total,
      status: 'confirmed',
      paymentMethod: 'Demo Payment',
    });

    clearCart();
    setCheckoutAddress(null);
    setSelectedShipping(null);
    setSelectedPickupPoint(null);

    navigate(`/order-confirmation/${order.id}`);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {['address', 'shipping', 'payment'].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step === s
                    ? 'bg-foreground text-background'
                    : index < ['address', 'shipping', 'payment'].indexOf(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-secondary text-muted-foreground'
                }`}>
                  {index < ['address', 'shipping', 'payment'].indexOf(step) ? (
                    <Check size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${
                  step === s ? 'font-medium' : 'text-muted-foreground'
                }`}>
                  {s === 'address' ? 'Adres' : s === 'shipping' ? 'Verzending' : 'Betaling'}
                </span>
                {index < 2 && (
                  <ChevronRight size={16} className="mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {/* Address Step */}
              {step === 'address' && (
                <div className="bg-white border border-border rounded-lg p-6">
                  <h2 className="text-xl font-medium mb-6">Bezorgadres</h2>

                  <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Voornaam *</Label>
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Achternaam *</Label>
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mailadres *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefoonnummer *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="street">Straat *</Label>
                        <Input
                          id="street"
                          {...register('street')}
                          className={errors.street ? 'border-destructive' : ''}
                        />
                        {errors.street && (
                          <p className="text-xs text-destructive mt-1">{errors.street.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="houseNumber">Huisnr. *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="houseNumber"
                            {...register('houseNumber')}
                            className={errors.houseNumber ? 'border-destructive' : ''}
                          />
                          <Input
                            placeholder="Toev."
                            {...register('houseNumberAddition')}
                            className="w-20"
                          />
                        </div>
                        {errors.houseNumber && (
                          <p className="text-xs text-destructive mt-1">{errors.houseNumber.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Postcode *</Label>
                        <Input
                          id="postalCode"
                          {...register('postalCode')}
                          placeholder="1234 AB"
                          className={errors.postalCode ? 'border-destructive' : ''}
                        />
                        {errors.postalCode && (
                          <p className="text-xs text-destructive mt-1">{errors.postalCode.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="city">Plaats *</Label>
                        <Input
                          id="city"
                          {...register('city')}
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && (
                          <p className="text-xs text-destructive mt-1">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 mt-6 bg-foreground text-background hover:bg-foreground/90"
                    >
                      VERDER NAAR VERZENDING
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Shipping Step */}
              {step === 'shipping' && (
                <div className="bg-white border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium">Verzendmethode</h2>
                    <button
                      onClick={() => setStep('address')}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                    >
                      <ArrowLeft size={14} className="mr-1" />
                      Terug
                    </button>
                  </div>

                  <RadioGroup
                    value={selectedShipping?.id}
                    onValueChange={(value) => {
                      const option = SHIPPING_OPTIONS.find(o => o.id === value);
                      if (option) handleShippingSelect(option);
                    }}
                    className="space-y-3"
                  >
                    {SHIPPING_OPTIONS.map((option) => (
                      <div key={option.id}>
                        <label
                          className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedShipping?.id === option.id
                              ? 'border-foreground bg-secondary/30'
                              : 'border-border hover:border-muted-foreground'
                          }`}
                        >
                          <RadioGroupItem value={option.id} className="sr-only" />
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedShipping?.id === option.id
                              ? 'bg-foreground text-background'
                              : 'bg-secondary text-muted-foreground'
                          }`}>
                            {getShippingIcon(option.icon)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {option.description} • {option.estimatedDays}
                            </p>
                          </div>
                          <div className="font-medium">
                            {option.price === 0 ? 'Gratis' : `€${option.price.toFixed(2)}`}
                          </div>
                        </label>

                        {/* Pickup points */}
                        {option.id === 'pickup_point' && selectedShipping?.id === 'pickup_point' && (
                          <div className="ml-14 mt-3 space-y-2">
                            <p className="text-sm font-medium mb-2">Kies een afhaalpunt:</p>
                            {PICKUP_POINTS.map((point) => (
                              <label
                                key={point.id}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedPickupPoint?.id === point.id
                                    ? 'border-foreground bg-secondary/30'
                                    : 'border-border hover:border-muted-foreground'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="pickup-point"
                                  checked={selectedPickupPoint?.id === point.id}
                                  onChange={() => handlePickupPointSelect(point)}
                                  className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  selectedPickupPoint?.id === point.id
                                    ? 'border-foreground'
                                    : 'border-muted-foreground'
                                }`}>
                                  {selectedPickupPoint?.id === point.id && (
                                    <div className="w-2 h-2 rounded-full bg-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{point.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {point.address}, {point.postalCode} {point.city}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground">{point.distance}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </RadioGroup>

                  <Button
                    onClick={() => setStep('payment')}
                    disabled={!selectedShipping || (selectedShipping.id === 'pickup_point' && !selectedPickupPoint)}
                    className="w-full h-12 mt-6 bg-foreground text-background hover:bg-foreground/90"
                  >
                    VERDER NAAR BETALING
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              )}

              {/* Payment Step */}
              {step === 'payment' && (
                <div className="bg-white border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium">Betaling</h2>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                    >
                      <ArrowLeft size={14} className="mr-1" />
                      Terug
                    </button>
                  </div>

                  {/* Demo payment notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>Demo modus:</strong> Dit is een testomgeving. Er worden geen echte betalingen verwerkt.
                    </p>
                  </div>

                  {/* Payment method selector */}
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center gap-4 p-4 border border-foreground bg-secondary/30 rounded-lg cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                        <CreditCard size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">iDEAL / Creditcard</p>
                        <p className="text-sm text-muted-foreground">Veilig betalen via onze demo gateway</p>
                      </div>
                      <Check size={20} className="text-foreground" />
                    </label>
                  </div>

                  {/* Order summary for payment */}
                  <div className="border-t border-border pt-4 mb-6">
                    <h3 className="font-medium mb-3">Bezorgadres</h3>
                    {checkoutAddress && (
                      <p className="text-sm text-muted-foreground">
                        {checkoutAddress.firstName} {checkoutAddress.lastName}<br />
                        {checkoutAddress.street} {checkoutAddress.houseNumber}
                        {checkoutAddress.houseNumberAddition}<br />
                        {checkoutAddress.postalCode} {checkoutAddress.city}
                      </p>
                    )}

                    {selectedShipping?.id === 'pickup_point' && selectedPickupPoint && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Afhaalpunt</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedPickupPoint.name}<br />
                          {selectedPickupPoint.address}<br />
                          {selectedPickupPoint.postalCode} {selectedPickupPoint.city}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-14 bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        VERWERKEN...
                      </span>
                    ) : (
                      <>
                        <Lock size={16} className="mr-2" />
                        BETAAL €{total.toFixed(2)}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                    <Lock size={12} />
                    Veilige verbinding met SSL-encryptie
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/30 p-6 rounded-lg sticky top-28">
                <h2 className="text-lg font-medium mb-4">Bestelling</h2>

                <div className="space-y-4 mb-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor.value}`}
                      className="flex gap-3"
                    >
                      <div
                        className="w-16 h-16 rounded flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: item.selectedColor.value }}
                      >
                        <ShoppingBag size={20} className="text-white/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedColor.name} • Aantal: {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotaal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verzending</span>
                    <span>
                      {selectedShipping
                        ? selectedShipping.price === 0
                          ? 'Gratis'
                          : `€${selectedShipping.price.toFixed(2)}`
                        : '-'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Totaal</span>
                    <span className="text-lg">€{total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Inclusief BTW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
