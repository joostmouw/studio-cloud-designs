# Stripe Fulfillment Backend Server

Express server that handles Stripe webhooks and forwards orders to your supplier's fulfillment system.

## Features

- ✅ Stripe Checkout session creation
- ✅ Webhook signature verification
- ✅ Automatic order data extraction
- ✅ Configurable supplier forwarding
- ✅ Support for product variants
- ✅ Comprehensive error handling
- ✅ CORS enabled for frontend integration

## API Endpoints

### `POST /create-checkout-session`

Creates a Stripe Checkout session.

**Request:**
```json
{
  "items": [
    {
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "quantity": 1,
      "variant": "blue-large",
      "currency": "usd",
      "images": ["https://example.com/image.jpg"]
    }
  ],
  "customerEmail": "customer@example.com",
  "successUrl": "https://yoursite.com/success",
  "cancelUrl": "https://yoursite.com/cancel"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### `POST /webhook`

Receives Stripe webhook events. Must be called by Stripe with proper signature.

**Handles:**
- `checkout.session.completed` - Processes completed orders and forwards to supplier

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-01T12:00:00.000Z"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret from Stripe | ✅ Yes |
| `SUPPLIER_WEBHOOK_URL` | Your supplier's webhook endpoint | ✅ Yes |
| `SUPPLIER_AUTH_TOKEN` | Bearer token for supplier auth | ❌ Optional |
| `PORT` | Server port (default: 3001) | ❌ Optional |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ Optional |

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Uses Node.js `--watch` flag for auto-reload on file changes.

## Production

```bash
npm start
```

## Testing Webhooks Locally

Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
```

Login and forward webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3001/webhook
```

## Order Data Structure

The webhook extracts and forwards this data structure:

```typescript
{
  orderId: string;           // Stripe session ID
  customerName: string;      // Customer full name
  customerEmail: string;     // Customer email
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  products: [{
    productId: string;       // Stripe product ID
    productName: string;     // Product name
    variant: string;         // Product variant from metadata
    quantity: number;        // Quantity ordered
    pricePerUnit: number;    // Price per unit in dollars
    currency: string;        // Currency code
  }];
  totalAmount: number;       // Total in dollars
  currency: string;          // Currency code
  paymentStatus: string;     // Payment status
  timestamp: string;         // ISO timestamp
}
```

## Security

- ✅ Webhook signature verification prevents spoofing
- ✅ Raw body parsing for Stripe webhook validation
- ✅ CORS protection
- ✅ Environment variable configuration
- ✅ Error logging without exposing sensitive data

## Troubleshooting

### Webhook Signature Verification Failed

- Ensure `STRIPE_WEBHOOK_SECRET` matches your Stripe Dashboard webhook
- Verify the webhook endpoint URL in Stripe matches your server
- Check that you're using `express.raw()` before the webhook route

### Orders Not Forwarding

- Verify `SUPPLIER_WEBHOOK_URL` is accessible
- Check supplier API authentication requirements
- Review server logs for error details
- Test supplier endpoint independently with curl/Postman

### CORS Errors

- Update `FRONTEND_URL` in `.env`
- Verify frontend is making requests from allowed origin
- Check CORS middleware configuration
