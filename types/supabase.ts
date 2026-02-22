export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          credits: number
          created_at: string
          updated_at: string
          stripe_customer_id: string | null
          subscription_status: 'active' | 'canceled' | 'past_due' | 'unpaid' | null
          subscription_plan: 'monthly' | 'yearly' | null
          subscription_current_period_end: string | null
          referral_code: string | null
          referred_by: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | null
          subscription_plan?: 'monthly' | 'yearly' | null
          subscription_current_period_end?: string | null
          referral_code?: string | null
          referred_by?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | null
          subscription_plan?: 'monthly' | 'yearly' | null
          subscription_current_period_end?: string | null
          referral_code?: string | null
          referred_by?: string | null
        }
      }
      avatars: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          status: 'pending' | 'processing' | 'completed' | 'failed'
          photo_url: string | null
          model_id: string | null
          preview_url: string | null
          created_at: string
          updated_at: string
          credits_used: number
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          photo_url?: string | null
          model_id?: string | null
          preview_url?: string | null
          created_at?: string
          updated_at?: string
          credits_used?: number
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          photo_url?: string | null
          model_id?: string | null
          preview_url?: string | null
          created_at?: string
          updated_at?: string
          credits_used?: number
        }
      }
      videos: {
        Row: {
          id: string
          user_id: string
          avatar_id: string
          title: string
          description: string | null
          status: 'pending' | 'processing' | 'completed' | 'failed'
          source_url: string | null
          source_type: 'url' | 'upload'
          duration_type: 'short' | 'long'
          formation_id: string | null
          video_url_low: string | null
          video_url_hd: string | null
          thumbnail_url: string | null
          created_at: string
          updated_at: string
          credits_used: number
        }
        Insert: {
          id?: string
          user_id: string
          avatar_id: string
          title: string
          description?: string | null
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          source_url?: string | null
          source_type: 'url' | 'upload'
          duration_type: 'short' | 'long'
          formation_id?: string | null
          video_url_low?: string | null
          video_url_hd?: string | null
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
          credits_used?: number
        }
        Update: {
          id?: string
          user_id?: string
          avatar_id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          source_url?: string | null
          source_type?: 'url' | 'upload'
          duration_type?: 'short' | 'long'
          formation_id?: string | null
          video_url_low?: string | null
          video_url_hd?: string | null
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
          credits_used?: number
        }
      }
      credit_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'purchase' | 'usage' | 'refund' | 'bonus' | 'subscription'
          description: string
          avatar_id: string | null
          video_id: string | null
          stripe_payment_intent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'purchase' | 'usage' | 'refund' | 'bonus' | 'subscription'
          description: string
          avatar_id?: string | null
          video_id?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'purchase' | 'usage' | 'refund' | 'bonus' | 'subscription'
          description?: string
          avatar_id?: string | null
          video_id?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid'
          plan: 'monthly' | 'yearly'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid'
          plan: 'monthly' | 'yearly'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          stripe_price_id?: string
          status?: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid'
          plan?: 'monthly' | 'yearly'
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      formations_purchases: {
        Row: {
          id: string
          user_id: string
          formation_name: 'DSA' | 'ASA' | 'Code Liberté'
          formation_price: number
          discount_amount: number
          verified: boolean
          purchase_proof_url: string | null
          verified_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          formation_name: 'DSA' | 'ASA' | 'Code Liberté'
          formation_price: number
          discount_amount: number
          verified?: boolean
          purchase_proof_url?: string | null
          verified_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          formation_name?: 'DSA' | 'ASA' | 'Code Liberté'
          formation_price?: number
          discount_amount?: number
          verified?: boolean
          purchase_proof_url?: string | null
          verified_at?: string | null
          created_at?: string
        }
      }
      referral_discounts: {
        Row: {
          id: string
          referrer_id: string
          referred_id: string
          discount_amount: number
          applied: boolean
          applied_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_id: string
          discount_amount?: number
          applied?: boolean
          applied_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_id?: string
          discount_amount?: number
          applied?: boolean
          applied_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type User = Tables<'users'>
export type Avatar = Tables<'avatars'>
export type Video = Tables<'videos'>
export type CreditTransaction = Tables<'credit_transactions'>
export type Subscription = Tables<'subscriptions'>
export type FormationPurchase = Tables<'formations_purchases'>
export type ReferralDiscount = Tables<'referral_discounts'>
