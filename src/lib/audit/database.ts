// Database utilities for the audit system
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;
let _supabase: SupabaseClient | null = null;

// Create Supabase client with service role key for admin operations (lazy-loaded)
export const getSupabaseAdmin = (): SupabaseClient => {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabaseAdmin;
};

// Create regular Supabase client for normal operations (lazy-loaded)
export const getSupabase = (): SupabaseClient => {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
};

// Database table types
export interface ScannedLinkRow {
  id: number;
  url: string;
  source_file: string;
  source_line?: number;
  link_type: 'internal' | 'external' | 'download' | 'anchor';
  priority: 'critical' | 'high' | 'medium' | 'low';
  context?: string;
  created_at: string;
  updated_at: string;
}

export interface ValidationResultRow {
  id: number;
  url: string;
  status: 'valid' | 'broken' | 'redirect' | 'timeout' | 'unknown';
  status_code?: number;
  redirect_url?: string;
  error_message?: string;
  response_time: number;
  checked_at: string;
}

export interface ResourceRequestRow {
  id: number;
  requested_url: string;
  user_email: string;
  message?: string;
  source_url: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: number;
  request_count: number;
  created_at: string;
  updated_at: string;
}

export interface AuditHistoryRow {
  id: number;
  total_links: number;
  broken_links: number;
  corrected_links: number;
  seo_score: number;
  report_path?: string;
  execution_time: number;
  created_at: string;
}

// Database operations
export class AuditDatabase {
  // Test database connection
  static async testConnection(): Promise<boolean> {
    try {
      const { error } = await getSupabaseAdmin()
        .from('audit_history')
        .select('count')
        .limit(1);
      
      return !error;
    } catch {
      return false;
    }
  }

  // Insert scanned links
  static async insertScannedLinks(links: Omit<ScannedLinkRow, 'id' | 'created_at' | 'updated_at'>[]): Promise<void> {
    const { error } = await getSupabaseAdmin()
      .from('scanned_links')
      .insert(links);
    
    if (error) {
      throw new Error(`Failed to insert scanned links: ${error.message}`);
    }
  }

  // Insert validation results
  static async insertValidationResults(results: Omit<ValidationResultRow, 'id' | 'checked_at'>[]): Promise<void> {
    const { error } = await getSupabaseAdmin()
      .from('validation_results')
      .insert(results);
    
    if (error) {
      throw new Error(`Failed to insert validation results: ${error.message}`);
    }
  }

  // Insert resource request
  static async insertResourceRequest(request: Omit<ResourceRequestRow, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await getSupabaseAdmin()
      .from('resource_requests')
      .insert(request)
      .select('id')
      .single();
    
    if (error) {
      throw new Error(`Failed to insert resource request: ${error.message}`);
    }
    
    return data.id.toString();
  }

  // Get resource request count for a URL
  static async getResourceRequestCount(url: string): Promise<number> {
    const { data, error } = await getSupabaseAdmin()
      .from('resource_requests')
      .select('request_count')
      .eq('requested_url', url)
      .single();
    
    if (error || !data) {
      return 0;
    }
    
    return data.request_count;
  }

  // Insert audit history
  static async insertAuditHistory(audit: Omit<AuditHistoryRow, 'id' | 'created_at'>): Promise<void> {
    const { error } = await getSupabaseAdmin()
      .from('audit_history')
      .insert(audit);
    
    if (error) {
      throw new Error(`Failed to insert audit history: ${error.message}`);
    }
  }

  // Get latest audit results
  static async getLatestAudit(): Promise<AuditHistoryRow | null> {
    const { data, error } = await getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return data;
  }

  // Clean old data (for maintenance)
  static async cleanOldData(retentionDays: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
    
    // Clean old validation results
    await getSupabaseAdmin()
      .from('validation_results')
      .delete()
      .lt('checked_at', cutoffDate.toISOString());
    
    // Clean old scanned links
    await getSupabaseAdmin()
      .from('scanned_links')
      .delete()
      .lt('created_at', cutoffDate.toISOString());
  }
}