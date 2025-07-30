/**
 * Composant modal pour demander une ressource manquante
 * 
 * Ce composant affiche un modal avec un formulaire permettant aux utilisateurs
 * de demander une ressource qui n'est pas encore disponible.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export interface ResourceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceUrl: string;
  sourceUrl: string;
  resourceTitle?: string;
  resourceDescription?: string;
}

interface FormData {
  email: string;
  message: string;
}

interface FormErrors {
  email?: string;
  message?: string;
  general?: string;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function ResourceRequestModal({
  isOpen,
  onClose,
  resourceUrl,
  sourceUrl,
  resourceTitle,
  resourceDescription
}: ResourceRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', message: '' });
      setErrors({});
      setSubmissionState('idle');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * Valider l'email
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valider le formulaire
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }

    // Validation message (optionnel mais si présent, doit être raisonnable)
    if (formData.message.trim() && formData.message.trim().length > 500) {
      newErrors.message = 'Le message ne peut pas dépasser 500 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumettre la demande
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmissionState('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/resource-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: formData.email.trim(),
          resourceUrl,
          sourceUrl,
          message: formData.message.trim() || undefined
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi de la demande');
      }

      setSubmissionState('success');
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error: any) {
      console.error('Erreur lors de la soumission:', error);
      setSubmissionState('error');
      setErrors({
        general: error.message || 'Une erreur est survenue. Veuillez réessayer.'
      });
    }
  };

  /**
   * Gérer les changements de champs
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-blue-ink rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-blue-ink dark:text-white">
              Demander cette ressource
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Nous vous notifierons dès qu'elle sera disponible
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Resource Info */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={16} className="text-mint-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-blue-ink dark:text-white text-sm">
                  {resourceTitle || 'Ressource demandée'}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 break-all">
                  {resourceUrl}
                </p>
                {resourceDescription && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {resourceDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Success State */}
          {submissionState === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm">
                    Demande envoyée avec succès !
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Vous recevrez un email de confirmation et serez notifié dès que la ressource sera disponible.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 text-sm">
                    Erreur lors de l'envoi
                  </h4>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    {errors.general}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {submissionState !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-blue-ink dark:text-white mb-2"
                >
                  Votre email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors
                    ${errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-mint-green focus:ring-mint-green/20'
                    }
                    bg-white dark:bg-gray-800 text-blue-ink dark:text-white
                    focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  placeholder="votre@email.com"
                  disabled={submissionState === 'submitting'}
                  required
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-blue-ink dark:text-white mb-2"
                >
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors resize-none
                    ${errors.message 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-mint-green focus:ring-mint-green/20'
                    }
                    bg-white dark:bg-gray-800 text-blue-ink dark:text-white
                    focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  placeholder="Précisez vos besoins ou le contexte d'utilisation (optionnel)"
                  disabled={submissionState === 'submitting'}
                  maxLength={500}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formData.message.length}/500 caractères
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submissionState === 'submitting'}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-mint-green hover:bg-mint-green/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={submissionState === 'submitting'}
                >
                  {submissionState === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer la demande
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Info Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Votre demande sera transmise à Laurent Serre et traitée dans les plus brefs délais.
              Vous recevrez une confirmation par email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}