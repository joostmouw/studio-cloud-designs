# 🚀 Quick Start - Stripe Fulfillment System

Get your automated order fulfillment system running in 5 minutes!

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Get Stripe Keys

1. Visit [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Secret key** (starts with `sk_test_`)
3. Go to [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
4. Click **"Add endpoint"**
5. Enter URL: `http://localhost:3001/webhook`
6. Select event: `checkout.session.completed`
7. Copy the **Signing secret** (starts with `whsec_`)

## Step 3: Configure Environment

Create `server/.env`:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
PORT=3001
FRONTEND_URL=http://localhost:5173
SUPPLIER_WEBHOOK_URL=https://your-supplier.com/webhook
```

Create `.env` in root:

```env
VITE_API_URL=http://localhost:3001
```

## Step 4: Start Everything

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Terminal 3 - Stripe Webhooks (for local testing):**
```bash
stripe listen --forward-to localhost:3001/webhook
```

## Step 5: Test It!

1. Go to `http://localhost:5173/checkout`
2. Enter any email
3. Click checkout
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout

✅ Check your backend terminal - you should see the order being processed and forwarded!

## 📦 What Gets Sent to Your Supplier

```json
{
  "orderId": "cs_test_abc123",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "shippingAddress": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94102",
    "country": "US"
  },
  "products": [
    {
      "productName": "Example Product",
      "variant": "blue-large",
      "quantity": 1,
      "pricePerUnit": 29.99
    }
  ],
  "totalAmount": 29.99,
  "paymentStatus": "paid"
}
```

## Need More Details?

See [STRIPE_SETUP_GUIDE.md](./STRIPE_SETUP_GUIDE.md) for:
- Production deployment
- Custom data formats
- Troubleshooting
- Advanced configuration
