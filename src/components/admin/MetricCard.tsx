'use client';

import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  color: 'green' | 'red' | 'blue' | 'mint' | 'orange';
  subtitle?: string;
  icon?: string;
}

const colorClasses = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    value: 'text-green-600',
    trend: 'text-green-500',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    value: 'text-red-600',
    trend: 'text-red-500',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    value: 'text-blue-600',
    trend: 'text-blue-500',
  },
  mint: {
    bg: 'bg-mint-green/10',
    border: 'border-mint-green/20',
    text: 'text-mint-green',
    value: 'text-mint-green',
    trend: 'text-mint-green/70',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    value: 'text-orange-600',
    trend: 'text-orange-500',
  },
};

const getTrendIcon = (trend: string) => {
  if (trend.startsWith('+')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    );
  } else if (trend.startsWith('-')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
      </svg>
    );
  } else if (trend === 'stable') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  } else if (trend === 'warning') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    );
  }
  return null;
};

export function MetricCard({ title, value, trend, color, subtitle, icon }: MetricCardProps) {
  const classes = colorClasses[color];
  
  return (
    <div className={`${classes.bg} ${classes.border} border rounded-lg p-6 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && <span className="text-lg">{icon}</span>}
            <h3 className={`text-sm font-medium ${classes.text}`}>
              {title}
            </h3>
          </div>
          
          <div className={`text-2xl font-bold ${classes.value} mb-1`}>
            {value}
          </div>
          
          {subtitle && (
            <p className="text-xs text-gray-500 mb-2">
              {subtitle}
            </p>
          )}
          
          {trend && (
            <div className={`flex items-center gap-1 text-xs ${classes.trend}`}>
              {getTrendIcon(trend)}
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}