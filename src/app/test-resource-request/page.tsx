/**
 * Page de test pour les composants de demande de ressources
 * Cette page démontre l'utilisation des différents composants créés
 */

'use client';

import React from 'react';
import MissingResourceCard from '@/components/ui/MissingResourceCard';
import MissingResourceBanner from '@/components/ui/MissingResourceBanner';

export default function TestResourceRequestPage() {
  return (
    <div className="min-h-screen bg-primary-bg py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-ink dark:text-white mb-4">
            Test des Composants de Demande de Ressources
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Démonstration des différents composants pour gérer les ressources manquantes
          </p>
        </div>

        {/* Bannière d'information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink dark:text-white mb-4">
            1. Bannière de ressource manquante
          </h2>
          <MissingResourceBanner
            resourceUrl="/ressources/guide-prospection-avancee.pdf"
            resourceTitle="Guide de Prospection Avancée"
            message="Ce guide complet sur les techniques de prospection B2B est en cours de finalisation."
            variant="warning"
            isDismissible={true}
          />
        </div>

        {/* Bannière info */}
        <div className="mb-8">
          <MissingResourceBanner
            resourceUrl="/ressources/formation-negociation-video.mp4"
            resourceTitle="Formation Vidéo - Négociation"
            message="Série de vidéos pratiques sur les techniques de négociation commerciale."
            variant="info"
          />
        </div>

        {/* Bannière minimale */}
        <div className="mb-12">
          <MissingResourceBanner
            resourceUrl="/ressources/checklist-closing.pdf"
            resourceTitle="Checklist de Closing"
            message="Aide-mémoire pour réussir ses conclusions de vente."
            variant="minimal"
          />
        </div>

        {/* Cartes de ressources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-ink dark:text-white mb-4">
            2. Cartes de ressources manquantes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <MissingResourceCard
              resourceUrl="/ressources/formation-complete-commercial.pdf"
              resourceTitle="Formation Commerciale Complète"
              resourceDescription="Manuel de 200 pages couvrant tous les aspects du développement commercial en PME, de la prospection au closing."
              category="Formation"
              expectedAvailability="Mars 2025"
            />

            <MissingResourceCard
              resourceUrl="/ressources/templates-emails-prospection.zip"
              resourceTitle="Templates d'Emails de Prospection"
              resourceDescription="Collection de 50 templates d'emails testés et optimisés pour différents secteurs d'activité."
              category="Outils"
              expectedAvailability="Février 2025"
            />

            <MissingResourceCard
              resourceUrl="/ressources/calculateur-roi-commercial.xlsx"
              resourceTitle="Calculateur ROI Commercial"
              resourceDescription="Outil Excel pour calculer le retour sur investissement de vos actions commerciales et formations."
              category="Outil"
            />

            <MissingResourceCard
              resourceUrl="/ressources/webinar-ia-commercial.mp4"
              resourceTitle="Webinar - IA et Commerce"
              resourceDescription="Conférence sur l'impact de l'intelligence artificielle sur les métiers commerciaux et comment s'adapter."
              category="Webinar"
              expectedAvailability="Avril 2025"
            />
          </div>
        </div>

        {/* Section d'information */}
        <div className="bg-white dark:bg-blue-ink rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-blue-ink dark:text-white mb-3">
            Comment ça fonctionne ?
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-mint-green text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <p>Cliquez sur "Demander cette ressource" sur n'importe quelle ressource manquante</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-mint-green text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <p>Remplissez le formulaire avec votre email et un message optionnel</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-mint-green text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <p>Laurent Serre reçoit automatiquement votre demande par email</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-mint-green text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <p>Vous recevez une confirmation et serez notifié dès que la ressource sera disponible</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-mint-green/10 rounded-lg border border-mint-green/20">
            <p className="text-sm text-mint-green font-medium">
              💡 Plus une ressource est demandée, plus elle sera prioritaire dans le développement !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}