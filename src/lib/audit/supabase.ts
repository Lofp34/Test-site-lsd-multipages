// Supabase client configuration for audit system
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;

// Service role client for server-side operations (lazy-loaded)
export const supabaseAdmin = (): SupabaseClient => {
  if (!_supabaseAdmin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(`Missing Supabase environment variables: ${!supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : ''} ${!supabaseServiceKey ? 'SUPABASE_SERVICE_ROLE_KEY' : ''}`);
    }

    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  
  return _supabaseAdmin;
};

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      scanned_links: {
        Row: {
          id: number;
          url: string;
          source_file: string;
          source_line: number | null;
          link_type: 'internal' | 'external' | 'download' | 'anchor';
          priority: 'critical' | 'high' | 'medium' | 'low';
          context: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          url: string;
          source_file: string;
          source_line?: number | null;
          link_type: 'internal' | 'external' | 'download' | 'anchor';
          priority: 'critical' | 'high' | 'medium' | 'low';
          context?: string | null;
        };
        Update: {
          url?: string;
          source_file?: string;
          source_line?: number | null;
          link_type?: 'internal' | 'external' | 'download' | 'anchor';
          priority?: 'critical' | 'high' | 'medium' | 'low';
          context?: string | null;
          updated_at?: string;
        };
      };
      validation_results: {
        Row: {
          id: number;
          url: string;
          status: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown';
          status_code: number | null;
          redirect_url: string | null;
          error_message: string | null;
          response_time: number;
          checked_at: string;
        };
        Insert: {
          url: string;
          status: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown';
          status_code?: number | null;
          redirect_url?: string | null;
          error_message?: string | null;
          response_time: number;
        };
        Update: {
          url?: string;
          status?: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown';
          status_code?: number | null;
          redirect_url?: string | null;
          error_message?: string | null;
          response_time?: number;
        };
      };
      applied_corrections: {
        Row: {
          id: number;
          original_url: string;
          corrected_url: string;
          file_path: string;
          correction_type: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar';
          confidence: number | null;
          rollback_id: string | null;
          applied_at: string;
          rollback_data: any | null;
        };
        Insert: {
          original_url: string;
          corrected_url: string;
          file_path: string;
          correction_type: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar';
          confidence?: number | null;
          rollback_id?: string | null;
          rollback_data?: any | null;
        };
        Update: {
          original_url?: string;
          corrected_url?: string;
          file_path?: string;
          correction_type?: 'typo' | 'extension' | 'redirect' | 'moved' | 'similar';
          confidence?: number | null;
          rollback_id?: string | null;
          rollback_data?: any | null;
        };
      };
      resource_requests: {
        Row: {
          id: number;
          requested_url: string;
          user_email: string;
          message: string | null;
          source_url: string;
          status: 'pending' | 'in_progress' | 'completed' | 'rejected';
          priority: number;
          request_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          requested_url: string;
          user_email: string;
          message?: string | null;
          source_url: string;
          status?: 'pending' | 'in_progress' | 'completed' | 'rejected';
          priority?: number;
          request_count?: number;
        };
        Update: {
          requested_url?: string;
          user_email?: string;
          message?: string | null;
          source_url?: string;
          status?: 'pending' | 'in_progress' | 'completed' | 'rejected';
          priority?: number;
          request_count?: number;
          updated_at?: string;
        };
      };
      audit_history: {
        Row: {
          id: number;
          total_links: number | null;
          broken_links: number | null;
          corrected_links: number | null;
          seo_score: number | null;
          report_path: string | null;
          execution_time: number | null;
          created_at: string;
        };
        Insert: {
          total_links?: number | null;
          broken_links?: number | null;
          corrected_links?: number | null;
          seo_score?: number | null;
          report_path?: string | null;
          execution_time?: number | null;
        };
        Update: {
          total_links?: number | null;
          broken_links?: number | null;
          corrected_links?: number | null;
          seo_score?: number | null;
          report_path?: string | null;
          execution_time?: number | null;
        };
      };
      link_health_metrics: {
        Row: {
          id: number;
          date: string;
          total_links: number | null;
          broken_links: number | null;
          health_score: number | null;
          response_time_avg: number | null;
          created_at: string;
        };
        Insert: {
          date: string;
          total_links?: number | null;
          broken_links?: number | null;
          health_score?: number | null;
          response_time_avg?: number | null;
        };
        Update: {
          date?: string;
          total_links?: number | null;
          broken_links?: number | null;
          health_score?: number | null;
          response_time_avg?: number | null;
        };
      };
    };
  };
}