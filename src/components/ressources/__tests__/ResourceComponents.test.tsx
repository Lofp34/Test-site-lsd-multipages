/**
 * Tests for Resource Components
 * Basic smoke tests to ensure components render without errors
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Download, FileText } from 'lucide-react';
import ResourceHero from '../ResourceHero';
import ToolPreview from '../ToolPreview';
import ResourceDownloadForm from '../ResourceDownloadForm';
import ResourceCTAs, { defaultResourceCTAs } from '../ResourceCTAs';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('Resource Components', () => {
  describe('ResourceHero', () => {
    it('renders without crashing', () => {
      const props = {
        title: 'Test Resource',
        subtitle: 'Test Subtitle',
        description: 'Test description',
        icon: Download,
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
        primaryCTA: {
          text: 'Download Now',
          onClick: jest.fn(),
        },
      };

      render(<ResourceHero {...props} />);
      expect(screen.getByText('Test Resource')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders with stats', () => {
      const props = {
        title: 'Test Resource',
        subtitle: 'Test Subtitle',
        description: 'Test description',
        icon: Download,
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
        primaryCTA: {
          text: 'Download Now',
          onClick: jest.fn(),
        },
        stats: [
          { label: 'Downloads', value: '1000+' },
          { label: 'Users', value: '500+' },
        ],
      };

      render(<ResourceHero {...props} />);
      expect(screen.getByText('1000+')).toBeInTheDocument();
      expect(screen.getByText('Downloads')).toBeInTheDocument();
    });
  });

  describe('ToolPreview', () => {
    it('renders without crashing', () => {
      const props = {
        title: 'Test Tool',
        description: 'Test tool description',
        benefits: ['Benefit 1', 'Benefit 2'],
        preview: {
          type: 'image' as const,
          src: '/test-image.jpg',
          alt: 'Test image',
        },
        onPreviewClick: jest.fn(),
      };

      render(<ToolPreview {...props} />);
      expect(screen.getByText('Test Tool')).toBeInTheDocument();
      expect(screen.getByText('Test tool description')).toBeInTheDocument();
    });

    it('renders with features and difficulty', () => {
      const props = {
        title: 'Test Tool',
        description: 'Test tool description',
        benefits: ['Benefit 1', 'Benefit 2'],
        preview: {
          type: 'document' as const,
          src: '/test-doc.pdf',
          alt: 'Test document',
        },
        features: ['Feature 1', 'Feature 2'],
        difficulty: 'Intermédiaire' as const,
        estimatedTime: '30 min',
        format: 'PDF',
        onPreviewClick: jest.fn(),
      };

      render(<ToolPreview {...props} />);
      expect(screen.getByText('Intermédiaire')).toBeInTheDocument();
      expect(screen.getByText('⏱️ 30 min')).toBeInTheDocument();
      expect(screen.getByText('📁 PDF')).toBeInTheDocument();
    });
  });

  describe('ResourceDownloadForm', () => {
    it('renders without crashing', () => {
      const props = {
        title: 'Download Resource',
        description: 'Get this amazing resource',
        resourceUrl: '/test-resource.pdf',
        deliveryMethod: 'email' as const,
      };

      render(<ResourceDownloadForm {...props} />);
      expect(screen.getByText('Download Resource')).toBeInTheDocument();
      expect(screen.getByText('Get this amazing resource')).toBeInTheDocument();
      expect(screen.getByLabelText(/Email professionnel/)).toBeInTheDocument();
    });

    it('renders with additional form fields', () => {
      const props = {
        title: 'Download Resource',
        description: 'Get this amazing resource',
        resourceUrl: '/test-resource.pdf',
        deliveryMethod: 'email' as const,
        formFields: {
          email: true,
          firstName: true,
          company: true,
          message: true,
        },
      };

      render(<ResourceDownloadForm {...props} />);
      expect(screen.getByLabelText(/Prénom/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Entreprise/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
    });
  });

  describe('ResourceCTAs', () => {
    it('renders without crashing', () => {
      render(<ResourceCTAs ctas={defaultResourceCTAs} />);
      expect(screen.getByText('Aller plus loin avec Laurent Serre')).toBeInTheDocument();
      expect(screen.getByText('Coaching Individuel')).toBeInTheDocument();
      expect(screen.getByText('Formation Équipe')).toBeInTheDocument();
    });

    it('renders with custom title and subtitle', () => {
      const props = {
        title: 'Custom Title',
        subtitle: 'Custom subtitle',
        ctas: defaultResourceCTAs.slice(0, 2),
      };

      render(<ResourceCTAs {...props} />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
    });

    it('limits CTAs based on maxCTAs prop', () => {
      const props = {
        ctas: defaultResourceCTAs,
        maxCTAs: 2,
      };

      render(<ResourceCTAs {...props} />);
      expect(screen.getByText('Coaching Individuel')).toBeInTheDocument();
      expect(screen.getByText('Formation Équipe')).toBeInTheDocument();
      expect(screen.queryByText('Diagnostic Gratuit')).toBeInTheDocument(); // Should still be there as it's within first 2
    });
  });
});