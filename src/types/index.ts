// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: ProductColor[];
  inStock: boolean;
  category: string;
}

export interface ProductColor {
  name: string;
  value: string;
  image?: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  houseNumberAddition?: string;
  postalCode: string;
  city: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// Shipping types
export type ShippingMethod = 'home_standard' | 'home_express' | 'pickup_point';

export interface ShippingOption {
  id: ShippingMethod;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  distance?: string;
  openingHours?: string;
}

// Order types
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  shippingMethod: ShippingOption;
  pickupPoint?: PickupPoint;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  orderId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  verified: boolean;
}
