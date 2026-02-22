-- Schema complet pour bocco.ai
-- Exécuter dans Supabase SQL Editor

-- Enable RLS
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- Table: users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  has_used_free_avatar BOOLEAN DEFAULT FALSE,
  subscription_status VARCHAR(50) DEFAULT 'free', -- free, active, cancelled, past_due
  subscription_plan VARCHAR(50), -- base, dsa, asa, code, annual
  credits_remaining INTEGER DEFAULT 0,
  credits_monthly INTEGER DEFAULT 0,
  subscription_renews_at TIMESTAMP WITH TIME ZONE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255)
);

-- Table: avatars
CREATE TABLE avatars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT,
  video_url TEXT,
  prompt_used TEXT,
  is_free BOOLEAN DEFAULT FALSE,
  gender VARCHAR(10), -- male, female
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active' -- active, processing, failed, deleted
);

-- Table: videos
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar_id UUID REFERENCES avatars(id),
  source_url TEXT,
  source_type VARCHAR(50), -- youtube, tiktok, upload
  format VARCHAR(20), -- short, long
  transcription_text TEXT,
  generated_script TEXT,
  preview_url TEXT,
  final_url TEXT,
  status VARCHAR(50) DEFAULT 'processing', -- processing, completed, failed
  credits_used INTEGER DEFAULT 0,
  formation_id VARCHAR(50), -- none, dsa, asa, code, custom
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Table: credit_transactions
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- positif = ajout, négatif = consommation
  type VARCHAR(50) NOT NULL, -- free, monthly, purchase, refund, usage
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  related_avatar_id UUID REFERENCES avatars(id),
  related_video_id UUID REFERENCES videos(id)
);

-- Table: formations_purchases
CREATE TABLE formations_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  formation_type VARCHAR(50) NOT NULL, -- dsa, asa, code_liberte
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  transaction_id VARCHAR(255),
  discount_applied INTEGER DEFAULT 0 -- en euros
);

-- Table: referral_discounts
CREATE TABLE referral_discounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES users(id),
  formation_type VARCHAR(50) NOT NULL,
  discount_amount INTEGER NOT NULL, -- en euros
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_avatars_user_id ON avatars(user_id);
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_videos_avatar_id ON videos(avatar_id);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_formations_purchases_user_id ON formations_purchases(user_id);
CREATE INDEX idx_referral_discounts_referrer ON referral_discounts(referrer_user_id);

-- Functions for credit management
CREATE OR REPLACE FUNCTION increment_credits(user_id UUID, amount INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE users SET credits_remaining = credits_remaining + amount WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_credits(user_id UUID, amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  SELECT credits_remaining INTO current_credits FROM users WHERE id = user_id;
  
  IF current_credits >= amount THEN
    UPDATE users SET credits_remaining = credits_remaining - amount WHERE id = user_id;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_discounts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can only see their own data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only see their own avatars" ON avatars
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own videos" ON videos
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own transactions" ON credit_transactions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own purchases" ON formations_purchases
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own referrals" ON referral_discounts
  FOR ALL USING (auth.uid() = referrer_user_id OR auth.uid() = referred_user_id);
