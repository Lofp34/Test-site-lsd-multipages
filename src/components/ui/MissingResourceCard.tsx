/**
 * Composant pour afficher une ressource manquante avec option de demande
 */

'use client';

import React, { useState } from 'react';
import { FileX, Clock, Send, AlertTriangle } from 'lucide-react';
import ResourceRequestModal from './ResourceRequestModal';

export interface MissingResourceCardProps {
  resourceUrl: string;
  resourceTitle: string;
  resourceDescription?: string;
  expectedAvailability?: string;
  category?: string;
  sourceUrl?: string;
  className?: string;
}

export default function MissingResourceCard({
  resourceUrl,
  resourceTitle,
  resourceDescription,
  expectedAvailability,
  category,
  sourceUrl,
  className = ''
}: MissingResourceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestResource = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 
        border border-orange-200 dark:border-orange-800 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
        
        {/* Header with icon */}
        <div className="flex items-start gap-3 md:gap-4 mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileX size={20} className="md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-blue-ink dark:text-white text-base md:text-lg mb-1">
              {resourceTitle}
            </h3>
            {category && (
              <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">
                {category}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {resourceDescription && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
            {resourceDescription}
          </p>
        )}

        {/* Status */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-orange-200/50 dark:border-orange-800/50">
          <Clock size={16} className="text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
            Ressource en développement
          </span>
        </div>

        {/* Expected availability */}
        {expectedAvailability && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <strong>Disponibilité prévue :</strong> {expectedAvailability}
            </p>
          </div>
        )}

        {/* Action button */}
        <button
          onClick={handleRequestResource}
          className="w-full bg-mint-green hover:bg-mint-green/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Send size={16} />
          Demander cette ressource
        </button>

        {/* Info note */}
        <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <AlertTriangle size={14} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            En demandant cette ressource, vous serez automatiquement notifié par email dès qu'elle sera disponible.
          </p>
        </div>
      </div>

      {/* Modal */}
      <ResourceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceUrl={resourceUrl}
        sourceUrl={sourceUrl || (typeof window !== 'undefined' ? window.location.href : '')}
        resourceTitle={resourceTitle}
        resourceDescription={resourceDescription}
      />
    </>
  );
}