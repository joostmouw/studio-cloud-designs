import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// IMPORTANT: For webhooks, we need raw body before JSON parsing
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Retrieve full session details with line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product']
      });

      // Extract order details
      const orderData = {
        orderId: fullSession.id,
        customerName: fullSession.customer_details?.name || '',
        customerEmail: fullSession.customer_details?.email || '',
        shippingAddress: {
          line1: fullSession.shipping_details?.address?.line1 || '',
          line2: fullSession.shipping_details?.address?.line2 || '',
          city: fullSession.shipping_details?.address?.city || '',
          state: fullSession.shipping_details?.address?.state || '',
          postalCode: fullSession.shipping_details?.address?.postal_code || '',
          country: fullSession.shipping_details?.address?.country || ''
        },
        products: fullSession.line_items?.data.map(item => ({
          productId: item.price?.product?.id || '',
          productName: item.price?.product?.name || item.description || '',
          variant: item.price?.product?.metadata?.variant || '',
          quantity: item.quantity || 1,
          pricePerUnit: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
          currency: item.price?.currency || 'usd'
        })) || [],
        totalAmount: fullSession.amount_total ? fullSession.amount_total / 100 : 0,
        currency: fullSession.currency || 'usd',
        paymentStatus: fullSession.payment_status,
        timestamp: new Date().toISOString()
      };

      console.log('✅ Order processed:', orderData);

      // Forward to supplier fulfillment system
      const supplierWebhookUrl = process.env.SUPPLIER_WEBHOOK_URL;

      if (supplierWebhookUrl) {
        const response = await fetch(supplierWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication if your supplier requires it
            ...(process.env.SUPPLIER_AUTH_TOKEN && {
              'Authorization': `Bearer ${process.env.SUPPLIER_AUTH_TOKEN}`
            })
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          console.log('✅ Order forwarded to supplier successfully');
        } else {
          console.error('❌ Failed to forward order to supplier:', response.status, await response.text());
        }
      } else {
        console.warn('⚠️  SUPPLIER_WEBHOOK_URL not configured. Order not forwarded.');
      }

    } catch (error) {
      console.error('Error processing order:', error);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

// Regular JSON middleware for other routes
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: items.map(item => ({
        price_data: {
          currency: item.currency || 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images || [],
            metadata: {
              variant: item.variant || ''
            }
          },
          unit_amount: Math.round(item.price * 100) // Convert to cents
        },
        quantity: item.quantity || 1
      })),
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE'] // Add countries as needed
      },
      success_url: successUrl || `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook`);
});
