'use client';

import { useState, useCallback } from 'react';
import HubSpotForm from '@/components/HubSpotForm';

export default function LeadMagnetForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitted = useCallback(() => {
    setSubmitted(true);
    // GA4 tracking is handled inside HubSpotForm (contact_form_submitted)
  }, []);

  if (submitted) {
    return (
      <div className="bg-mint-green/5 border border-mint-green/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-title font-bold text-blue-ink mb-3">
          Guide envoyé ! Vérifiez votre boîte email
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Vous devriez recevoir le PDF dans les prochaines minutes. 
          Si vous ne le voyez pas, vérifiez vos spams.
        </p>
        <div className="bg-white rounded-xl p-4 border border-gray-100 inline-block">
          <p className="text-xs text-gray-400 mb-1">En attendant, lisez aussi :</p>
          <a
            href="/blog/qualification-commerciale-b2b-7-erreurs"
            className="text-sm text-mint-green hover:underline font-medium"
          >
            Les 7 erreurs de qualification commerciale B2B →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HubSpotForm
        formId="884e2971-2d90-4ca1-86ee-eb824f43f074"
        region="na1"
        portalId="7401198"
        onFormSubmitted={handleSubmitted}
      />
    </div>
  );
}
