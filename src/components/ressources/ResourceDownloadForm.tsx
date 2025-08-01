'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Download, Mail, User } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { trackFormSubmission, trackDownloadSuccess, trackDownloadError, resourceAnalytics } from '@/utils/resource-analytics';

export interface ResourceDownloadFormProps {
  title: string;
  description: string;
  resourceUrl: string;
  resourceId: string;
  deliveryMethod: 'email' | 'download' | 'both';
  autoResponse?: boolean;
  formFields?: {
    email: boolean;
    firstName?: boolean;
    lastName?: boolean;
    company?: boolean;
    phone?: boolean;
    message?: boolean;
  };
  onSubmit?: (data: FormData) => Promise<void>;
  className?: string;
}

export interface FormData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  message?: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  message?: string;
  general?: string;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const ResourceDownloadForm: React.FC<ResourceDownloadFormProps> = ({
  title,
  description,
  resourceUrl,
  resourceId,
  deliveryMethod,
  autoResponse = true,
  formFields = { email: true },
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  // Reset form on mount
  useEffect(() => {
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setSubmissionState('idle');
  }, []);

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate phone format (French format)
   */
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation (always required)
    if (!formData.email?.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }

    // First name validation
    if (formFields.firstName && !formData.firstName?.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    // Last name validation
    if (formFields.lastName && !formData.lastName?.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    // Company validation
    if (formFields.company && !formData.company?.trim()) {
      newErrors.company = 'L\'entreprise est requise';
    }

    // Phone validation
    if (formFields.phone && formData.phone?.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = 'Veuillez saisir un numéro de téléphone valide';
    }

    // Message validation
    if (formFields.message && formData.message && formData.message.length > 500) {
      newErrors.message = 'Le message ne peut pas dépasser 500 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Track form validation errors
      Object.entries(errors).forEach(([field, error]) => {
        if (error) {
          resourceAnalytics.trackFormError(resourceId, field, 'validation_failed');
        }
      });
      return;
    }

    setSubmissionState('submitting');
    setErrors({});

    // Track form submission attempt
    const submissionData = {
      resourceId,
      userEmail: formData.email.trim(),
      deliveryMethod,
      formFields: Object.keys(formFields).filter(field => formFields[field as keyof typeof formFields]),
      source: typeof window !== 'undefined' ? window.location.href : ''
    };

    trackFormSubmission(submissionData);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submission to resource-request API
        const response = await fetch('/api/resource-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: formData.email.trim(),
            resourceUrl,
            sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
            message: formData.message?.trim() || `Demande de téléchargement: ${title}`,
            userData: {
              firstName: formData.firstName?.trim(),
              lastName: formData.lastName?.trim(),
              company: formData.company?.trim(),
              phone: formData.phone?.trim()
            }
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Erreur lors de l\'envoi de la demande');
        }

        // Track successful API response
        trackDownloadSuccess({
          resourceId,
          resourceUrl,
          userEmail: formData.email.trim(),
          downloadMethod: deliveryMethod === 'email' ? 'email' : 'direct'
        });
      }

      setSubmissionState('success');
      
      // Auto-reset form after success
      setTimeout(() => {
        setSubmissionState('idle');
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          phone: '',
          message: ''
        });
      }, 5000);

    } catch (error: any) {
      console.error('Erreur lors de la soumission:', error);
      setSubmissionState('error');
      setErrors({
        general: error.message || 'Une erreur est survenue. Veuillez réessayer.'
      });

      // Track form submission error
      trackDownloadError(resourceId, 'form_submission_failed', error.message);
    }
  };

  /**
   * Handle input changes
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Get delivery method description
   */
  const getDeliveryDescription = () => {
    switch (deliveryMethod) {
      case 'email':
        return 'Vous recevrez la ressource par email dans les minutes qui suivent.';
      case 'download':
        return 'Le téléchargement commencera automatiquement après validation.';
      case 'both':
        return 'Vous recevrez un email de confirmation et pourrez télécharger immédiatement.';
      default:
        return 'Vous recevrez la ressource par email.';
    }
  };

  return (
    <div className={`bg-white dark:bg-blue-ink/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-mint-green to-mint-green/90 p-6 text-white">
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Download size={20} />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            {description}
          </p>
          <p className="text-white/80 text-xs mt-2">
            {getDeliveryDescription()}
          </p>
        </AnimatedSection>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {/* Success State */}
        {submissionState === 'success' && (
          <AnimatedSection animation="scale-in" delay={0}>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                Demande envoyée avec succès !
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                {autoResponse 
                  ? 'Vous allez recevoir un email de confirmation avec votre ressource.'
                  : 'Votre demande a été transmise à Laurent Serre.'
                }
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400">
                <Mail size={14} />
                <span>Vérifiez votre boîte email (et vos spams)</span>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Error State */}
        {errors.general && (
          <AnimatedSection animation="slide-up" delay={0}>
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0" />
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
          </AnimatedSection>
        )}

        {/* Form */}
        {submissionState !== 'success' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field (Always present) */}
            <AnimatedSection animation="slide-up" delay={100}>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-blue-ink dark:text-white mb-2"
                >
                  Email professionnel <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg text-sm transition-colors
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
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </AnimatedSection>

            {/* First Name Field */}
            {formFields.firstName && (
              <AnimatedSection animation="slide-up" delay={150}>
                <div>
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-medium text-blue-ink dark:text-white mb-2"
                  >
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg text-sm transition-colors
                        ${errors.firstName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-mint-green focus:ring-mint-green/20'
                        }
                        bg-white dark:bg-gray-800 text-blue-ink dark:text-white
                        focus:outline-none focus:ring-2
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                      placeholder="Votre prénom"
                      disabled={submissionState === 'submitting'}
                      required
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                  </div>
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            )}

            {/* Company Field */}
            {formFields.company && (
              <AnimatedSection animation="slide-up" delay={200}>
                <div>
                  <label 
                    htmlFor="company" 
                    className="block text-sm font-medium text-blue-ink dark:text-white mb-2"
                  >
                    Entreprise {formFields.company && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full px-3 py-3 border rounded-lg text-sm transition-colors
                      ${errors.company 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-mint-green focus:ring-mint-green/20'
                      }
                      bg-white dark:bg-gray-800 text-blue-ink dark:text-white
                      focus:outline-none focus:ring-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    placeholder="Nom de votre entreprise"
                    disabled={submissionState === 'submitting'}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                  />
                  {errors.company && (
                    <p id="company-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.company}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            )}

            {/* Message Field */}
            {formFields.message && (
              <AnimatedSection animation="slide-up" delay={250}>
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
                    className={`w-full px-3 py-3 border rounded-lg text-sm transition-colors resize-none
                      ${errors.message 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-mint-green focus:ring-mint-green/20'
                      }
                      bg-white dark:bg-gray-800 text-blue-ink dark:text-white
                      focus:outline-none focus:ring-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    placeholder="Précisez vos besoins ou le contexte d'utilisation"
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
                    {formData.message?.length || 0}/500 caractères
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Submit Button */}
            <AnimatedSection animation="slide-up" delay={300}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submissionState === 'submitting'}
                className="w-full bg-gradient-to-r from-mint-green to-mint-green/90 hover:from-mint-green/90 hover:to-mint-green"
                icon={submissionState === 'submitting' ? 
                  <Loader2 size={20} className="animate-spin" /> : 
                  <Send size={20} />
                }
              >
                {submissionState === 'submitting' ? 'Envoi en cours...' : 'Obtenir la ressource'}
              </Button>
            </AnimatedSection>

            {/* Privacy Notice */}
            <AnimatedSection animation="fade-in" delay={400}>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                  🔒 Vos données sont protégées et ne seront jamais partagées. 
                  Vous recevrez uniquement la ressource demandée et pourrez vous désabonner à tout moment.
                </p>
              </div>
            </AnimatedSection>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResourceDownloadForm;