'use client';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from 'next/image';
import ProblemSection from '@/components/sections/ProblemSection';
import HubSpotForm from '@/components/HubSpotForm';
import { useState } from 'react';

const LogoBanner = dynamic(() => import('@/components/LogoBanner'));

export const metadata: Metadata = {
  title: 'Laurent Serre Développement - Expert Commercial & Formation',
  description: 'Accompagnement commercial pour PME : structuration des équipes, formation à la vente, méthodes éprouvées. 20 ans d\'expérience terrain + outils IA.',
  alternates: {
    canonical: 'https://laurentserre.com',
  },
};

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);

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

            {/* CTAs vers les pages existantes */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
              <Link href="/bootcamp">
                <Button 
                  variant="primary"
                  size="lg"
                  icon="🚀"
                  className="w-full sm:w-auto"
                >
                  Découvrir le Bootcamp
                </Button>
              </Link>
              
              <Link href="/diagnostic">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="🎯"
                  className="w-full sm:w-auto"
                >
                  Faire le diagnostic gratuit
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-mint-green rounded-full flex justify-center bg-white/10 backdrop-blur-sm shadow-lg">
            <div className="w-1 h-3 bg-mint-green rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <LogoBanner />
      <ProblemSection onContactClick={() => setShowContactForm(true)} />
      {showContactForm && (
        <section className="py-16 bg-white dark:bg-gray-anthracite/10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 text-center">
              Prendre contact avec Laurent Serre
            </h2>
            <HubSpotForm />
          </div>
        </section>
      )}
    </main>
  );
}
