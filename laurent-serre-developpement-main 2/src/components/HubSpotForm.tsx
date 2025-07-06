'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

// Types pour HubSpot
interface HubSpotWindow extends Window {
  hbspt?: {
    forms: {
      create: (config: HubSpotFormConfig) => void;
    };
  };
}

interface HubSpotFormConfig {
  region: string;
  portalId: string;
  formId: string;
  target: string;
  onFormReady?: () => void;
  onFormSubmit?: () => void;
  onFormSubmitted?: () => void;
}

interface HubSpotFormProps {
  formId?: string;
  region?: string;
  portalId?: string;
}

export default function HubSpotForm({ 
  formId = "884e2971-2d90-4ca1-86ee-eb824f43f074", 
  region = "na1",
  portalId = "7401198"
}: HubSpotFormProps) {
  const [formLoaded, setFormLoaded] = useState(false);
  const { ref, isInView } = useInView({
    triggerOnce: true, // Pour ne déclencher qu'une seule fois
    threshold: 0.1, // Se déclenche quand 10% de l'élément est visible
  });

  useEffect(() => {
    // Ne rien faire si le formulaire est déjà chargé ou s'il n'est pas visible
    if (formLoaded || !isInView) {
      return;
    }

    const windowWithHubSpot = window as HubSpotWindow;
    
    // Charger le script HubSpot si pas déjà chargé
    if (typeof window !== 'undefined' && !windowWithHubSpot.hbspt) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.async = true;
      script.onload = () => {
        setFormLoaded(true);
        // Créer le formulaire une fois le script chargé
        if (windowWithHubSpot.hbspt) {
          windowWithHubSpot.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: '#hubspot-form-container',
            onFormReady: () => {
              console.log('Formulaire HubSpot prêt');
            },
            onFormSubmit: () => {
              console.log('Formulaire soumis');
            },
            onFormSubmitted: () => {
              console.log('Formulaire envoyé avec succès vers HubSpot CRM');
              // Optionnel: ajouter un tracking ou redirection
            }
          });
        }
      };
      document.head.appendChild(script);
    } else if (windowWithHubSpot.hbspt) {
      // Si le script est déjà chargé, créer directement le formulaire
      setFormLoaded(true);
      windowWithHubSpot.hbspt.forms.create({
        region: region,
        portalId: portalId,
        formId: formId,
        target: '#hubspot-form-container'
      });
    }
  }, [isInView, formLoaded, formId, region, portalId]);

  return (
    <div ref={ref} className="hubspot-form-wrapper">
      {isInView ? (
        <div id="hubspot-form-container"></div>
      ) : (
        <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Placeholder pour garder la hauteur et éviter le décalage de mise en page */}
        </div>
      )}
      
      {/* CSS personnalisé pour matcher votre charte graphique */}
      <style jsx>{`
        .hubspot-form-wrapper {
          max-width: 100%;
        }
        
        .hubspot-form-wrapper input,
        .hubspot-form-wrapper textarea,
        .hubspot-form-wrapper select {
          width: 100% !important;
          padding: 12px 16px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 12px !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 16px !important;
          transition: border-color 0.3s ease !important;
          background-color: white !important;
        }
        
        .hubspot-form-wrapper input:focus,
        .hubspot-form-wrapper textarea:focus,
        .hubspot-form-wrapper select:focus {
          border-color: #00BDA4 !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(0, 189, 164, 0.1) !important;
        }
        
        .hubspot-form-wrapper .hs-button {
          background-color: #00BDA4 !important;
          color: white !important;
          border: none !important;
          padding: 16px 32px !important;
          border-radius: 12px !important;
          font-weight: bold !important;
          font-size: 16px !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          width: 100% !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .hubspot-form-wrapper .hs-button:hover {
          background-color: rgba(0, 189, 164, 0.9) !important;
          transform: scale(1.02) !important;
        }
        
        .hubspot-form-wrapper .hs-error-msgs {
          color: #ef4444 !important;
          font-size: 14px !important;
          margin-top: 4px !important;
        }
        
        .hubspot-form-wrapper .hs-form-field {
          margin-bottom: 20px !important;
        }
        
        .hubspot-form-wrapper label {
          font-weight: 600 !important;
          color: #1B365D !important;
          margin-bottom: 8px !important;
          display: block !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .hubspot-form-wrapper .hs-richtext {
          font-family: 'Open Sans', sans-serif !important;
          color: #414141 !important;
        }
        
        .hubspot-form-wrapper .hs-form-required {
          color: #00BDA4 !important;
        }
      `}</style>
    </div>
  );
} 