import React from 'react';
import ComparisonTable from '@/components/ui/ComparisonTable';
import { enterpriseAccountCategory } from '@/data/books-enriched';

export default function TestComparisonTablePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-mint-green/10 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-ink mb-8 text-center">
          Test ComparisonTable Component
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-ink mb-4">
            Enterprise & Accounts Category
          </h2>
          <ComparisonTable 
            books={enterpriseAccountCategory.books} 
            category="enterprise-account" 
          />
        </div>
      </div>
    </div>
  );
}