/**
 * Bannière compacte pour signaler une ressource manquante
 * Utilisée dans les pages où une ressource spécifique est attendue mais pas encore disponible
 */

'use client';

import React, { useState } from 'react';
import { AlertTriangle, Send, X } from 'lucide-react';
import ResourceRequestModal from './ResourceRequestModal';

export interface MissingResourceBannerProps {
  resourceUrl: string;
  resourceTitle: string;
  message?: string;
  isDismissible?: boolean;
  variant?: 'warning' | 'info' | 'minimal';
  className?: string;
}

export default function MissingResourceBanner({
  resourceUrl,
  resourceTitle,
  message = 'Cette ressource est en cours de développement.',
  isDismissible = false,
  variant = 'warning',
  className = ''
}: MissingResourceBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isVisible) return null;

  const variantStyles = {
    warning: {
      container: 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800',
      icon: 'text-orange-600 dark:text-orange-400',
      text: 'text-orange-800 dark:text-orange-200',
      button: 'bg-orange-600 hover:bg-orange-700 text-white'
    },
    info: {
      container: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      text: 'text-blue-800 dark:text-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    minimal: {
      container: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
      icon: 'text-gray-600 dark:text-gray-400',
      text: 'text-gray-800 dark:text-gray-200',
      button: 'bg-mint-green hover:bg-mint-green/90 text-white'
    }
  };

  const styles = variantStyles[variant];

  return (
    <>
      <div className={`border rounded-lg p-4 shadow-sm ${styles.container} ${className}`}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle size={20} className={styles.icon} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-sm ${styles.text}`}>
              {resourceTitle}
            </h4>
            <p className={`text-sm mt-1 ${styles.text} opacity-90`}>
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${styles.button}`}
            >
              <Send size={12} />
              Demander
            </button>

            {isDismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className={`p-1.5 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${styles.icon}`}
                aria-label="Masquer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ResourceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceUrl={resourceUrl}
        sourceUrl={typeof window !== 'undefined' ? window.location.href : ''}
        resourceTitle={resourceTitle}
        resourceDescription={message}
      />
    </>
  );
}