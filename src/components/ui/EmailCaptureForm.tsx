'use client';

import React, { useState } from 'react';
import { Mail, Download, CheckCircle } from 'lucide-react';

interface EmailCaptureFormProps {
  onSuccess?: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  successMessage?: string;
}

export default function EmailCaptureForm({
  onSuccess,
  title = "Recevez le guide par email",
  description = "Entrez votre email pour recevoir le guide LinkedIn PME directement dans votre boîte mail.",
  buttonText = "Télécharger le guide",
  successMessage = "Guide envoyé ! Vérifiez votre boîte mail."
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulation d'envoi d'email (à remplacer par votre API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Téléchargement direct du PDF
      const link = document.createElement('a');
      link.href = '/guide-linkedin-prospection-pme.pdf';
      link.download = 'guide-linkedin-prospection-pme.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSuccess(true);
      onSuccess?.();
      
      // Reset après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
      }, 3000);

    } catch (err) {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-green-700 font-semibold">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-mint-green/10 border border-mint-green/30 rounded-xl p-6">
      <div className="text-center mb-4">
        <Mail className="w-8 h-8 text-mint-green mx-auto mb-2" />
        <h3 className="text-lg font-title font-bold text-blue-ink mb-1">{title}</h3>
        <p className="text-gray-anthracite text-sm">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
            required
          />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center bg-mint-green hover:bg-mint-green/90 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Envoi en cours...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              {buttonText}
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-3">
        Nous respectons votre vie privée. Pas de spam, désabonnement en 1 clic.
      </p>
    </div>
  );
} 