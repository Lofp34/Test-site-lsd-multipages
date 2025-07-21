import { z } from 'zod';

// Schema de validation pour les thèmes de catégorie
export const CategoryThemeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Couleur primaire invalide'),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Couleur secondaire invalide'),
  accentColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Couleur d\'accent invalide'),
  particleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Couleur des particules invalide'),
  gradientFrom: z.string().min(1, 'Gradient de départ requis'),
  gradientTo: z.string().min(1, 'Gradient de fin requis'),
  gradientVia: z.string().min(1, 'Gradient intermédiaire requis'),
  icon: z.string().min(1, 'Icône requise'),
  name: z.string().min(1, 'Nom du thème requis')
});

// Schema de validation pour les insights de domaine
export const DomainInsightSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  description: z.string().min(10, 'Description trop courte'),
  businessImpact: z.string().min(10, 'Impact business requis'),
  implementationLevel: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  technologies: z.array(z.string()).optional(),
  trend: z.enum(['rising', 'stable', 'declining']).optional(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional()
});

// Schema de validation pour les cas clients PME
export const PMECaseStudySchema = z.object({
  industry: z.string().min(1, 'Secteur d\'activité requis'),
  companySize: z.string().min(1, 'Taille d\'entreprise requise'),
  sector: z.string().min(1, 'Secteur requis'),
  challenge: z.string().min(10, 'Défi trop court'),
  solutionApplied: z.string().min(10, 'Solution trop courte'),
  results: z.string().min(10, 'Résultats trop courts'),
  metrics: z.record(z.string(), z.string()),
  timeline: z.string().min(1, 'Timeline requise'),
  businessImpact: z.string().min(10, 'Impact business requis'),
  laurentQuote: z.string().optional(),
  icon: z.string().min(1, 'Icône requise'),
  themeColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Couleur de thème invalide')
});

// Schema de validation pour les phases d'implémentation
export const ImplementationPhaseSchema = z.object({
  phase: z.number().min(1).max(10),
  title: z.string().min(1, 'Titre requis'),
  duration: z.string().min(1, 'Durée requise'),
  description: z.string().min(10, 'Description trop courte'),
  keyActions: z.array(z.string().min(1)).min(1, 'Au moins une action requise'),
  expectedResults: z.array(z.string().min(1)).min(1, 'Au moins un résultat attendu requis'),
  laurentTip: z.string().min(10, 'Conseil Laurent Serre requis'),
  difficulty: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  prerequisites: z.array(z.string()).optional()
});

// Schema de validation pour les statistiques de catégorie
export const CategoryStatsSchema = z.object({
  value: z.string().min(1, 'Valeur requise'),
  label: z.string().min(1, 'Label requis'),
  description: z.string().optional()
});

// Schema de validation pour les suggestions cross-catégories
export const CategorySuggestionSchema = z.object({
  slug: z.string().min(1, 'Slug requis'),
  title: z.string().min(1, 'Titre requis'),
  description: z.string().min(10, 'Description trop courte'),
  icon: z.string().min(1, 'Icône requise'),
  relationshipType: z.enum(['complementary', 'prerequisite', 'advanced']),
  suggestedBooks: z.array(z.string()).optional()
});

// Schema de validation pour le contenu de catégorie complet
export const CategoryContentSchema = z.object({
  laurentVision: z.string().min(50, 'Vision Laurent Serre trop courte'),
  insights: z.array(DomainInsightSchema).min(1, 'Au moins un insight requis'),
  caseStudies: z.array(PMECaseStudySchema).min(1, 'Au moins un cas client requis'),
  roadmap: z.array(ImplementationPhaseSchema).min(1, 'Au moins une phase requise'),
  stats: z.array(CategoryStatsSchema).min(1, 'Au moins une statistique requise'),
  crossCategorySuggestions: z.array(CategorySuggestionSchema),
  domainMessage: z.object({
    title: z.string().min(1, 'Titre du message requis'),
    description: z.string().min(10, 'Description du message trop courte'),
    icon: z.string().min(1, 'Icône du message requise')
  })
});

