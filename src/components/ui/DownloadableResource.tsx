'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, Users, Clock, CheckCircle2, Mail, User, Building } from 'lucide-react';
import NegotiationButton from './NegotiationButton';
import { trackResourceDownload, generateLead } from '@/utils/download-tracking';

interface DownloadableResourceProps {
  id: string;
  title: string;
  description: string;
  format: string;
  downloadUrl: string;
  preview?: string;
  size?: string;
  pages?: number;
  downloadCount?: number;
  isDownloaded?: boolean;
  requiresEmail?: boolean;
  onDownload: (resourceId: string, userInfo?: UserInfo) => void;
  onPreview?: (resourceId: string) => void;
}

interface UserInfo {
  email: string;
  firstName: string;
  company?: string;
  role?: string;
}

const DownloadableResource: React.FC<DownloadableResourceProps> = ({
  id,
  title,
  description,
  format,
  downloadUrl,
  preview,
  size = '2.5 MB',
  pages = 12,
  downloadCount = 0,
  isDownloaded = false,
  requiresEmail = true,
  onDownload,
  onPreview
}) => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    firstName: '',
    company: '',
    role: ''
  });

  const handleDownloadClick = () => {
    if (requiresEmail && !isDownloaded) {
      setShowLeadForm(true);
    } else {
      onDownload(id);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi des données (dans un vrai projet, cela irait vers une API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Génération du lead avec tracking complet
      generateLead({
        email: userInfo.email,
        firstName: userInfo.firstName,
        company: userInfo.company,
        role: userInfo.role,
        source: 'technique-page',
        resourceDownloaded: title
      });

      // Tracking du téléchargement
      trackResourceDownload(id, title, userInfo.email, 'technique-page');

      onDownload(id, userInfo);
      setShowLeadForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(id);
    }
    
    // Tracking de la prévisualisation
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_preview', {
        event_category: 'Resource Engagement',
        event_label: title,
        value: 1
      });
    }
  };

  const getFormatIcon = () => {
    switch ((format || '').toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getFormatColor = () => {
    switch ((format || '').toLowerCase()) {
      case 'pdf':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      <motion.div
        className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200 bg-white/50 dark:bg-gray-800/50"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h5 className="text-lg font-semibold text-blue-ink dark:text-white">
                {title}
              </h5>
              {isDownloaded && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Téléchargé
                </span>
              )}
            </div>
            <p className="text-sm text-primary-secondary/80 mb-3">
              {description}
            </p>
            <div className="flex items-center gap-4 text-xs text-primary-secondary/60">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {pages} pages
              </span>
              <span>{(format || 'PDF').toUpperCase()}</span>
              <span>{size}</span>
              {downloadCount > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {downloadCount} téléchargements
                </span>
              )}
            </div>
          </div>
          <div className="ml-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${getFormatColor()} rounded-lg flex items-center justify-center text-white`}>
              {getFormatIcon()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {preview && (
              <NegotiationButton
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </NegotiationButton>
            )}
          </div>
          <NegotiationButton
            variant="primary"
            size="sm"
            onClick={handleDownloadClick}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloaded ? 'Télécharger à nouveau' : 'Télécharger'}
          </NegotiationButton>
        </div>

        {/* Indicateur de valeur */}
        <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-orange-600 font-medium">💎 Ressource Premium</span>
            <span className="text-primary-secondary/70">•</span>
            <span className="text-primary-secondary/80">Créée par Laurent Serre</span>
            <span className="text-primary-secondary/70">•</span>
            <span className="text-primary-secondary/80">Basée sur 20 ans d'expérience</span>
          </div>
        </div>
      </motion.div>

      {/* Modal de génération de leads */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white dark:bg-blue-ink rounded-2xl p-8 max-w-md w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
                Télécharger "{title}"
              </h3>
              <p className="text-sm text-primary-secondary/80">
                Accédez instantanément à cette ressource premium en renseignant vos informations
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-ink dark:text-white mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Votre prénom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-ink dark:text-white mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email professionnel *
                </label>
                <input
                  type="email"
                  required
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="votre.email@entreprise.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-ink dark:text-white mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Entreprise
                </label>
                <input
                  type="text"
                  value={userInfo.company}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-ink dark:text-white mb-2">
                  Fonction
                </label>
                <select
                  value={userInfo.role}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Sélectionnez votre fonction</option>
                  <option value="dirigeant">Dirigeant / CEO</option>
                  <option value="directeur-commercial">Directeur Commercial</option>
                  <option value="commercial">Commercial</option>
                  <option value="manager">Manager</option>
                  <option value="consultant">Consultant</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="text-xs text-primary-secondary/60 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <Clock className="w-3 h-3 inline mr-1" />
                Vos données sont sécurisées et ne seront jamais partagées. 
                Vous recevrez occasionnellement nos conseils en négociation.
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Annuler
                </button>
                <NegotiationButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi...
                    </div>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </>
                  )}
                </NegotiationButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DownloadableResource;