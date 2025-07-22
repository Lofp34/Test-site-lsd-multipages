'use client';
import ProblemSection from '@/components/sections/ProblemSection';
import ResourcesPMESection from '@/components/sections/ResourcesPMESection';
import TestimonialVideoSection from '@/components/sections/TestimonialVideoSection';
import HubSpotForm from '@/components/HubSpotForm';

export default function AccueilClient() {
  return (
    <>
      <ProblemSection />
      <ResourcesPMESection />
      <TestimonialVideoSection />
      <section className="py-16 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </>
  );
} 