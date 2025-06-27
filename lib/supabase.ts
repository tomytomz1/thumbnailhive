import { createBrowserClient } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Client-side Supabase client
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// Types matching your actual database schema
export type Database = {
  public: {
    Tables: {
      thumbnails: {
        Row: {
          id: number
          user_id: string
          title: string
          niche: string
          thumbnail_url: string
          ctr_score: number
          mobile_score: number
          heatmap_url: string | null
          emotion_used: string
          ab_test_id: string | null
          variation_index: number
          niche_context: any
          optimization_suggestions: any
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          niche: string
          thumbnail_url: string
          ctr_score?: number
          mobile_score?: number
          heatmap_url?: string | null
          emotion_used?: string
          ab_test_id?: string | null
          variation_index?: number
          niche_context?: any
          optimization_suggestions?: any
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          niche?: string
          thumbnail_url?: string
          ctr_score?: number
          mobile_score?: number
          heatmap_url?: string | null
          emotion_used?: string
          ab_test_id?: string | null
          variation_index?: number
          niche_context?: any
          optimization_suggestions?: any
          created_at?: string
        }
      }
      niche_intelligence: {
        Row: {
          id: number
          niche: string
          optimization_keywords: string
          trending_style: string
          avg_ctr_benchmark: number
          best_colors: any
          trending_layouts: any
          updated_at: string
        }
        Insert: {
          id?: number
          niche: string
          optimization_keywords?: string
          trending_style?: string
          avg_ctr_benchmark?: number
          best_colors?: any
          trending_layouts?: any
          updated_at?: string
        }
        Update: {
          id?: number
          niche?: string
          optimization_keywords?: string
          trending_style?: string
          avg_ctr_benchmark?: number
          best_colors?: any
          trending_layouts?: any
          updated_at?: string
        }
      }
      user_brands: {
        Row: {
          id: number
          user_id: string
          brand_colors: any
          brand_fonts: any
          style_guidelines: string | null
          logo_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          brand_colors?: any
          brand_fonts?: any
          style_guidelines?: string | null
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          brand_colors?: any
          brand_fonts?: any
          style_guidelines?: string | null
          logo_url?: string | null
          created_at?: string
        }
      }
      ab_test_results: {
        Row: {
          id: number
          test_id: string
          user_id: string
          video_title: string | null
          thumbnail_urls: any
          winner_variation: number | null
          test_status: string
          performance_data: any
          created_at: string
        }
        Insert: {
          id?: number
          test_id: string
          user_id: string
          video_title?: string | null
          thumbnail_urls?: any
          winner_variation?: number | null
          test_status?: string
          performance_data?: any
          created_at?: string
        }
        Update: {
          id?: number
          test_id?: string
          user_id?: string
          video_title?: string | null
          thumbnail_urls?: any
          winner_variation?: number | null
          test_status?: string
          performance_data?: any
          created_at?: string
        }
      }
      ab_test_variations: {
        Row: {
          id: number
          test_id: string
          variation_index: number
          thumbnail_url: string
          ctr: number
          views: number
          impressions: number
          performance_data: any
          created_at: string
        }
        Insert: {
          id?: number
          test_id: string
          variation_index: number
          thumbnail_url: string
          ctr?: number
          views?: number
          impressions?: number
          performance_data?: any
          created_at?: string
        }
        Update: {
          id?: number
          test_id?: string
          variation_index?: number
          thumbnail_url?: string
          ctr?: number
          views?: number
          impressions?: number
          performance_data?: any
          created_at?: string
        }
      }
    }
  }
} 