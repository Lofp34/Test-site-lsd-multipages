'use client';

import React, { lazy, Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Button from "@/components/ui/Button";
import ABTestButton from "@/components/ui/ABTestButton";
import TrackedLink from "@/components/ui/TrackedLink";
import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy loading du chat widget pour optimiser le LCP
const SimpleChatWidget = lazy(() => import('./chat/SimpleChatWidget'));

// Lazy loading des composants lourds
const LogoBanner = dynamic(() => import('@/components/LogoBanner').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null
});

const AccueilClient = dynamic(() => import('@/components/AccueilClient').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null
});

interface ClientPageWrapperProps {
  children?: React.ReactNode;
  enableChat?: boolean;
  chatConfig?: {
    position?: 'bottom-right' | 'bottom-left' | 'center';
    theme?: 'light' | 'dark' | 'auto';
    initialMessage?: string;
  };
}

export default function ClientPageWrapper({ 
  children, 
  enableChat = true,
  chatConfig = {}
}: ClientPageWrapperProps) {
  const [shouldLoadChat, setShouldLoadChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Préchargement conditionnel du chat après le chargement initial de la page
  useEffect(() => {
    if (!enableChat) return;

    // Attendre que la page soit complètement chargée
    const handleLoad = () => {
      // Utiliser requestIdleCallback pour charger le chat quand le navigateur est idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setShouldLoadChat(true);
          // Délai supplémentaire pour l'animation d'apparition
          setTimeout(() => setIsVisible(true), 100);
        }, { timeout: 2000 });
      } else {
        // Fallback pour les navigateurs qui ne supportent pas requestIdleCallback
        setTimeout(() => {
          setShouldLoadChat(true);
          setTimeout(() => setIsVisible(true), 100);
        }, 1000);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [enableChat]);

  // Préchargement des ressources critiques du chat
  useEffect(() => {
    if (shouldLoadChat && typeof window !== 'undefined') {
      // Précharger les modules du chat
      import('./chat/SimpleChatWidget');
      import('../hooks/useGeminiChatSimple');
    }
  }, [shouldLoadChat]);

  // Si des children sont fournis, les afficher avec le chat
  if (children) {
    return (
      <>
        {children}
        
        {/* Chat widget avec lazy loading et optimisations SEO */}
        {enableChat && shouldLoadChat && (
          <div 
            className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            // Optimisations SEO
            data-noindex="true"
            aria-hidden="true"
            role="complementary"
            aria-label="Assistant de chat Laurent Serre"
          >
            <Suspense fallback={
              // Fallback minimal pour éviter le CLS
              <div 
                className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-mint-green to-blue-ink opacity-50 animate-pulse z-50"
                aria-hidden="true"
              />
            }>
              <SimpleChatWidget
                position={chatConfig.position || 'bottom-right'}
                theme={chatConfig.theme || 'auto'}
                initialMessage={chatConfig.initialMessage || "Bonjour Laurent, comment peux tu m'aider ?"}
                apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
              />
            </Suspense>
          </div>
        )}
      </>
    );
  }

  // Sinon, afficher le contenu de la page d'accueil par défaut
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section Nouvelle Version */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/laurent.jpg"
            alt="Photo de Laurent Serre, consultant et formateur en développement commercial"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-blue-ink/60"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-mint-green rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-soft rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="animate-fade-in-up mb-8">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
                <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
                <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                  +20 ans d'expertise • Accompagnement commercial sur-mesure
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="block">De l'effort commercial</span>
              <span className="block text-mint-green">au levier stratégique</span>
            </h1>

            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Je structure votre force de vente pour en faire une équipe engagée, 
                qui applique une méthodologie claire pour une performance commerciale durable.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Mon approche, issue de 20 ans d'expérience terrain et augmentée par l'IA, 
                est conçue pour améliorer votre performance commerciale, durablement.
              </p>
            </div>

            {/* CTAs optimisés avec A/B Testing - Mobile-first avec hiérarchie claire */}
            <div className="cta-group-mobile pt-6 sm:pt-8 pb-12 sm:pb-16">
              <div className="cta-container-mobile lg:flex-row lg:max-w-none lg:gap-6">
                <TrackedLink 
                  href="/bootcamp"
                  ctaId="hero-bootcamp"
                  ctaText="Rejoindre le Bootcamp Commercial"
                  ctaType="primary"
                  section="hero"
                  position={1}
                  enableABTest={true}
                  abTestId="hero-bootcamp-text"
                  className="block"
                >
                  <ABTestButton
                    variant="primary"
                    size="lg"
                    icon="🚀"
                    testId="hero-bootcamp-text"
                    defaultText="Rejoindre le Bootcamp Commercial"
                    className="cta-mobile cta-primary-mobile lg:w-auto lg:min-w-[280px]"
                  />
                </TrackedLink>
                
                <TrackedLink 
                  href="/ressources"
                  ctaId="hero-resources"
                  ctaText="Accéder aux Ressources Gratuites"
                  ctaType="secondary"
                  section="hero"
                  position={2}
                  className="block"
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    icon="📚"
                    className="cta-mobile cta-secondary-mobile lg:w-auto lg:min-w-[280px] border-white text-white hover:bg-white hover:text-blue-ink"
                  >
                    Accéder aux Ressources Gratuites
                  </Button>
                </TrackedLink>
              </div>
            </div>

            {/* Indicateur de chat disponible */}
            <div className="mt-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-sm text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-mint-green rounded-full animate-pulse"></span>
                  Chat expert disponible - Posez vos questions !
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-mint-green rounded-full flex justify-center bg-white/10 backdrop-blur-sm shadow-lg">
            <div className="w-1 h-3 bg-mint-green rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <LogoBanner />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <AccueilClient />
      </ErrorBoundary>
      
      {/* Chat widget avec lazy loading et optimisations SEO */}
      {enableChat && shouldLoadChat && (
        <div 
          className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          // Optimisations SEO
          data-noindex="true"
          aria-hidden="true"
          role="complementary"
          aria-label="Assistant de chat Laurent Serre"
        >
          <Suspense fallback={
            // Fallback minimal pour éviter le CLS
            <div 
              className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-mint-green to-blue-ink opacity-50 animate-pulse z-50"
              aria-hidden="true"
            />
          }>
            <SimpleChatWidget
              position={chatConfig.position || 'bottom-right'}
              theme={chatConfig.theme || 'auto'}
              initialMessage={chatConfig.initialMessage || "Je souhaite augmenter la performance de mon équipe commerciale mais j’ai du mal à prioriser, que me conseilles-tu ?"}
              apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
            />
          </Suspense>
        </div>
      )}
    </main>
  );
}
