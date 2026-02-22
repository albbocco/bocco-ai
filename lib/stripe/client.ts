import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PRICE_CREDITS_10 = process.env.STRIPE_PRICE_CREDITS_10 || ''
export const PRICE_CREDITS_30 = process.env.STRIPE_PRICE_CREDITS_30 || ''
export const PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY || ''
export const PRICE_YEARLY = process.env.STRIPE_PRICE_YEARLY || ''

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  customerId?: string
  priceId: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: priceId.includes('subscription') ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })

  return session
}

export async function createCustomer({
  email,
  name,
}: {
  email: string
  name?: string
}) {
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}

export async function getOrCreateCustomer({
  email,
  name,
  stripeCustomerId,
}: {
  email: string
  name?: string
  stripeCustomerId?: string | null
}) {
  if (stripeCustomerId) {
    try {
      const customer = await stripe.customers.retrieve(stripeCustomerId)
      if (!customer.deleted) {
        return customer
      }
    } catch (error) {
      // Customer not found, create new one
    }
  }

  return createCustomer({ email, name })
}
