const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xpnmjmsietrvzhumqprl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwbm1qbXNpZXRydnpodW1xcHJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUxOTM5NSwiZXhwIjoyMDg3MDk1Mzk1fQ.piXHg98iYZVf7h24RNW7N0d9GNaQ8wFFtxFoErEXNj8';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createMissingTables() {
  console.log('Creating missing tables...\n');

  // Create subscriptions table
  const { error: subError } = await supabase.from('subscriptions').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    plan: 'starter',
    status: 'pending'
  });
  
  if (subError && subError.code === '42P01') {
    console.log('❌ subscriptions table does not exist - needs SQL creation');
  } else if (subError && subError.code !== '23503') {
    console.log('✅ subscriptions table exists');
  }

  // Create credits table  
  const { error: credError } = await supabase.from('credits').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    balance: 0,
    monthly_allowance: 0
  });
  
  if (credError && credError.code === '42P01') {
    console.log('❌ credits table does not exist - needs SQL creation');
  } else if (credError && credError.code !== '23503') {
    console.log('✅ credits table exists');
  }

  console.log('\nTables verification complete.');
  console.log('\n⚠️  NOTE: Cannot create tables via REST API.');
  console.log('Please run this SQL in Supabase Dashboard > SQL Editor:\n');
  console.log(`CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK(plan IN ('starter', 'pro', 'business')),
  status TEXT NOT NULL DEFAULT 'pending',
  mollie_customer_id TEXT,
  mollie_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  balance INTEGER NOT NULL DEFAULT 0,
  monthly_allowance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
}

createMissingTables();
