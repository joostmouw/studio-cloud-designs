# Stripe Checkout + Webhook Fulfillment Setup Guide

This guide will help you set up the complete Stripe checkout and automated fulfillment system.

## 📋 Overview

The system consists of:
- **Frontend**: React/TypeScript checkout interface
- **Backend**: Node.js/Express server handling webhooks
- **Stripe**: Payment processing and checkout
- **Supplier Integration**: Automatic order forwarding via webhook

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Stripe

#### A. Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create an account or log in
3. Navigate to **Developers > API keys**
4. Copy your **Secret key** (starts with `sk_test_` for test mode)

#### B. Set Up Webhook Endpoint

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. For local testing, use: `http://localhost:3001/webhook`
   - For production, use your actual server URL
4. Select events to listen to:
   - ✅ `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

### 3. Configure Environment Variables

#### Backend Configuration

Create `server/.env` from the example:

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
# Your Stripe secret key from Step 2A
STRIPE_SECRET_KEY=sk_test_51...

# Your webhook signing secret from Step 2B
STRIPE_WEBHOOK_SECRET=whsec_...

# Server port
PORT=3001

# Your frontend URL
FRONTEND_URL=http://localhost:5173

# Your supplier's webhook URL where orders will be sent
SUPPLIER_WEBHOOK_URL=https://your-supplier-api.com/orders

# Optional: If your supplier requires authentication
SUPPLIER_AUTH_TOKEN=your_bearer_token_here
```

#### Frontend Configuration

Create `.env` in the project root:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3001
```

### 4. Start the Services

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📡 Webhook endpoint: http://localhost:3001/webhook
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

### 5. Test the Integration

#### Local Testing with Stripe CLI

For local webhook testing, install [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/webhook
```

The CLI will output a webhook signing secret - use this in your `server/.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Test a Purchase

1. Visit `http://localhost:5173/checkout` in your browser
2. Enter a test email
3. Click "Proceed to Checkout"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
5. Complete the checkout

#### Verify the Flow

Check your terminal logs:

**Backend Server:**
```
✅ Order processed: {
  orderId: "cs_test_...",
  customerName: "John Doe",
  customerEmail: "test@example.com",
  shippingAddress: { ... },
  products: [ ... ]
}
✅ Order forwarded to supplier successfully
```

## 📦 Order Data Format

The webhook sends this JSON structure to your supplier:

```json
{
  "orderId": "cs_test_abc123",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "shippingAddress": {
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94102",
    "country": "US"
  },
  "products": [
    {
      "productId": "prod_abc123",
      "productName": "Example Product",
      "variant": "blue-large",
      "quantity": 2,
      "pricePerUnit": 29.99,
      "currency": "usd"
    }
  ],
  "totalAmount": 59.98,
  "currency": "usd",
  "paymentStatus": "paid",
  "timestamp": "2026-02-01T12:00:00.000Z"
}
```

## 🔧 Customization

### Adding Product Variants

When creating checkout sessions, include variant information in the metadata:

```typescript
await createCheckoutSession({
  items: [
    {
      name: 'T-Shirt',
      price: 25.00,
      quantity: 1,
      variant: 'blue-medium',  // This goes to your supplier
      description: 'Cotton t-shirt'
    }
  ]
});
```

### Custom Data Format

If your supplier needs a different format, edit `server/index.js` in the webhook handler:

```javascript
// Custom format example
const supplierFormat = {
  order_id: orderData.orderId,
  customer: {
    full_name: orderData.customerName,
    email: orderData.customerEmail
  },
  items: orderData.products.map(p => ({
    sku: p.variant,
    qty: p.quantity
  }))
};

await fetch(supplierWebhookUrl, {
  method: 'POST',
  body: JSON.stringify(supplierFormat)
});
```

### Adding Authentication

If your supplier requires API keys or tokens:

1. Add to `server/.env`:
   ```env
   SUPPLIER_AUTH_TOKEN=your_secret_token
   SUPPLIER_API_KEY=your_api_key
   ```

2. Update the webhook request headers in `server/index.js`:
   ```javascript
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${process.env.SUPPLIER_AUTH_TOKEN}`,
     'X-API-Key': process.env.SUPPLIER_API_KEY
   }
   ```

## 🌐 Production Deployment

### Deploy Backend

**Option 1: Railway**
```bash
cd server
npm install -g @railway/cli
railway login
railway init
railway up
```

**Option 2: Heroku**
```bash
cd server
heroku create your-app-name
git push heroku main
```

**Option 3: DigitalOcean/AWS/VPS**
- Set up Node.js environment
- Install dependencies: `npm install`
- Set environment variables
- Run with PM2: `pm2 start index.js`

### Update Stripe Webhook URL

1. Go to Stripe Dashboard > Developers > Webhooks
2. Update endpoint URL to your production server:
   ```
   https://your-backend-domain.com/webhook
   ```
3. Copy the new webhook secret and update your production environment variables

### Deploy Frontend

Update `.env`:
```env
VITE_API_URL=https://your-backend-domain.com
```

Then deploy via Lovable or your preferred hosting.

## 🧪 Testing

### Test Cards

- **Success**: 4242 4242 4242 4242
- **Requires authentication**: 4000 0027 6000 3184
- **Declined**: 4000 0000 0000 0002

### Testing Webhooks

Use the Stripe Dashboard's webhook testing:
1. Go to Developers > Webhooks
2. Click on your endpoint
3. Click "Send test webhook"
4. Select `checkout.session.completed`

## 🔍 Troubleshooting

### Webhook not receiving events

1. **Check webhook secret**: Make sure `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
2. **Verify URL**: Endpoint must be publicly accessible in production
3. **Check Stripe Dashboard**: View webhook logs under Developers > Webhooks > [Your endpoint]

### Orders not forwarding to supplier

1. **Check logs**: Look for errors in server console
2. **Verify URL**: Confirm `SUPPLIER_WEBHOOK_URL` is correct
3. **Test supplier endpoint**: Use curl or Postman to test their API directly
4. **Check auth**: Ensure authentication tokens are correct

### CORS errors

Update `server/index.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## 📚 Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe API Reference](https://stripe.com/docs/api)

## 🆘 Support

If you encounter issues:
1. Check server logs for error messages
2. Review Stripe Dashboard webhook logs
3. Verify all environment variables are set correctly
4. Test with Stripe CLI for local debugging
