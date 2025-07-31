# Resource Components

This directory contains reusable components for creating resource pages on the Laurent Serre Développement website. These components are designed to work together to create consistent, professional resource pages that convert visitors into leads.

## Components Overview

### 1. ResourceHero

A hero section component for resource pages with customizable gradients, icons, and call-to-action buttons.

**Features:**
- Configurable gradient backgrounds
- Icon support with Lucide React
- Primary and secondary CTA buttons
- Optional statistics display
- Animated sections with staggered delays
- Trust indicators

**Usage:**
```tsx
import { ResourceHero } from '@/components/ressources';
import { Download } from 'lucide-react';

<ResourceHero
  title="Tableau de Bord Commercial"
  subtitle="Outil de pilotage"
  description="Suivez vos performances commerciales en temps réel avec cet outil simple et efficace."
  icon={Download}
  gradient="bg-gradient-to-br from-mint-green via-mint-green/90 to-blue-ink"
  primaryCTA={{
    text: "Télécharger l'outil",
    onClick: () => setShowForm(true),
    icon: Download
  }}
  stats={[
    { label: "Utilisateurs", value: "500+" },
    { label: "Téléchargements", value: "1000+" }
  ]}
/>
```

### 2. ToolPreview

A preview component that showcases tools with images, benefits, features, and difficulty levels.

**Features:**
- Multiple preview types (image, video, demo, document)
- Difficulty badges
- Feature tags
- Benefits list
- Estimated time and format indicators
- Hover effects and loading states
- Error handling for missing images

**Usage:**
```tsx
import { ToolPreview } from '@/components/ressources';

<ToolPreview
  title="Dashboard Excel"
  description="Tableau de bord complet pour suivre vos KPIs commerciaux"
  benefits={[
    "Suivi en temps réel des performances",
    "Graphiques automatiques",
    "Alertes personnalisables"
  ]}
  preview={{
    type: "image",
    src: "/previews/dashboard-preview.jpg",
    alt: "Aperçu du tableau de bord"
  }}
  features={["Excel", "Graphiques", "KPIs", "Alertes"]}
  difficulty="Intermédiaire"
  estimatedTime="15 min"
  format="Excel (.xlsx)"
  onPreviewClick={() => setShowModal(true)}
/>
```

### 3. ResourceDownloadForm

A comprehensive form component for resource downloads with validation, multiple field options, and delivery methods.

**Features:**
- Email validation (required)
- Optional fields (firstName, lastName, company, phone, message)
- Multiple delivery methods (email, download, both)
- Form validation with error messages
- Loading states and success feedback
- Privacy notice
- Character counting for message field
- Server-side rendering safe

**Usage:**
```tsx
import { ResourceDownloadForm } from '@/components/ressources';

<ResourceDownloadForm
  title="Télécharger le Tableau de Bord"
  description="Recevez votre outil par email dans les minutes qui suivent"
  resourceUrl="/ressources/tableau-bord-commercial.xlsx"
  deliveryMethod="email"
  formFields={{
    email: true,
    firstName: true,
    company: true,
    message: true
  }}
  onSubmit={async (data) => {
    // Custom submission logic
    await submitResourceRequest(data);
  }}
/>
```

### 4. ResourceCTAs

A call-to-action section component that promotes Laurent Serre's services with multiple layout options.

**Features:**
- Multiple CTA configurations
- Highlight/recommended CTAs
- Flexible layouts (grid, stack, horizontal)
- Trust indicators
- Predefined CTA sets
- Responsive design

**Usage:**
```tsx
import { ResourceCTAs, defaultResourceCTAs } from '@/components/ressources';

// Using default CTAs
<ResourceCTAs ctas={defaultResourceCTAs} />

// Custom CTAs
<ResourceCTAs
  title="Prêt à passer à l'action ?"
  subtitle="Transformez vos connaissances en résultats"
  ctas={[
    {
      title: "Coaching Personnalisé",
      description: "Accompagnement individuel pour atteindre vos objectifs",
      buttonText: "Réserver un appel",
      href: "/coach-commercial-entreprise",
      icon: <Target size={24} />,
      variant: "primary",
      highlight: true
    }
  ]}
  layout="grid"
  maxCTAs={3}
/>
```

## Design System Integration

All components follow the Laurent Serre Développement design system:

### Colors
- **Primary**: `blue-ink` (#1B365D)
- **Accent**: `mint-green` (#00BDA4)
- **Secondary**: `gray-anthracite` (#414141)
- **Emotion**: `orange-soft` (#FFAA5C)
- **Background**: `primary-bg` (#F2F5F7)

### Typography
- **Headings**: Inter + Roboto Slab
- **Body**: Open Sans
- **Emphasis**: Nunito

### Animations
- Consistent use of `AnimatedSection` with staggered delays
- Hover effects and micro-interactions
- Loading states and transitions

## Accessibility

All components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance
- Semantic HTML structure

## Server-Side Rendering

Components are designed to work with Next.js SSR:
- Conditional `window` object access
- Proper hydration handling
- No client-only dependencies in render logic

## Testing

Basic test coverage is provided in `__tests__/ResourceComponents.test.tsx`:
- Smoke tests for all components
- Props validation
- Conditional rendering tests
- Accessibility checks

## Best Practices

1. **Performance**: Images are lazy-loaded and optimized
2. **SEO**: Proper semantic structure and meta information
3. **Mobile-first**: Responsive design with touch-friendly interactions
4. **Loading States**: Proper feedback during async operations
5. **Error Handling**: Graceful degradation for missing resources
6. **Analytics**: Built-in tracking for user interactions

## Integration with Existing Systems

These components integrate seamlessly with:
- **Resource Request API** (`/api/resource-request`)
- **SendGrid Email Service** for automated responses
- **HubSpot** for lead tracking
- **Analytics** for conversion tracking
- **Existing UI Components** (Button, Badge, AnimatedSection)

## Future Enhancements

Potential improvements:
- A/B testing capabilities
- Advanced analytics integration
- Multi-language support
- Enhanced preview types (interactive demos)
- Social sharing functionality
- Progress tracking for multi-step forms