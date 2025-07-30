import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client pour les opérations côté client (avec RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client pour les opérations côté serveur (bypass RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types pour TypeScript
export interface ScannedLink {
  id: number
  url: string
  source_file: string
  source_line?: number
  link_type: 'internal' | 'external' | 'download' | 'anchor'
  priority: 'critical' | 'high' | 'medium' | 'low'
  context?: string
  created_at: string
  updated_at: string
}

export interface ValidationResult {
  id: number
  url: string
  status: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown'
  status_code?: number
  redirect_url?: string
  error_message?: string
  response_time?: number
  checked_at: string
}

export interface AppliedCorrection {
  id: number
  original_url: string
  corrected_url: string
  file_path: string
  correction_type: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar'
  confidence?: number
  rollback_id?: string
  applied_at: string
  rollback_data?: any
}

export interface ResourceRequest {
  id: number
  requested_url: string
  user_email: string
  message?: string
  source_url: string
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  priority: number
  request_count: number
  created_at: string
  updated_at: string
}

export interface AuditHistory {
  id: number
  total_links: number
  broken_links: number
  corrected_links: number
  seo_score?: number
  report_path?: string
  execution_time?: number
  created_at: string
}

export interface LinkHealthMetrics {
  id: number
  date: string
  total_links: number
  broken_links: number
  health_score?: number
  response_time_avg?: number
  created_at: string
}