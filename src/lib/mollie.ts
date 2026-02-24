import { createMollieClient } from '@mollie/api-client';

const apiKey = process.env.MOLLIE_API_KEY;

if (!apiKey) {
  console.warn('⚠️ MOLLIE_API_KEY not set. Payments will not work.');
}

export const mollieClient = createMollieClient({
  apiKey: apiKey || 'test_dummy_key',
});

// Plan configuration
export const PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 14,
    credits: 5,
    extraCreditPrice: 3,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 69,
    credits: 30,
    extraCreditPrice: 2.5,
  },
  business: {
    id: 'business',
    name: 'Business',
    price: 159,
    credits: 100,
    extraCreditPrice: 2,
  },
};

// Formation configuration
export const FORMATIONS = {
  code: {
    id: 'code',
    name: 'Code Liberté',
    price: 350,
    discountPerMonth: 10,
  },
  asa: {
    id: 'asa',
    name: 'ASA',
    price: 497,
    discountPerMonth: 5,
  },
  dsa: {
    id: 'dsa',
    name: 'DSA',
    price: 997,
    discountPerMonth: 10,
  },
};

// Calculate subscription price with discounts
export function calculateSubscriptionPrice(
  planId: keyof typeof PLANS,
  userFormations: string[]
): { basePrice: number; discount: number; finalPrice: number } {
  const plan = PLANS[planId];
  if (!plan) throw new Error('Invalid plan');

  let discount = 0;
  for (const formationId of userFormations) {
    const formation = FORMATIONS[formationId as keyof typeof FORMATIONS];
    if (formation) {
      discount += formation.discountPerMonth;
    }
  }

  // Cap discount at 10€ max
  discount = Math.min(discount, 10);

  return {
    basePrice: plan.price,
    discount,
    finalPrice: Math.max(plan.price - discount, 10), // Minimum 10€
  };
}
