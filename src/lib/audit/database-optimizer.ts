// Database Query Optimizer for Supabase
// Implements query optimization, indexing suggestions, and connection pooling

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface QueryStats {
  query: string;
  executionTime: number;
  rowsAffected: number;
  timestamp: Date;
  fromCache: boolean;
}

export interface IndexSuggestion {
  table: string;
  columns: string[];
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImprovement: string;
}

export interface DatabaseOptimizerConfig {
  enableQueryCaching: boolean;
  enableQueryProfiling: boolean;
  cacheMaxSize: number;
  cacheTTLMs: number;
  slowQueryThresholdMs: number;
  enableConnectionPooling: boolean;
  maxConnections: number;
  connectionTimeoutMs: number;
}

export class DatabaseOptimizer {
  private config: DatabaseOptimizerConfig;
  private queryCache = new Map<string, { result: any; timestamp: number; ttl: number }>();
  private queryStats: QueryStats[] = [];
  private supabase: SupabaseClient;
  private connectionPool: SupabaseClient[] = [];
  private activeConnections = 0;

  constructor(config?: Partial<DatabaseOptimizerConfig>) {
    this.config = {
      enableQueryCaching: true,
      enableQueryProfiling: true,
      cacheMaxSize: 1000,
      cacheTTLMs: 300000, // 5 minutes
      slowQueryThresholdMs: 1000, // 1 second
      enableConnectionPooling: true,
      maxConnections: 5,
      connectionTimeoutMs: 30000,
      ...config
    };

    // Initialize main Supabase client only if environment variables are available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Initialize connection pool
      if (this.config.enableConnectionPooling) {
        this.initializeConnectionPool();
      }
    } else {
      console.warn('⚠️  Supabase environment variables not found, database optimizer running in mock mode');
      // Create a mock client for testing
      this.supabase = {} as SupabaseClient;
    }
  }

  /**
   * Execute optimized query with caching and profiling
   */
  async executeQuery<T = any>(
    query: string,
    params?: any[],
    options?: {
      enableCache?: boolean;
      cacheTTL?: number;
      tableName?: string;
      operation?: 'select' | 'insert' | 'update' | 'delete';
    }
  ): Promise<{ data: T; fromCache: boolean; executionTime: number }> {
    const {
      enableCache = this.config.enableQueryCaching,
      cacheTTL = this.config.cacheTTLMs,
      tableName = 'unknown',
      operation = 'select'
    } = options || {};

    const cacheKey = this.generateCacheKey(query, params);
    const startTime = Date.now();

    // Check cache for SELECT queries
    if (enableCache && operation === 'select') {
      const cached = this.getCachedResult(cacheKey);
      if (cached) {
        console.log(`💾 Using cached result for query on ${tableName}`);
        return {
          data: cached,
          fromCache: true,
          executionTime: 0
        };
      }
    }

    try {
      // Get connection from pool
      const client = await this.getConnection();
      
      // Execute query
      const { data, error } = await this.executeRawQuery(client, query, params);
      
      if (error) {
        throw new Error(`Database query failed: ${error.message}`);
      }

      const executionTime = Date.now() - startTime;

      // Profile query if enabled
      if (this.config.enableQueryProfiling) {
        this.recordQueryStats({
          query: this.sanitizeQuery(query),
          executionTime,
          rowsAffected: Array.isArray(data) ? data.length : 1,
          timestamp: new Date(),
          fromCache: false
        });
      }

      // Cache result for SELECT queries
      if (enableCache && operation === 'select' && data) {
        this.cacheResult(cacheKey, data, cacheTTL);
      }

      // Log slow queries
      if (executionTime > this.config.slowQueryThresholdMs) {
        console.warn(`🐌 Slow query detected (${executionTime}ms): ${this.sanitizeQuery(query)}`);
      }

      return {
        data,
        fromCache: false,
        executionTime
      };

    } catch (error) {
      console.error('❌ Database query error:', error);
      throw error;
    }
  }

  /**
   * Execute optimized SELECT query with automatic indexing suggestions
   */
  async select<T = any>(
    tableName: string,
    options?: {
      columns?: string[];
      where?: Record<string, any>;
      orderBy?: { column: string; ascending?: boolean }[];
      limit?: number;
      offset?: number;
      enableCache?: boolean;
      cacheTTL?: number;
    }
  ): Promise<{ data: T[]; suggestions: IndexSuggestion[] }> {
    const {
      columns = ['*'],
      where = {},
      orderBy = [],
      limit,
      offset,
      enableCache = true,
      cacheTTL = this.config.cacheTTLMs
    } = options || {};

    // Build query
    let query = this.supabase.from(tableName).select(columns.join(', '));

    // Apply WHERE conditions
    Object.entries(where).forEach(([column, value]) => {
      if (Array.isArray(value)) {
        query = query.in(column, value);
      } else if (typeof value === 'object' && value !== null) {
        // Handle operators like { gte: 100 }, { like: '%test%' }
        Object.entries(value).forEach(([operator, operatorValue]) => {
          query = (query as any)[operator](column, operatorValue);
        });
      } else {
        query = query.eq(column, value);
      }
    });

    // Apply ORDER BY
    orderBy.forEach(({ column, ascending = true }) => {
      query = query.order(column, { ascending });
    });

    // Apply LIMIT and OFFSET
    if (limit) {
      query = query.limit(limit);
    }
    if (offset) {
      query = query.range(offset, offset + (limit || 100) - 1);
    }

    const startTime = Date.now();
    const { data, error } = await query;

    if (error) {
      throw new Error(`Select query failed: ${error.message}`);
    }

    const executionTime = Date.now() - startTime;

    // Generate indexing suggestions
    const suggestions = this.generateIndexSuggestions(tableName, {
      where,
      orderBy,
      executionTime
    });

    // Record stats
    if (this.config.enableQueryProfiling) {
      this.recordQueryStats({
        query: `SELECT ${columns.join(', ')} FROM ${tableName}`,
        executionTime,
        rowsAffected: data?.length || 0,
        timestamp: new Date(),
        fromCache: false
      });
    }

    return { data: data || [], suggestions };
  }

  /**
   * Execute batch operations with optimization
   */
  async executeBatch<T = any>(
    operations: Array<{
      query: string;
      params?: any[];
      tableName?: string;
      operation?: 'select' | 'insert' | 'update' | 'delete';
    }>
  ): Promise<Array<{ data: T; executionTime: number; error?: string }>> {
    console.log(`📦 Executing batch of ${operations.length} operations...`);
    
    const results = [];
    const startTime = Date.now();

    // Group operations by type for optimization
    const groupedOps = this.groupOperationsByType(operations);

    for (const [opType, ops] of Object.entries(groupedOps)) {
      console.log(`Processing ${ops.length} ${opType} operations...`);

      // Process operations with controlled concurrency
      const batchResults = await this.processBatchWithConcurrency(
        ops,
        async (op) => {
          try {
            const result = await this.executeQuery(
              op.query,
              op.params,
              {
                tableName: op.tableName,
                operation: op.operation,
                enableCache: op.operation === 'select'
              }
            );
            return {
              data: result.data,
              executionTime: result.executionTime
            };
          } catch (error) {
            return {
              data: null,
              executionTime: 0,
              error: error instanceof Error ? error.message : String(error)
            };
          }
        },
        3 // Max 3 concurrent operations
      );

      results.push(...batchResults);
    }

    const totalTime = Date.now() - startTime;
    console.log(`✅ Batch completed in ${totalTime}ms`);

    return results;
  }

  /**
   * Get query performance statistics
   */
  getQueryStats(): {
    totalQueries: number;
    averageExecutionTime: number;
    slowQueries: QueryStats[];
    cacheHitRate: number;
    mostFrequentQueries: Array<{ query: string; count: number; avgTime: number }>;
  } {
    const totalQueries = this.queryStats.length;
    const averageExecutionTime = totalQueries > 0
      ? this.queryStats.reduce((sum, stat) => sum + stat.executionTime, 0) / totalQueries
      : 0;

    const slowQueries = this.queryStats.filter(
      stat => stat.executionTime > this.config.slowQueryThresholdMs
    );

    const cachedQueries = this.queryStats.filter(stat => stat.fromCache);
    const cacheHitRate = totalQueries > 0 ? (cachedQueries.length / totalQueries) * 100 : 0;

    // Calculate most frequent queries
    const queryFrequency = new Map<string, { count: number; totalTime: number }>();
    this.queryStats.forEach(stat => {
      const existing = queryFrequency.get(stat.query);
      if (existing) {
        existing.count++;
        existing.totalTime += stat.executionTime;
      } else {
        queryFrequency.set(stat.query, { count: 1, totalTime: stat.executionTime });
      }
    });

    const mostFrequentQueries = Array.from(queryFrequency.entries())
      .map(([query, { count, totalTime }]) => ({
        query,
        count,
        avgTime: totalTime / count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalQueries,
      averageExecutionTime: Math.round(averageExecutionTime),
      slowQueries,
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      mostFrequentQueries
    };
  }

  /**
   * Get indexing recommendations
   */
  getIndexingRecommendations(): IndexSuggestion[] {
    const suggestions: IndexSuggestion[] = [];
    const queryAnalysis = this.analyzeQueryPatterns();

    // Analyze slow queries for indexing opportunities
    const slowQueries = this.queryStats.filter(
      stat => stat.executionTime > this.config.slowQueryThresholdMs
    );

    for (const query of slowQueries) {
      const tableName = this.extractTableName(query.query);
      const whereColumns = this.extractWhereColumns(query.query);
      const orderByColumns = this.extractOrderByColumns(query.query);

      if (whereColumns.length > 0) {
        suggestions.push({
          table: tableName,
          columns: whereColumns,
          reason: `Slow query with WHERE conditions (${query.executionTime}ms)`,
          priority: query.executionTime > 5000 ? 'high' : 'medium',
          estimatedImprovement: `${Math.round((query.executionTime * 0.7) / 1000)}s faster`
        });
      }

      if (orderByColumns.length > 0) {
        suggestions.push({
          table: tableName,
          columns: orderByColumns,
          reason: `Slow query with ORDER BY (${query.executionTime}ms)`,
          priority: 'medium',
          estimatedImprovement: `${Math.round((query.executionTime * 0.5) / 1000)}s faster`
        });
      }
    }

    // Remove duplicates and sort by priority
    const uniqueSuggestions = this.deduplicateIndexSuggestions(suggestions);
    return uniqueSuggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Clear query cache
   */
  clearCache(): void {
    this.queryCache.clear();
    console.log('🗑️  Database query cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    memoryUsage: number;
  } {
    const cachedQueries = this.queryStats.filter(stat => stat.fromCache);
    const hitRate = this.queryStats.length > 0
      ? (cachedQueries.length / this.queryStats.length) * 100
      : 0;

    // Estimate memory usage
    let memoryUsage = 0;
    for (const [key, value] of this.queryCache.entries()) {
      memoryUsage += key.length + JSON.stringify(value).length;
    }

    return {
      size: this.queryCache.size,
      maxSize: this.config.cacheMaxSize,
      hitRate: Math.round(hitRate * 100) / 100,
      memoryUsage: Math.round(memoryUsage / 1024) // KB
    };
  }

  private initializeConnectionPool(): void {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('⚠️  Cannot initialize connection pool without Supabase credentials');
      return;
    }

    for (let i = 0; i < this.config.maxConnections; i++) {
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      this.connectionPool.push(client);
    }
    console.log(`🏊 Database connection pool initialized with ${this.config.maxConnections} connections`);
  }

  private async getConnection(): Promise<SupabaseClient> {
    if (!this.config.enableConnectionPooling || this.connectionPool.length === 0) {
      return this.supabase;
    }

    // Simple round-robin connection selection
    const connection = this.connectionPool[this.activeConnections % this.connectionPool.length];
    this.activeConnections++;
    return connection;
  }

  private async executeRawQuery(
    client: SupabaseClient,
    query: string,
    params?: any[]
  ): Promise<{ data: any; error: any }> {
    // This is a simplified implementation
    // In practice, you'd need to parse the query and use appropriate Supabase methods
    return { data: null, error: null };
  }

  private generateCacheKey(query: string, params?: any[]): string {
    const normalizedQuery = query.replace(/\s+/g, ' ').trim().toLowerCase();
    const paramsStr = params ? JSON.stringify(params) : '';
    return `${normalizedQuery}:${paramsStr}`;
  }

  private getCachedResult(key: string): any {
    const cached = this.queryCache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.result;
    }

    if (cached) {
      this.queryCache.delete(key);
    }

    return null;
  }

  private cacheResult(key: string, result: any, ttl: number): void {
    // Enforce cache size limit
    if (this.queryCache.size >= this.config.cacheMaxSize) {
      const oldestKey = this.queryCache.keys().next().value;
      this.queryCache.delete(oldestKey);
    }

    this.queryCache.set(key, {
      result,
      timestamp: Date.now(),
      ttl
    });
  }

  private recordQueryStats(stats: QueryStats): void {
    this.queryStats.push(stats);
    
    // Keep only recent stats (last 1000 queries)
    if (this.queryStats.length > 1000) {
      this.queryStats.shift();
    }
  }

  private sanitizeQuery(query: string): string {
    // Remove sensitive data from query for logging
    return query.replace(/('[^']*'|"[^"]*")/g, "'***'");
  }

  private generateIndexSuggestions(
    tableName: string,
    queryInfo: {
      where: Record<string, any>;
      orderBy: Array<{ column: string; ascending?: boolean }>;
      executionTime: number;
    }
  ): IndexSuggestion[] {
    const suggestions: IndexSuggestion[] = [];

    // Suggest indexes for WHERE conditions
    const whereColumns = Object.keys(queryInfo.where);
    if (whereColumns.length > 0 && queryInfo.executionTime > 500) {
      suggestions.push({
        table: tableName,
        columns: whereColumns,
        reason: `WHERE conditions on ${whereColumns.join(', ')}`,
        priority: queryInfo.executionTime > 2000 ? 'high' : 'medium',
        estimatedImprovement: `${Math.round(queryInfo.executionTime * 0.6)}ms faster`
      });
    }

    // Suggest indexes for ORDER BY
    const orderByColumns = queryInfo.orderBy.map(o => o.column);
    if (orderByColumns.length > 0 && queryInfo.executionTime > 1000) {
      suggestions.push({
        table: tableName,
        columns: orderByColumns,
        reason: `ORDER BY on ${orderByColumns.join(', ')}`,
        priority: 'medium',
        estimatedImprovement: `${Math.round(queryInfo.executionTime * 0.4)}ms faster`
      });
    }

    return suggestions;
  }

  private groupOperationsByType(
    operations: Array<{
      query: string;
      params?: any[];
      tableName?: string;
      operation?: 'select' | 'insert' | 'update' | 'delete';
    }>
  ): Record<string, typeof operations> {
    const grouped: Record<string, typeof operations> = {};

    operations.forEach(op => {
      const type = op.operation || 'unknown';
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(op);
    });

    return grouped;
  }

  private async processBatchWithConcurrency<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    concurrency: number
  ): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += concurrency) {
      const batch = items.slice(i, i + concurrency);
      const batchResults = await Promise.all(batch.map(processor));
      results.push(...batchResults);
    }

    return results;
  }

  private analyzeQueryPatterns(): any {
    // Analyze query patterns for optimization opportunities
    return {};
  }

  private extractTableName(query: string): string {
    const match = query.match(/FROM\s+(\w+)/i);
    return match ? match[1] : 'unknown';
  }

  private extractWhereColumns(query: string): string[] {
    const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|\s+GROUP\s+BY|$)/i);
    if (!whereMatch) return [];

    const whereClause = whereMatch[1];
    const columnMatches = whereClause.match(/(\w+)\s*[=<>!]/g);
    return columnMatches ? columnMatches.map(match => match.replace(/\s*[=<>!].*/, '')) : [];
  }

  private extractOrderByColumns(query: string): string[] {
    const orderByMatch = query.match(/ORDER\s+BY\s+(.+?)(?:\s+LIMIT|\s+GROUP\s+BY|$)/i);
    if (!orderByMatch) return [];

    const orderByClause = orderByMatch[1];
    return orderByClause.split(',').map(col => col.trim().split(' ')[0]);
  }

  private deduplicateIndexSuggestions(suggestions: IndexSuggestion[]): IndexSuggestion[] {
    const seen = new Set<string>();
    return suggestions.filter(suggestion => {
      const key = `${suggestion.table}:${suggestion.columns.join(',')}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

// Export singleton instance
export const databaseOptimizer = new DatabaseOptimizer();

// Utility functions
export const DatabaseUtils = {
  /**
   * Create an optimized query builder
   */
  createOptimizedQuery<T>(tableName: string) {
    return {
      select: (columns?: string[]) => databaseOptimizer.select<T>(tableName, { columns }),
      
      where: (conditions: Record<string, any>) => ({
        select: (columns?: string[]) => databaseOptimizer.select<T>(tableName, { columns, where: conditions })
      }),
      
      orderBy: (column: string, ascending = true) => ({
        select: (columns?: string[]) => databaseOptimizer.select<T>(tableName, { 
          columns, 
          orderBy: [{ column, ascending }] 
        })
      })
    };
  },

  /**
   * Generate SQL for creating recommended indexes
   */
  generateIndexSQL(suggestions: IndexSuggestion[]): string[] {
    return suggestions.map(suggestion => {
      const indexName = `idx_${suggestion.table}_${suggestion.columns.join('_')}`;
      return `CREATE INDEX IF NOT EXISTS ${indexName} ON ${suggestion.table} (${suggestion.columns.join(', ')});`;
    });
  },

  /**
   * Analyze query performance and suggest optimizations
   */
  analyzeQueryPerformance(query: string, executionTime: number): {
    isOptimal: boolean;
    suggestions: string[];
    severity: 'low' | 'medium' | 'high';
  } {
    const suggestions: string[] = [];
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (executionTime > 5000) {
      severity = 'high';
      suggestions.push('Query is very slow (>5s). Consider adding indexes or optimizing the query structure.');
    } else if (executionTime > 1000) {
      severity = 'medium';
      suggestions.push('Query is slow (>1s). Consider adding indexes for WHERE and ORDER BY columns.');
    }

    if (query.includes('SELECT *')) {
      suggestions.push('Avoid SELECT * - specify only needed columns to reduce data transfer.');
    }

    if (query.includes('LIKE %')) {
      suggestions.push('Leading wildcard LIKE queries cannot use indexes efficiently. Consider full-text search.');
    }

    return {
      isOptimal: suggestions.length === 0,
      suggestions,
      severity
    };
  }
};