import dynamic from 'next/dynamic';

import HeroSection from "@/components/sections/HeroSection";

const LogoBanner = dynamic(() => import('@/components/LogoBanner'));
const ProblemSection = dynamic(() => import('@/components/sections/ProblemSection'));
const PromiseSection = dynamic(() => import('@/components/sections/PromiseSection'));
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'));
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const MethodValuesSection = dynamic(() => import('@/components/sections/MethodValuesSection'));
const TestimonialVideoSection = dynamic(() => import('@/components/sections/TestimonialVideoSection'));
const DiagnosticSection = dynamic(() => import('@/components/sections/DiagnosticSection'));
const FinalCtaSection = dynamic(() => import('@/components/sections/FinalCtaSection'));
// const ResourcesSection = dynamic(() => import('@/components/sections/ResourcesSection'));

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <LogoBanner />
      <ProblemSection />
      <PromiseSection />
      <ProcessSection />
      <AboutSection />
      <MethodValuesSection />
      <TestimonialVideoSection />
      {/* <ResourcesSection /> */}
      <DiagnosticSection />
      <FinalCtaSection />
    </main>
  );
}
