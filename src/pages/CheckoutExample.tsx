import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCheckoutSession } from '@/lib/stripe';
import { toast } from 'sonner';

export default function CheckoutExample() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      await createCheckoutSession({
        items: [
          {
            name: 'Example Product',
            description: 'This is a sample product',
            price: 29.99,
            quantity: 1,
            variant: 'blue-large', // Product variant for supplier
            images: ['https://via.placeholder.com/300']
          }
        ],
        customerEmail: email,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
      });
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Stripe Checkout Example</CardTitle>
          <CardDescription>
            Test the Stripe checkout integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Example Product</h3>
            <p className="text-sm text-muted-foreground">Sample product variant: blue-large</p>
            <p className="text-2xl font-bold">$29.99</p>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Loading...' : 'Proceed to Checkout'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Use test card: 4242 4242 4242 4242 (any future date, any CVC)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
