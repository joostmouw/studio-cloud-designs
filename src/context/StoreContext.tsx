import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, User, Order, Address, Product, ProductColor, ShippingOption, PickupPoint, Review } from '@/types';

// Demo products data
export const PRODUCTS: Product[] = [
  {
    id: 'hobo-bag-1',
    name: 'Canvas Hobo Bag',
    description: 'Onze iconische Canvas Hobo Bag is handgemaakt van premium gewassen canvas. Met zijn relaxte silhouet en ruime binnenkant is deze tas perfect voor dagelijks gebruik. De verstelbare schouderband maakt hem comfortabel te dragen.',
    price: 34.95,
    images: [
      '/products/weekend-tote/1.jpg',
      '/products/weekend-tote/2.jpg',
      '/products/weekend-tote/3.jpg',
      '/products/weekend-tote/4.jpg',
      '/products/weekend-tote/5.jpg',
      '/products/weekend-tote/6.jpg',
      '/products/weekend-tote/7.jpg',
    ],
    colors: [
      { name: 'Off White', value: '#F5F0E8' },
      { name: 'Stone Grey', value: '#A8A39D' },
      { name: 'Charcoal Black', value: '#2A2A2A' },
      { name: 'Olive Green', value: '#5C6B4A' },
      { name: 'Warm Coral', value: '#C97B6B' },
    ],
    inStock: true,
    category: 'tassen',
  },
  {
    id: 'classic-shoulder',
    name: 'Classic Shoulder Bag',
    description: 'Een tijdloze schoudertas met een verfijnde uitstraling. Gemaakt van hoogwaardig leer met luxe afwerking. Perfect voor zowel casual als formele gelegenheden.',
    price: 49.95,
    images: [
      '/products/classic-shoulder/1.jpg',
      '/products/classic-shoulder/2.jpg',
      '/products/classic-shoulder/3.jpg',
      '/products/classic-shoulder/4.jpg',
    ],
    colors: [
      { name: 'Black', value: '#2A2A2A' },
      { name: 'Cognac', value: '#8B5A3C' },
      { name: 'Navy', value: '#1A2C42' },
    ],
    inStock: true,
    category: 'tassen',
  },
  {
    id: 'urban-backpack',
    name: 'Urban Backpack',
    description: 'Moderne rugzak met laptop compartiment en doordacht ontwerp. Ideaal voor dagelijks woon-werk verkeer of een weekendje weg. Duurzame materialen en ergonomisch ontwerp.',
    price: 59.95,
    images: [
      '/products/urban-backpack/1.jpg',
      '/products/urban-backpack/2.jpg',
      '/products/urban-backpack/3.jpg',
      '/products/urban-backpack/4.jpg',
      '/products/urban-backpack/5.jpg',
    ],
    colors: [
      { name: 'Charcoal', value: '#36454F' },
      { name: 'Olive', value: '#5C6B4A' },
      { name: 'Navy', value: '#1A2C42' },
    ],
    inStock: true,
    category: 'tassen',
  },
  {
    id: 'travel-duffel',
    name: 'Travel Duffel',
    description: 'Ruime weekendtas met verstevigde handvatten en verstelbare schouderband. Extra grote capaciteit voor al je reisbenodigdheden. Waterafstotend en slijtvast.',
    price: 69.95,
    images: [
      '/products/travel-duffel/1.jpg',
      '/products/travel-duffel/2.jpg',
      '/products/travel-duffel/3.jpg',
    ],
    colors: [
      { name: 'Black', value: '#2A2A2A' },
      { name: 'Olive', value: '#5C6B4A' },
      { name: 'Stone', value: '#A8A39D' },
    ],
    inStock: true,
    category: 'tassen',
  },
];

// Shipping options
export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'home_standard',
    name: 'PostNL Standaard',
    description: 'Thuisbezorging',
    price: 4.95,
    estimatedDays: '2-3 werkdagen',
    icon: 'truck',
  },
  {
    id: 'home_express',
    name: 'PostNL Express',
    description: 'Volgende werkdag bezorgd',
    price: 7.95,
    estimatedDays: '1 werkdag',
    icon: 'zap',
  },
  {
    id: 'pickup_point',
    name: 'PostNL Afhaalpunt',
    description: 'Ophalen bij een afhaalpunt',
    price: 3.95,
    estimatedDays: '2-3 werkdagen',
    icon: 'map-pin',
  },
];

// Demo pickup points
export const PICKUP_POINTS: PickupPoint[] = [
  { id: 'pp1', name: 'Albert Heijn Centrum', address: 'Hoofdstraat 12', city: 'Amsterdam', postalCode: '1012 AB', distance: '0.3 km' },
  { id: 'pp2', name: 'Bruna Station', address: 'Stationsplein 1', city: 'Amsterdam', postalCode: '1012 CD', distance: '0.5 km' },
  { id: 'pp3', name: 'Primera Oost', address: 'Ooststraat 45', city: 'Amsterdam', postalCode: '1013 EF', distance: '0.8 km' },
];

