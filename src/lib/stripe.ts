// Stripe checkout utilities

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface CheckoutItem {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  currency?: string;
  variant?: string;
  images?: string[];
}

export interface CheckoutSessionParams {
  items: CheckoutItem[];
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * Create a Stripe Checkout session and redirect the user
 */
export async function createCheckoutSession(params: CheckoutSessionParams): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();

    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}