// Schema de validation pour les cas d'usage PME de livres
export const PMEUseCaseSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  context: z.string().min(10, 'Contexte trop court'),
  application: z.string().min(10, 'Application trop courte'),
  results: z.string().min(10, 'Résultats trop courts'),
  laurentComment: z.string().min(10, 'Commentaire Laurent Serre requis'),
  industry: z.string().min(1, 'Secteur requis'),
  companySize: z.string().min(1, 'Taille d\'entreprise requise')
});

// Schema de validation pour le contenu de livre
export const BookContentSchema = z.object({
  detailedSummary: z.string().min(100, 'Résumé détaillé trop court'),
  keyTakeaways: z.array(z.string().min(10)).min(3, 'Au moins 3 points clés requis'),
  laurentRecommendations: z.array(z.string().min(10)).min(1, 'Au moins une recommandation requise'),
  pmeUseCase: PMEUseCaseSchema,
  applicationTips: z.array(z.string().min(5)),
  difficulty: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  readingTime: z.string().min(1, 'Temps de lecture requis'),
  targetProfiles: z.array(z.string().min(1)),
  complementaryBooks: z.array(z.string())
});

// Schema de validation pour les livres étendus
export const ExtendedBookSchema = z.object({
  slug: z.string().min(1, 'Slug requis'),
  title: z.string().min(1, 'Titre requis'),
  author: z.string().min(1, 'Auteur requis'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  cover: z.string().optional(),
  tagline: z.string().min(10, 'Tagline trop courte'),
  summary: z.string().min(50, 'Résumé trop court'),
  detailedSummary: z.string().optional(),
  keyPoints: z.array(z.string()).optional(),
  targetProfiles: z.array(z.string()).optional(),
  difficulty: z.enum(['Facile', 'Intermédiaire', 'Avancé']).optional(),
  readingTime: z.string().optional(),
  terrainAdvice: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  category: z.string().min(1, 'Catégorie requise'),
  complementaryBooks: z.array(z.string()).optional(),
  content: BookContentSchema.optional()
});

// Schema de validation pour les catégories de livres
export const BookCategorySchema = z.object({
  slug: z.string().min(1, 'Slug requis'),
  title: z.string().min(1, 'Titre requis'),
  description: z.string().min(10, 'Description trop courte'),
  icon: z.string().min(1, 'Icône requise'),
  books: z.array(ExtendedBookSchema).min(1, 'Au moins un livre requis'),
  seoKeywords: z.array(z.string()).optional()
});

// Fonctions de validation
export function validateCategoryContent(data: unknown) {
  return CategoryContentSchema.safeParse(data);
}

export function validateBookContent(data: unknown) {
  return BookContentSchema.safeParse(data);
}

export function validateCategoryTheme(data: unknown) {
  return CategoryThemeSchema.safeParse(data);
}

export function validateBookCategory(data: unknown) {
  return BookCategorySchema.safeParse(data);
}

export function validateExtendedBook(data: unknown) {
  return ExtendedBookSchema.safeParse(data);
}

// Types TypeScript dérivés des schemas Zod
export type ValidatedCategoryContent = z.infer<typeof CategoryContentSchema>;
export type ValidatedBookContent = z.infer<typeof BookContentSchema>;
export type ValidatedCategoryTheme = z.infer<typeof CategoryThemeSchema>;
export type ValidatedBookCategory = z.infer<typeof BookCategorySchema>;
export type ValidatedExtendedBook = z.infer<typeof ExtendedBookSchema>;

// Fonction utilitaire pour valider et transformer les données
export function validateAndTransform<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  context: string
): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    console.error(`Validation failed for ${context}:`, result.error.issues);
    throw new Error(`Invalid data for ${context}: ${result.error.issues.map(i => i.message).join(', ')}`);
  }
  
  return result.data;
}

// Fonction pour valider les données de façon non-bloquante avec logs
export function validateWithWarnings<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  context: string
): T | null {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    console.warn(`Validation warnings for ${context}:`, result.error.issues);
    return null;
  }
  
  return result.data;
}