// Wishlist item type
interface WishlistItem {
  productId: string;
  addedAt: Date;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorValue: string) => void;
  updateQuantity: (productId: string, colorValue: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Newsletter
  isNewsletterSubscribed: boolean;
  subscribeNewsletter: (email: string) => void;
  hasSeenNewsletterPopup: boolean;
  setHasSeenNewsletterPopup: (seen: boolean) => void;

  // User
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (addressId: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
  getOrder: (orderId: string) => Order | undefined;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  getProductReviews: (productId: string) => Review[];

  // Checkout state
  checkoutAddress: Address | null;
  setCheckoutAddress: (address: Address | null) => void;
  selectedShipping: ShippingOption | null;
  setSelectedShipping: (option: ShippingOption | null) => void;
  selectedPickupPoint: PickupPoint | null;
  setSelectedPickupPoint: (point: PickupPoint | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'studio_cloud_cart',
  USER: 'studio_cloud_user',
  ORDERS: 'studio_cloud_orders',
  REVIEWS: 'studio_cloud_reviews',
  WISHLIST: 'studio_cloud_wishlist',
  NEWSLETTER: 'studio_cloud_newsletter',
  NEWSLETTER_POPUP: 'studio_cloud_newsletter_popup',
};

export function StoreProvider({ children }: { children: ReactNode }) {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // User state
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Newsletter state
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.NEWSLETTER) === 'true';
    }
    return false;
  });

  const [hasSeenNewsletterPopup, setHasSeenNewsletterPopupState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.NEWSLETTER_POPUP) === 'true';
    }
    return false;
  });

  // Checkout state
  const [checkoutAddress, setCheckoutAddress] = useState<Address | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<PickupPoint | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  // Persist orders to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Persist reviews to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist newsletter state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER, String(isNewsletterSubscribed));
  }, [isNewsletterSubscribed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER_POPUP, String(hasSeenNewsletterPopup));
  }, [hasSeenNewsletterPopup]);

  // Wishlist functions
  const addToWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.some(item => item.productId === productId)) {
        return prev;
      }
      return [...prev, { productId, addedAt: new Date() }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.productId !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const wishlistCount = wishlist.length;

  // Newsletter functions
  const subscribeNewsletter = (email: string) => {
    // In production, this would send to an API
    console.log('Newsletter subscription:', email);
    setIsNewsletterSubscribed(true);
  };

  const setHasSeenNewsletterPopup = (seen: boolean) => {
    setHasSeenNewsletterPopupState(seen);
  };

  // Cart functions
  const addToCart = (product: Product, color: ProductColor, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor.value === color.value
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedColor: color, quantity }];
    });
  };

  const removeFromCart = (productId: string, colorValue: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor.value === colorValue)
    ));
  };

  const updateQuantity = (productId: string, colorValue: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorValue);
      return;
    }

    setCart(prev => prev.map(item =>
      item.product.id === productId && item.selectedColor.value === colorValue
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // User functions
  const login = async (email: string, _password: string): Promise<boolean> => {
    // Demo login - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));

    const demoUser: User = {
      id: 'demo-user-1',
      email,
      firstName: 'Demo',
      lastName: 'Gebruiker',
      addresses: [],
      createdAt: new Date(),
    };

    setUser(demoUser);
    return true;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Demo registration
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone,
      addresses: [],
      createdAt: new Date(),
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCheckoutAddress(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: `addr-${Date.now()}`,
      };
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress],
      });
    }
  };

  const updateAddress = (address: Address) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.map(a => a.id === address.id ? address : a),
      });
    }
  };

  const deleteAddress = (addressId: string) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.filter(a => a.id !== addressId),
      });
    }
  };

  // Order functions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const order: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber: `SC${Date.now().toString().slice(-8)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrders(prev => [order, ...prev]);
    return order;
  };

  const getOrder = (orderId: string) => orders.find(o => o.id === orderId);

  // Review functions
  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date(),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getProductReviews = (productId: string) =>
    reviews.filter(r => r.productId === productId);

  return (
    <StoreContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount,
      isNewsletterSubscribed,
      subscribeNewsletter,
      hasSeenNewsletterPopup,
      setHasSeenNewsletterPopup,
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
      addAddress,
      updateAddress,
      deleteAddress,
      orders,
      createOrder,
      getOrder,
      reviews,
      addReview,
      getProductReviews,
      checkoutAddress,
      setCheckoutAddress,
      selectedShipping,
      setSelectedShipping,
      selectedPickupPoint,
      setSelectedPickupPoint,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
