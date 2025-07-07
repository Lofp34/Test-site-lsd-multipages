'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQ({ items, title = "Questions Fréquentes", description }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-anthracite/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-anthracite/40 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-anthracite/60 transition-colors"
              >
                <h3 className="text-lg font-semibold text-blue-ink dark:text-primary-bg pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-mint-green flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-mint-green flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-anthracite dark:text-primary-bg/80 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schema.org FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": items.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            }, null, 2)
          }}
        />
      </div>
    </section>
  );
}