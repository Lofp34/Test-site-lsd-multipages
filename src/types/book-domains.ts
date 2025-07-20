// TypeScript interfaces for book domain optimization
// Based on the design document requirements

// Base domain types
export type DomainType = 
  | 'digital-ai' 
  | 'prospection' 
  | 'negotiation' 
  | 'management' 
  | 'psychology' 
  | 'methods';

// Visual theme configuration for each domain
export interface VisualTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  particleColor: string;
  gradientFrom: string;
  gradientTo: string;
}

// Domain-specific statistics
export interface DomainStatistic {
  label: string;
  value: string;
  description: string;
  trend?: 'rising' | 'stable' | 'declining';
}

// Expert insights for each domain
export interface ExpertInsight {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  keyElements: string[];
  trend: 'rising' | 'stable' | 'declining';
}

// Cross-category suggestions
export interface CrossCategorySuggestion {
  targetCategory: DomainType;
  reason: string;
  complementaryBooks: string[]; // book slugs
}

// Extended book category with domain-specific properties
export interface BookCategoryExtended {
  slug: string;
  title: string;
  pitch: string;
  description?: string;
  icon?: string;
  domainType: DomainType;
  visualTheme: VisualTheme;
  expertInsights: ExpertInsight[];
  caseStudies: CaseStudy[];
  implementationPhases: ImplementationPhase[];
  domainStats: DomainStatistic[];
  crossCategorySuggestions: CrossCategorySuggestion[];
  seoKeywords?: string[];
  books: any[]; // Will use existing Book type
}

// Business metrics for case studies
export interface BusinessMetrics {
  revenue?: string;
  conversion?: string;
  efficiency?: string;
  satisfaction?: string;
  roi?: string;
}

// Case study structure
export interface CaseStudy {
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: string;
  domainFocus: DomainType;
  metrics: BusinessMetrics;
  testimonial?: string;
  duration?: string;
}

// Implementation roadmap phases
export interface ImplementationPhase {
  phase: number;
  title: string;
  description: string;
  duration: string;
  keyActions: string[];
  expectedResults: string[];
  laurentAdvice: string;
  domainSpecific: boolean;
}

// Props for the generic DomainInsight component
export interface DomainInsightProps {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  keyElements: string[];
  trend: 'rising' | 'stable' | 'declining';
  domainSpecific?: {
    prospection?: ProspectionSpecific;
    negotiation?: NegotiationSpecific;
    management?: ManagementSpecific;
    psychology?: PsychologySpecific;
    methods?: MethodsSpecific;
  };
}

// Domain-specific content interfaces
export interface ProspectionSpecific {
  techniques: ProspectionTechnique[];
  channels: ProspectionChannel[];
  metrics: ProspectionMetric[];
  tools: ProspectionTool[];
}

export interface ProspectionTechnique {
  name: string;
  description: string;
  effectiveness: number; // 1-5 scale
  difficulty: 'Facile' | 'Intermédiaire' | 'Avancé';
}

export interface ProspectionChannel {
  name: string;
  responseRate: string;
  bestFor: string[];
  tips: string[];
}

export interface ProspectionMetric {
  name: string;
  benchmark: string;
  target: string;
  description: string;
}

export interface ProspectionTool {
  name: string;
  category: string;
  description: string;
  pricing: string;
}

export interface NegotiationSpecific {
  strategies: NegotiationStrategy[];
  psychologyPrinciples: PsychologyPrinciple[];
  closingTechniques: ClosingTechnique[];
  objectionHandling: ObjectionResponse[];
}

export interface NegotiationStrategy {
  name: string;
  description: string;
  whenToUse: string;
  successRate: string;
  difficulty: 'Facile' | 'Intermédiaire' | 'Avancé';
}

export interface PsychologyPrinciple {
  name: string;
  description: string;
  application: string;
  ethicalConsiderations: string;
}

export interface ClosingTechnique {
  name: string;
  description: string;
  script: string;
  effectiveness: number;
}

export interface ObjectionResponse {
  objection: string;
  response: string;
  followUp: string;
  notes: string;
}

export interface ManagementSpecific {
  leadershipStyles: LeadershipStyle[];
  teamMetrics: TeamMetric[];
  coachingMethods: CoachingMethod[];
  organizationalChanges: OrganizationalChange[];
}

export interface LeadershipStyle {
  name: string;
  description: string;
  bestFor: string[];
  characteristics: string[];
}

