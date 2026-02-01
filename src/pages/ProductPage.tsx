import { useState, Suspense, lazy, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore, PRODUCTS } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingBag, Check, Star, Truck, RotateCcw, Shield, Heart, Eye, Users, Image as ImageIcon, Box } from 'lucide-react';
import { ProductColor } from '@/types';

const BagViewer3D = lazy(() => import('@/components/BagViewer3D'));

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getProductReviews, isInWishlist, addToWishlist, removeFromWishlist } = useStore();
  const { t } = useLanguage();

  // Social proof - random number of viewers (demo)
  const [viewerCount, setViewerCount] = useState(0);
  useEffect(() => {
    setViewerCount(Math.floor(Math.random() * 15) + 5);
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(3, Math.min(25, prev + change));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const reviews = getProductReviews(product.id);
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [viewMode, setViewMode] = useState<'images' | '3d'>('images');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery & 3D Viewer */}
            <div className="lg:sticky lg:top-28 lg:h-fit">
              {/* View Mode Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setViewMode('images')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    viewMode === 'images'
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ImageIcon size={16} />
                  {t('product.photos')}
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    viewMode === '3d'
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Box size={16} />
                  {t('product.3dview')}
                </button>
              </div>

              {/* Image Gallery */}
              {viewMode === 'images' && (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-secondary/30 rounded-lg overflow-hidden">
                    <img
                      src={product.images[selectedImageIndex]}
                      alt={`${product.name} - afbeelding ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>

                  {/* Thumbnail Navigation */}
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? 'border-foreground scale-95'
                              : 'border-transparent hover:border-muted'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 3D Viewer */}
              {viewMode === '3d' && (
                <Suspense fallback={
                  <div className="h-[400px] lg:h-[600px] bg-secondary/30 rounded-lg flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">Laden...</div>
                  </div>
                }>
                  <BagViewer3D
                    className="w-full"
                    selectedColor={selectedColor.value}
                    colors={product.colors}
                  />
                </Suspense>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {/* Breadcrumb */}
              <nav className="text-xs text-muted-foreground">
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-foreground cursor-pointer bg-transparent border-0 p-0"
                >
                  Home
                </button>
                <span className="mx-2">/</span>
                <button
                  onClick={() => {
                    navigate('/');
                    // Scroll to collection section after navigation
                    setTimeout(() => {
                      const element = document.getElementById('collection');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="hover:text-foreground cursor-pointer bg-transparent border-0 p-0"
                >
                  Collection
                </button>
                <span className="mx-2">/</span>
                <span className="text-foreground">{product.name}</span>
              </nav>

              {/* Social Proof Banner */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Eye size={14} />
                  <span>{viewerCount} {t('product.viewing')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-600">
                  <Users size={14} />
                  <span>{t('product.popular')}</span>
                </div>
              </div>

              {/* Title & Price */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-light tracking-wide mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <span className="text-xl lg:text-2xl font-medium">
                      €{product.price.toFixed(2)}
                    </span>
                    {reviews.length > 0 && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{averageRating.toFixed(1)}</span>
                        <span>({reviews.length} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full border transition-colors ${
                    inWishlist
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'border-border hover:border-foreground text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label={inWishlist ? 'Verwijder uit wishlist' : 'Voeg toe aan wishlist'}
                >
                  <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <label className="text-xs tracked-wide text-muted-foreground mb-3 block">
                  {t('product.color')}: {selectedColor.name}
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground ${
                        selectedColor.value === color.value
                          ? 'border-foreground scale-110'
                          : 'border-muted'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-xs tracked-wide text-muted-foreground mb-3 block">
                  {t('product.quantity')}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-6 py-3 min-w-[60px] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="flex-1 h-14 text-sm tracked-wide"
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} className="mr-2" />
                      {t('product.added')}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="mr-2" />
                      {t('product.addToCart')}
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="flex-1 h-14 text-sm tracked-wide bg-foreground text-background hover:bg-foreground/90"
                >
                  {t('product.buyNow')}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Truck size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('product.freeShipping')}</p>
                    <p className="text-xs text-muted-foreground">{t('product.freeShipping.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('product.returns')}</p>
                    <p className="text-xs text-muted-foreground">{t('product.returns.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('product.warranty')}</p>
                    <p className="text-xs text-muted-foreground">{t('product.warranty.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-xs tracked-wide text-muted-foreground mb-4">DETAILS</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Handgemaakt van premium gewassen canvas</li>
                  <li>• Verstelbare schouderband</li>
                  <li>• Binnenvak met rits</li>
                  <li>• Afmetingen: 35 x 40 x 15 cm</li>
                  <li>• Gewicht: 380 gram</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-xl font-light tracking-wide mb-8">
              Klantbeoordelingen
              {reviews.length > 0 && (
                <span className="text-muted-foreground ml-2">({reviews.length})</span>
              )}
            </h2>

            {reviews.length === 0 ? (
              <p className="text-muted-foreground">
                Dit product heeft nog geen beoordelingen. Koop dit product en wees de eerste om een review te schrijven!
              </p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-sm">{review.userName}</span>
                      {review.verified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          Geverifieerde aankoop
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
