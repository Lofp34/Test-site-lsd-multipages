'use client';

import React, { useState } from 'react';
import { Download, Mail, FileText, CheckCircle, X } from 'lucide-react';
import { 
  getResourcesByTechnique, 
  generateDownloadUrl, 
  trackDownload,
  type DownloadResource 
} from '@/utils/negotiation/download-tracking';

interface DownloadSectionProps {
  techniqueId: string;
  techniqueName: string;
}

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  resource: DownloadResource | null;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSubmit, resource }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !resource) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email);
      setEmail('');
      onClose();
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-mint-green" />
          </div>
          <h3 className="text-xl font-title font-bold text-blue-ink mb-2">
            Télécharger votre ressource
          </h3>
          <p className="text-gray-600 text-sm">
            Recevez <strong>{resource.title}</strong> directement par email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Votre adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="bg-mint-green/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-mint-green mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Ce que vous recevrez :</p>
                <ul className="space-y-1 text-xs">
                  <li>• {resource.title} ({resource.fileSize})</li>
                  <li>• Conseils d'application pratique</li>
                  <li>• Accès aux prochaines ressources</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-mint-green text-white rounded-lg hover:bg-mint-green/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi...' : 'Télécharger'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Vos données sont protégées. Pas de spam, désinscription facile.
        </p>
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{
  resource: DownloadResource;
  onDownload: (resource: DownloadResource) => void;
}> = ({ resource, onDownload }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'Excel': return '📊';
      case 'Word': return '📝';
      case 'PowerPoint': return '📋';
      default: return '📁';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'checklist': return 'bg-green-100 text-green-800';
      case 'template': return 'bg-purple-100 text-purple-800';
      case 'script': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getTypeIcon(resource.type)}</span>
          <div>
            <h3 className="font-title font-bold text-blue-ink mb-1">{resource.title}</h3>
            <p className="text-sm text-gray-600">{resource.fileSize} • {resource.type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(resource.category)}`}>
          {resource.category}
        </span>
      </div>

      <p className="text-gray-700 mb-6 text-sm leading-relaxed">
        {resource.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Mis à jour le {new Date(resource.lastUpdated).toLocaleDateString('fr-FR')}
        </span>
        <button
          onClick={() => onDownload(resource)}
          className="bg-mint-green text-white px-6 py-2 rounded-lg font-medium hover:bg-mint-green/90 transition-colors text-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {resource.requiresEmail ? 'Télécharger' : 'Télécharger'}
        </button>
      </div>
    </div>
  );
};

const DownloadSection: React.FC<DownloadSectionProps> = ({ techniqueId, techniqueName }) => {
  const [selectedResource, setSelectedResource] = useState<DownloadResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadedResources, setDownloadedResources] = useState<Set<string>>(new Set());

  const resources = getResourcesByTechnique(techniqueId);

  if (resources.length === 0) {
    return null;
  }

  const handleDownload = (resource: DownloadResource) => {
    if (resource.requiresEmail) {
      setSelectedResource(resource);
      setIsModalOpen(true);
    } else {
      // Téléchargement direct
      const url = generateDownloadUrl(resource.id, undefined, 'technique-page');
      window.open(url, '_blank');
      setDownloadedResources(prev => new Set([...prev, resource.id]));
    }
  };

  const handleEmailSubmit = async (email: string) => {
    if (!selectedResource) return;

    try {
      // Générer l'URL de téléchargement avec tracking
      const url = generateDownloadUrl(selectedResource.id, email, 'technique-page');
      
      // Simuler l'envoi d'email (en production, ceci appellerait votre API)
      console.log('Sending email to:', email, 'with resource:', selectedResource.id);
      
      // Ouvrir le téléchargement
      window.open(url, '_blank');
      
      // Marquer comme téléchargé
      setDownloadedResources(prev => new Set([...prev, selectedResource.id]));
      
      // Afficher un message de succès
      alert('Ressource envoyée ! Vérifiez votre boîte email.');
      
    } catch (error) {
      console.error('Error processing download:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-mint-green/5 to-blue-ink/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-mint-green/20 text-mint-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FileText className="w-4 h-4" />
            Ressources téléchargeables
          </div>
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-4">
            Outils Pratiques : {techniqueName}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Téléchargez nos guides, checklists et templates pour appliquer immédiatement cette technique dans vos négociations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Stats de téléchargement */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-xl px-8 py-4 border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-mint-green">2.3K+</div>
              <div className="text-sm text-gray-600">Téléchargements</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mint-green">4.8/5</div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mint-green">89%</div>
              <div className="text-sm text-gray-600">Recommandent</div>
            </div>
          </div>
        </div>

        {/* Témoignage */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Les ressources de Laurent sont concrètes et immédiatement applicables. 
                J'ai utilisé le guide de l'effet miroir dès le lendemain et ça a transformé mes négociations !"
              </blockquote>
              <div className="text-mint-green font-semibold">
                Marie D. • Directrice Commerciale PME
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
        resource={selectedResource}
      />
    </section>
  );
};

export default DownloadSection;