export interface TeamMetric {
  name: string;
  description: string;
  calculation: string;
  benchmark: string;
  frequency: string;
}

export interface CoachingMethod {
  name: string;
  description: string;
  steps: string[];
  duration: string;
  outcomes: string[];
}

export interface OrganizationalChange {
  type: string;
  description: string;
  timeline: string;
  challenges: string[];
  successFactors: string[];
}

export interface PsychologySpecific {
  biases: CognitiveBias[];
  influenceTechniques: InfluenceTechnique[];
  behaviorPatterns: BehaviorPattern[];
  communicationStyles: CommunicationStyle[];
}

export interface CognitiveBias {
  name: string;
  description: string;
  salesApplication: string;
  ethicalUse: string;
}

export interface InfluenceTechnique {
  name: string;
  description: string;
  mechanism: string;
  examples: string[];
  ethicalGuidelines: string;
}

export interface BehaviorPattern {
  name: string;
  description: string;
  triggers: string[];
  responses: string[];
}

export interface CommunicationStyle {
  name: string;
  characteristics: string[];
  adaptationTips: string[];
  recognitionSigns: string[];
}

export interface MethodsSpecific {
  frameworks: SalesFramework[];
  processes: SalesProcess[];
  methodologies: SalesMethodology[];
  tools: MethodologyTool[];
}

export interface SalesFramework {
  name: string;
  description: string;
  steps: string[];
  bestFor: string[];
  complexity: 'Simple' | 'Intermédiaire' | 'Complexe';
}

export interface SalesProcess {
  name: string;
  description: string;
  phases: ProcessPhase[];
  duration: string;
  resources: string[];
}

export interface ProcessPhase {
  name: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface SalesMethodology {
  name: string;
  description: string;
  principles: string[];
  implementation: string[];
  measurableOutcomes: string[];
}

export interface MethodologyTool {
  name: string;
  description: string;
  category: string;
  usage: string;
  benefits: string[];
}

// Props for CaseStudyGrid component
export interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  domainType: DomainType;
  title?: string;
}

// Props for ImplementationRoadmap component
export interface ImplementationRoadmapProps {
  phases: ImplementationPhase[];
  domainType: DomainType;
  title?: string;
}

// Props for DomainStats component
export interface DomainStatsProps {
  stats: DomainStatistic[];
  domainType: DomainType;
  title?: string;
}

// Expert vision content for hero sections
export interface ExpertVisionContent {
  headline: string;
  subheadline: string;
  expertise: string[];
  vision: string;
  callToAction: string;
}

// Hero section props
export interface HeroSectionProps {
  category: BookCategoryExtended;
  expertVision: ExpertVisionContent;
  domainStats: DomainStatistic[];
  visualElements: VisualTheme;
}

// Domain theme configurations
export const DOMAIN_THEMES: Record<DomainType, VisualTheme> = {
  'digital-ai': {
    primaryColor: '#3B82F6', // Blue
    secondaryColor: '#1E40AF',
    accentColor: '#06B6D4', // Cyan
    particleColor: '#3B82F6',
    gradientFrom: '#3B82F6',
    gradientTo: '#06B6D4'
  },
  'prospection': {
    primaryColor: '#10B981', // Green
    secondaryColor: '#059669',
    accentColor: '#3B82F6', // Blue
    particleColor: '#10B981',
    gradientFrom: '#10B981',
    gradientTo: '#3B82F6'
  },
  'negotiation': {
    primaryColor: '#EF4444', // Red
    secondaryColor: '#DC2626',
    accentColor: '#F97316', // Orange
    particleColor: '#EF4444',
    gradientFrom: '#EF4444',
    gradientTo: '#F97316'
  },
  'management': {
    primaryColor: '#10B981', // Green
    secondaryColor: '#059669',
    accentColor: '#F59E0B', // Gold
    particleColor: '#10B981',
    gradientFrom: '#10B981',
    gradientTo: '#F59E0B'
  },
  'psychology': {
    primaryColor: '#8B5CF6', // Purple
    secondaryColor: '#7C3AED',
    accentColor: '#EC4899', // Pink
    particleColor: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899'
  },
  'methods': {
    primaryColor: '#6B7280', // Gray
    secondaryColor: '#4B5563',
    accentColor: '#3B82F6', // Blue
    particleColor: '#6B7280',
    gradientFrom: '#6B7280',
    gradientTo: '#3B82F6'
  }
};