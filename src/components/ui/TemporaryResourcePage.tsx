/**
 * Composant de page temporaire pour ressources manquantes
 * 
 * Ce composant affiche une page temporaire informative quand une ressource
 * n'est pas encore disponible, avec possibilité de demander la ressource.
 */

'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Clock, 
  AlertCircle, 
  Mail, 
  Calendar,
  ArrowLeft,
  ExternalLink,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import ResourceRequestModal from './ResourceRequestModal';

export interface TemporaryResourcePageProps {
  /** URL de la ressource manquante */
  resourceUrl: string;
  /** URL de la page source (d'où vient l'utilisateur) */
  sourceUrl: string;
  /** Type de ressource manquante */
  resourceType: 'download' | 'page' | 'guide' | 'tool' | 'template' | 'other';
  /** Titre de la ressource */
  title?: string;
  /** Description de la ressource */
  description?: string;
  /** Date estimée de disponibilité */
  estimatedDate?: string;
  /** Priorité de développement */
  priority?: 'high' | 'medium' | 'low';
  /** Ressources alternatives suggérées */
  alternatives?: Array<{
    title: string;
    url: string;
    description: string;
    type: 'internal' | 'external';
  }>;
  /** Informations sur le développement */
  developmentInfo?: {
    status: 'planned' | 'in_progress' | 'review' | 'testing';
    progress?: number; // 0-100
    lastUpdate?: string;
  };
}

const resourceTypeConfig = {
  download: {
    icon: Download,
    title: 'Téléchargement en développement',
    description: 'Ce fichier est actuellement en cours de création',
    color: 'blue'
  },
  page: {
    icon: FileText,
    title: 'Page en développement',
    description: 'Cette page est actuellement en cours de création',
    color: 'green'
  },
  guide: {
    icon: Lightbulb,
    title: 'Guide en développement',
    description: 'Ce guide est actuellement en cours de rédaction',
    color: 'orange'
  },
  tool: {
    icon: ExternalLink,
    title: 'Outil en développement',
    description: 'Cet outil est actuellement en cours de développement',
    color: 'purple'
  },
  template: {
    icon: FileText,
    title: 'Template en développement',
    description: 'Ce template est actuellement en cours de création',
    color: 'mint'
  },
  other: {
    icon: AlertCircle,
    title: 'Ressource en développement',
    description: 'Cette ressource est actuellement en cours de création',
    color: 'gray'
  }
};

const statusConfig = {
  planned: { label: 'Planifié', color: 'gray', progress: 0 },
  in_progress: { label: 'En cours', color: 'blue', progress: 50 },
  review: { label: 'En révision', color: 'orange', progress: 80 },
  testing: { label: 'En test', color: 'green', progress: 90 }
};

export default function TemporaryResourcePage({
  resourceUrl,
  sourceUrl,
  resourceType,
  title,
  description,
  estimatedDate,
  priority = 'medium',
  alternatives = [],
  developmentInfo
}: TemporaryResourcePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const config = resourceTypeConfig[resourceType];
  const IconComponent = config.icon;
  
  const priorityColors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-orange-600 bg-orange-50 border-orange-200',
    low: 'text-green-600 bg-green-50 border-green-200'
  };

  const priorityLabels = {
    high: 'Priorité élevée',
    medium: 'Priorité moyenne',
    low: 'Priorité faible'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-bg via-white to-primary-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href={sourceUrl}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-ink transition-colors"
            >
              <ArrowLeft size={16} />
              Retour à la page précédente
            </Link>
          </div>
          
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${config.color}-100`}>
              <IconComponent size={32} className={`text-${config.color}-600`} />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-ink mb-2">
                {title || config.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {description || config.description}
              </p>
              
              {/* Status and Priority */}
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[priority]}`}>
                  <Clock size={14} />
                  {priorityLabels[priority]}
                </span>
                
                {developmentInfo && (
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border text-${statusConfig[developmentInfo.status].color}-600 bg-${statusConfig[developmentInfo.status].color}-50 border-${statusConfig[developmentInfo.status].color}-200`}>
                    {statusConfig[developmentInfo.status].label}
                  </span>
                )}
                
                {estimatedDate && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border text-blue-600 bg-blue-50 border-blue-200">
                    <Calendar size={14} />
                    Prévu pour {estimatedDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Development Progress */}
            {developmentInfo && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-blue-ink mb-4 flex items-center gap-2">
                  <Clock size={20} />
                  État du développement
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Statut : {statusConfig[developmentInfo.status].label}
                    </span>
                    {developmentInfo.progress !== undefined && (
                      <span className="text-sm text-gray-500">
                        {developmentInfo.progress}% complété
                      </span>
                    )}
                  </div>
                  
                  {developmentInfo.progress !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${statusConfig[developmentInfo.status].color}-500 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${developmentInfo.progress}%` }}
                      />
                    </div>
                  )}
                  
                  {developmentInfo.lastUpdate && (
                    <p className="text-sm text-gray-500">
                      Dernière mise à jour : {developmentInfo.lastUpdate}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Resource Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-blue-ink mb-4">
                À propos de cette ressource
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-ink mb-2">
                        Pourquoi cette ressource n'est-elle pas disponible ?
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Cette ressource fait partie de notre plan de développement continu. 
                        Nous créons régulièrement de nouveaux contenus basés sur les besoins 
                        exprimés par notre communauté et les évolutions du marché.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-ink mb-2">Type de ressource</h4>
                    <p className="text-sm text-blue-700">{config.title}</p>
                  </div>
                  
                  <div className="p-4 bg-mint-green/10 rounded-lg border border-mint-green/20">
                    <h4 className="font-semibold text-blue-ink mb-2">URL demandée</h4>
                    <p className="text-sm text-gray-600 break-all font-mono">
                      {resourceUrl}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-blue-ink mb-4">
                  Ressources alternatives
                </h2>
                
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    En attendant, voici quelques ressources qui pourraient vous intéresser :
                  </p>
                  
                  <div className="grid gap-4">
                    {alternatives.map((alt, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-mint-green/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-blue-ink mb-1">
                              {alt.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {alt.description}
                            </p>
                          </div>
                          
                          <Link
                            href={alt.url}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              alt.type === 'external' 
                                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                                : 'text-mint-green bg-mint-green/10 hover:bg-mint-green/20'
                            }`}
                            {...(alt.type === 'external' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            Voir
                            {alt.type === 'external' && <ExternalLink size={14} />}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Resource CTA */}
            <div className="bg-gradient-to-br from-mint-green/10 to-mint-green/5 rounded-2xl border border-mint-green/20 p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-mint-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-mint-green" />
                </div>
                
                <h3 className="text-lg font-bold text-blue-ink mb-2">
                  Demander cette ressource
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  Signalez votre intérêt pour accélérer le développement de cette ressource.
                </p>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-mint-green text-white font-semibold py-3 px-4 rounded-lg hover:bg-mint-green/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Faire une demande
                </button>
                
                <p className="text-xs text-gray-500 mt-3">
                  Vous recevrez une notification dès que la ressource sera disponible.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-blue-ink mb-4">
                Besoin d'aide ?
              </h3>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Si vous avez des questions spécifiques ou besoin d'une solution immédiate, 
                  n'hésitez pas à me contacter directement.
                </p>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-ink hover:text-mint-green transition-colors"
                >
                  <Mail size={16} />
                  Contacter Laurent Serre
                </Link>
              </div>
            </div>

            {/* Development Timeline */}
            {estimatedDate && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-blue-ink mb-4">
                  Planning de développement
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-mint-green rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Disponibilité prévue : {estimatedDate}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">
                      Notification automatique par email
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resource Request Modal */}
      <ResourceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceUrl={resourceUrl}
        sourceUrl={sourceUrl}
        resourceTitle={title || config.title}
        resourceDescription={description || config.description}
      />
    </div>
  );
}