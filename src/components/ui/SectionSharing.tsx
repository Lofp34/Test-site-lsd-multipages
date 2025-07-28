'use client';

import React, { useState } from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';

interface SectionSharingProps {
  technique: NegotiationTechnique;
  sectionId: string;
  sectionTitle: string;
  keyQuote?: string;
  className?: string;
  compact?: boolean;
}

export default function SectionSharing({ 
  technique, 
  sectionId, 
  sectionTitle, 
  keyQuote,
  className = '',
  compact = false
}: SectionSharingProps) {
  const [isSharing, setIsSharing] = useState(false);

  const baseUrl = 'https://laurent-serre-developpement.fr';
  const sectionUrl = `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}#${sectionId}`;
  
  const shareText = keyQuote || `Découvrez "${sectionTitle}" dans la technique FBI "${technique.title}" par Laurent Serre`;

  const shareToLinkedIn = async () => {
    setIsSharing(true);
    
    const linkedInText = `💡 ${shareText}

🎯 Technique de négociation FBI adaptée aux PME françaises
✅ 85% de préservation des marges
✅ Scripts et cas concrets inclus

#négociation #PME #commercial #FBI #ChrisVoss #LaurentSerre`;

    // LinkedIn sharing URL
    const linkedInUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
    linkedInUrl.searchParams.set('url', sectionUrl);
    
    // Track sharing event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: 'LinkedIn',
        content_type: 'technique_section',
        content_id: `${technique.id}_${sectionId}`,
        custom_parameters: {
          section: sectionId,
          section_title: sectionTitle
        }
      });
    }
    
    // Open LinkedIn sharing dialog
    window.open(linkedInUrl.toString(), '_blank', 'width=600,height=600');
    
    // Copy text to clipboard for easy pasting
    try {
      await navigator.clipboard.writeText(linkedInText);
    } catch (err) {
      console.log('Could not copy to clipboard:', err);
    }
    
    setIsSharing(false);
  };

  const shareToTwitter = async () => {
    setIsSharing(true);
    
    const twitterText = `💡 ${shareText}

🎯 Technique FBI pour PME
✅ 85% de préservation des marges

#négociation #PME #FBI`;

    const twitterUrl = new URL('https://twitter.com/intent/tweet');
    twitterUrl.searchParams.set('text', twitterText);
    twitterUrl.searchParams.set('url', sectionUrl);
    
    // Track sharing event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: 'Twitter',
        content_type: 'technique_section',
        content_id: `${technique.id}_${sectionId}`
      });
    }
    
    window.open(twitterUrl.toString(), '_blank', 'width=600,height=600');
    setIsSharing(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(sectionUrl);
      
      // Track copy event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'technique_section',
          content_id: `${technique.id}_${sectionId}`
        });
      }
      
      // Visual feedback
      const button = document.getElementById(`copy-btn-${sectionId}`);
      if (button) {
        const originalText = button.textContent;
        button.textContent = '✓ Copié !';
        button.classList.add('bg-green-600');
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('bg-green-600');
        }, 2000);
      }
    } catch (err) {
      console.error('Could not copy link:', err);
    }
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={shareToLinkedIn}
          disabled={isSharing}
          className="p-2 text-[#0077B5] hover:bg-[#0077B5] hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
          title="Partager sur LinkedIn"
          aria-label={`Partager "${sectionTitle}" sur LinkedIn`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
        
        <button
          onClick={shareToTwitter}
          disabled={isSharing}
          className="p-2 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
          title="Partager sur Twitter"
          aria-label={`Partager "${sectionTitle}" sur Twitter`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>
        
        <button
          id={`copy-btn-${sectionId}`}
          onClick={copyLink}
          className="p-2 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg transition-all duration-200"
          title="Copier le lien"
          aria-label={`Copier le lien vers "${sectionTitle}"`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-red-600/20 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span className="text-sm font-medium text-red-600">
            Partager cette section
          </span>
        </div>
      </div>
      
      <p className="text-sm text-primary-secondary/80 mb-4">
        {keyQuote ? `"${keyQuote}"` : `Partagez "${sectionTitle}" avec votre réseau`}
      </p>
      
      <div className="flex items-center gap-3">
        <button
          onClick={shareToLinkedIn}
          disabled={isSharing}
          className="flex items-center gap-2 bg-[#0077B5] text-white px-3 py-2 rounded-lg hover:bg-[#005885] transition-colors duration-200 disabled:opacity-50 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>
        
        <button
          onClick={shareToTwitter}
          disabled={isSharing}
          className="flex items-center gap-2 bg-[#1DA1F2] text-white px-3 py-2 rounded-lg hover:bg-[#0d8bd9] transition-colors duration-200 disabled:opacity-50 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          Twitter
        </button>
        
        <button
          id={`copy-btn-${sectionId}`}
          onClick={copyLink}
          className="flex items-center gap-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copier
        </button>
      </div>
    </div>
  );
}