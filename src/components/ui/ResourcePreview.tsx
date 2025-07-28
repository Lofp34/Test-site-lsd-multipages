'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, FileText, Eye, Star } from 'lucide-react';
import NegotiationButton from './NegotiationButton';

interface ResourcePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    title: string;
    description: string;
    format: string;
    pages: number;
    size: string;
    preview: string;
    highlights: string[];
  };
  onDownload: (resourceId: string) => void;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({
  isOpen,
  onClose,
  resource,
  onDownload
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    onDownload(resource.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white dark:bg-blue-ink rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-ink dark:text-white">
                {resource.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-primary-secondary/70">
                <span>{(resource.format || 'PDF').toUpperCase()}</span>
                <span>{resource.pages} pages</span>
                <span>{resource.size}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Preview Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 h-full">
              {/* Simulation d'un aperçu PDF */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h1 className="text-2xl font-bold text-blue-ink dark:text-white mb-2">
                    {resource.title}
                  </h1>
                  <p className="text-primary-secondary/80">
                    Guide pratique par Laurent Serre
                  </p>
                </div>

                <div className="space-y-4 text-sm text-primary-secondary/90">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold mb-2">Introduction</h3>
                    <p>
                      Cette technique révolutionnaire, développée par Chris Voss lors de ses négociations 
                      avec des preneurs d'otages, transforme votre approche de la négociation commerciale...
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold mb-2">Sommaire</h3>
                    <ul className="space-y-1">
                      <li>• Chapitre 1: Les fondements psychologiques</li>
                      <li>• Chapitre 2: Préparation mentale et ancrage</li>
                      <li>• Chapitre 3: L'art du refus empathique</li>
                      <li>• Chapitre 4: Alternatives créatives</li>
                      <li>• Chapitre 5: Cas pratiques PME</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-amber-800 dark:text-amber-300">
                        Aperçu limité
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Ceci est un aperçu. Téléchargez la ressource complète pour accéder 
                      à tous les scripts, exemples et cas pratiques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicateur de pages */}
              <div className="text-center text-sm text-primary-secondary/60">
                Page 1 sur {resource.pages}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-ink dark:text-white mb-3">
                Points clés de cette ressource
              </h4>
              <div className="space-y-3">
                {resource.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-primary-secondary/90">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 p-4 bg-white dark:bg-blue-ink rounded-xl border border-gray-200 dark:border-gray-700">
              <h5 className="font-semibold text-blue-ink dark:text-white mb-2">
                Créé par Laurent Serre
              </h5>
              <p className="text-sm text-primary-secondary/80 mb-3">
                Expert en développement commercial PME avec 20 ans d'expérience terrain
              </p>
              <div className="flex items-center gap-2 text-xs text-primary-secondary/60">
                <span>✓ 500+ négociations</span>
                <span>✓ Résultats prouvés</span>
              </div>
            </div>

            <div className="space-y-3">
              <NegotiationButton
                variant="primary"
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger maintenant
              </NegotiationButton>
              
              <button
                onClick={onClose}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Fermer l'aperçu
              </button>
            </div>

            <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
                <span className="text-green-600">🎁</span>
                <span className="font-medium">Ressource gratuite</span>
              </div>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                Aucune carte de crédit requise
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcePreview;