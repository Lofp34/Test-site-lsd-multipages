/**
 * Composant pour gérer les ressources manquantes
 * 
 * Ce composant détecte automatiquement les ressources manquantes et affiche
 * soit une page temporaire, soit un message inline selon le contexte.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Download, FileText, ExternalLink } from 'lucide-react';
import TemporaryResourcePage from './TemporaryResourcePage';
import ResourceRequestModal from './ResourceRequestModal';

export interface MissingResourceHandlerProps {
  /** URL de la ressource manquante */
  resourceUrl: string;
  /** URL de la page source */
  sourceUrl?: string;
  /** Type d'affichage */
  displayMode?: 'page' | 'inline' | 'modal';
  /** Type de ressource */
  resourceType?: 'download' | 'page' | 'guide' | 'tool' | 'template' | 'other';
  /** Titre personnalisé */
  title?: string;
  /** Description personnalisée */
  description?: string;
  /** Texte du bouton d'action */
  actionText?: string;
  /** Callback quand l'utilisateur clique sur l'action */
  onAction?: () => void;
  /** Alternatives suggérées */
  alternatives?: Array<{
    title: string;
    url: string;
    description: string;
    type: 'internal' | 'external';
  }>;
  /** Classe CSS personnalisée */
  className?: string;
}

/**
 * Détecte le type de ressource basé sur l'URL
 */
function detectResourceType(url: string): 'download' | 'page' | 'guide' | 'tool' | 'template' | 'other' {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('/download') || lowerUrl.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/)) {
    return 'download';
  }
  
  if (lowerUrl.includes('/guide') || lowerUrl.includes('/guides')) {
    return 'guide';
  }
  
  if (lowerUrl.includes('/tool') || lowerUrl.includes('/outils')) {
    return 'tool';
  }
  
  if (lowerUrl.includes('/template') || lowerUrl.includes('/modele')) {
    return 'template';
  }
  
  if (lowerUrl.includes('/page') || lowerUrl.startsWith('/')) {
    return 'page';
  }
  
  return 'other';
}

/**
 * Génère un titre basé sur l'URL et le type
 */
function generateTitle(url: string, type: string): string {
  const segments = url.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'ressource';
  
  // Nettoyer et formater le nom
  const cleanName = lastSegment
    .replace(/[-_]/g, ' ')
    .replace(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const typeLabels = {
    download: 'Téléchargement',
    page: 'Page',
    guide: 'Guide',
    tool: 'Outil',
    template: 'Template',
    other: 'Ressource'
  };
  
  return `${typeLabels[type as keyof typeof typeLabels]} : ${cleanName}`;
}

/**
 * Composant inline pour ressource manquante
 */
function InlineMissingResource({
  resourceUrl,
  sourceUrl,
  resourceType,
  title,
  description,
  actionText,
  onAction,
  className = ''
}: Omit<MissingResourceHandlerProps, 'displayMode'>) {
  const [showModal, setShowModal] = useState(false);
  
  const detectedType = resourceType || detectResourceType(resourceUrl);
  const generatedTitle = title || generateTitle(resourceUrl, detectedType);
  
  const typeIcons = {
    download: Download,
    page: FileText,
    guide: FileText,
    tool: ExternalLink,
    template: FileText,
    other: AlertCircle
  };
  
  const IconComponent = typeIcons[detectedType];
  
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      setShowModal(true);
    }
  };
  
  return (
    <>
      <div className={`bg-orange-50 border border-orange-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <IconComponent size={16} className="text-orange-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-orange-800 text-sm mb-1">
              {generatedTitle}
            </h3>
            
            <p className="text-orange-700 text-xs mb-3">
              {description || 'Cette ressource est actuellement en développement et sera disponible prochainement.'}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAction}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-xs font-medium rounded hover:bg-orange-700 transition-colors"
              >
                {actionText || 'Demander cette ressource'}
              </button>
              
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white text-orange-600 text-xs font-medium rounded border border-orange-200 hover:bg-orange-50 transition-colors"
                >
                  Retour
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <ResourceRequestModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          resourceUrl={resourceUrl}
          sourceUrl={sourceUrl || window.location.href}
          resourceTitle={generatedTitle}
          resourceDescription={description}
        />
      )}
    </>
  );
}

/**
 * Composant principal
 */
export default function MissingResourceHandler({
  resourceUrl,
  sourceUrl,
  displayMode = 'inline',
  resourceType,
  title,
  description,
  actionText,
  onAction,
  alternatives = [],
  className
}: MissingResourceHandlerProps) {
  const [currentSourceUrl, setCurrentSourceUrl] = useState(sourceUrl);
  
  // Détecter l'URL source si non fournie
  useEffect(() => {
    if (!sourceUrl && typeof window !== 'undefined') {
      setCurrentSourceUrl(window.location.href);
    }
  }, [sourceUrl]);
  
  const detectedType = resourceType || detectResourceType(resourceUrl);
  const generatedTitle = title || generateTitle(resourceUrl, detectedType);
  
  // Mode page complète
  if (displayMode === 'page') {
    return (
      <TemporaryResourcePage
        resourceUrl={resourceUrl}
        sourceUrl={currentSourceUrl || '/'}
        resourceType={detectedType}
        title={generatedTitle}
        description={description}
        alternatives={alternatives}
      />
    );
  }
  
  // Mode inline
  return (
    <InlineMissingResource
      resourceUrl={resourceUrl}
      sourceUrl={currentSourceUrl}
      resourceType={detectedType}
      title={generatedTitle}
      description={description}
      actionText={actionText}
      onAction={onAction}
      className={className}
    />
  );
}

/**
 * Hook pour détecter les ressources manquantes
 */
export function useMissingResourceDetection() {
  const [missingResources, setMissingResources] = useState<string[]>([]);
  
  const checkResource = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };
  
  const addMissingResource = (url: string) => {
    setMissingResources(prev => 
      prev.includes(url) ? prev : [...prev, url]
    );
  };
  
  const removeMissingResource = (url: string) => {
    setMissingResources(prev => prev.filter(u => u !== url));
  };
  
  return {
    missingResources,
    checkResource,
    addMissingResource,
    removeMissingResource
  };
}

/**
 * Composant wrapper pour les liens qui peuvent être manquants
 */
export function SafeResourceLink({
  href,
  children,
  fallbackTitle,
  fallbackDescription,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  className?: string;
  [key: string]: any;
}) {
  const [isMissing, setIsMissing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const checkLink = async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    try {
      const response = await fetch(href, { method: 'HEAD' });
      if (!response.ok) {
        setIsMissing(true);
      }
    } catch {
      setIsMissing(true);
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    checkLink();
  };
  
  if (isMissing) {
    return (
      <MissingResourceHandler
        resourceUrl={href}
        displayMode="inline"
        title={fallbackTitle}
        description={fallbackDescription}
        className="my-2"
      />
    );
  }
  
  return (
    <a
      href={href}
      className={className}
      onClick={isChecking ? handleClick : undefined}
      {...props}
    >
      {children}
    </a>
  );
}