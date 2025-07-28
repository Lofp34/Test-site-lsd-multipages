'use client';

import React, { useState, useEffect } from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import { 
  SocialShareGenerator, 
  socialPlatforms, 
  keyQuotes,
  trackSocialShare,
  copyToClipboard,
  isNativeShareAvailable,
  nativeShare
} from '@/utils/social-sharing';

interface SocialSharingProps {
  technique: NegotiationTechnique;
  currentSection?: string;
  selectedQuote?: string;
  className?: string;
  compact?: boolean;
  showPreview?: boolean;
}

export default function SocialSharing({ 
  technique, 
  currentSection, 
  selectedQuote,
  className = '',
  compact = false,
  showPreview = true
}: SocialSharingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('main-principle');
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [shareGenerator] = useState(() => new SocialShareGenerator(technique));
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  useEffect(() => {
    setSupportsNativeShare(isNativeShareAvailable());
  }, []);

  const selectedQuoteData = keyQuotes.find(q => q.id === selectedQuoteId) || keyQuotes[0];

  // Gestion des messages de succès
  const showCopySuccess = (message: string) => {
    setCopySuccess(message);
    setTimeout(() => setCopySuccess(null), 3000);
  };

  const shareToLinkedIn = async () => {
    setIsSharing(true);
    
    const shareData = shareGenerator.generateShareData('linkedin', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true,
      includeHashtags: true
    });
    
    const shareUrl = socialPlatforms.linkedin.shareUrl(shareData);
    
    // Track sharing event
    trackSocialShare('LinkedIn', technique, currentSection, selectedQuoteId);
    
    // Open LinkedIn sharing dialog
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    // Copy text to clipboard for easy pasting
    const success = await copyToClipboard(
      shareData.text,
      () => showCopySuccess('Texte copié pour LinkedIn !'),
      (error) => console.error('Copy failed:', error)
    );
    
    setIsSharing(false);
  };

  const shareToTwitter = async () => {
    setIsSharing(true);
    
    const shareData = shareGenerator.generateShareData('twitter', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true,
      includeHashtags: true
    });
    
    const shareUrl = socialPlatforms.twitter.shareUrl(shareData);
    
    // Track sharing event
    trackSocialShare('Twitter', technique, currentSection, selectedQuoteId);
    
    window.open(shareUrl, '_blank', 'width=600,height=600');
    setIsSharing(false);
  };

  const shareToFacebook = async () => {
    setIsSharing(true);
    
    const shareData = shareGenerator.generateShareData('facebook', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true
    });
    
    const shareUrl = socialPlatforms.facebook.shareUrl(shareData);
    
    // Track sharing event
    trackSocialShare('Facebook', technique, currentSection, selectedQuoteId);
    
    window.open(shareUrl, '_blank', 'width=600,height=600');
    setIsSharing(false);
  };

  const shareToWhatsApp = async () => {
    setIsSharing(true);
    
    const shareData = shareGenerator.generateShareData('whatsapp', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true
    });
    
    const shareUrl = socialPlatforms.whatsapp.shareUrl(shareData);
    
    // Track sharing event
    trackSocialShare('WhatsApp', technique, currentSection, selectedQuoteId);
    
    window.open(shareUrl, '_blank');
    setIsSharing(false);
  };

  const shareToTelegram = async () => {
    setIsSharing(true);
    
    const shareData = shareGenerator.generateShareData('telegram', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true,
      includeHashtags: true
    });
    
    const shareUrl = socialPlatforms.telegram.shareUrl(shareData);
    
    // Track sharing event
    trackSocialShare('Telegram', technique, currentSection, selectedQuoteId);
    
    window.open(shareUrl, '_blank');
    setIsSharing(false);
  };

  const copyLink = async () => {
    const shareData = shareGenerator.generateShareData('linkedin', {
      section: currentSection,
      quoteId: selectedQuoteId
    });
    
    const success = await copyToClipboard(
      shareData.url,
      () => showCopySuccess('Lien copié !'),
      (error) => console.error('Copy failed:', error)
    );
    
    if (success) {
      trackSocialShare('copy_link', technique, currentSection, selectedQuoteId);
    }
  };

  const copyText = async () => {
    const shareData = shareGenerator.generateShareData('linkedin', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true
    });
    
    const fullText = `${shareData.text}\n\n${shareData.url}`;
    
    const success = await copyToClipboard(
      fullText,
      () => showCopySuccess('Texte et lien copiés !'),
      (error) => console.error('Copy failed:', error)
    );
    
    if (success) {
      trackSocialShare('copy_text', technique, currentSection, selectedQuoteId);
    }
  };

  const handleNativeShare = async () => {
    const shareData = shareGenerator.generateShareData('linkedin', {
      section: currentSection,
      quoteId: selectedQuoteId,
      customText: selectedQuote,
      includeStats: true
    });
    
    const success = await nativeShare(shareData, technique, currentSection);
    if (!success) {
      // Fallback to copy text if native share fails
      copyText();
    }
  };

  // Version compacte pour intégration dans les sections
  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={shareToLinkedIn}
          disabled={isSharing}
          className="p-2 text-[#0077B5] hover:bg-[#0077B5] hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50 group"
          title="Partager sur LinkedIn"
          aria-label="Partager sur LinkedIn"
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
          aria-label="Partager sur Twitter"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>
        
        <button
          onClick={copyLink}
          className="p-2 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg transition-all duration-200"
          title="Copier le lien"
          aria-label="Copier le lien"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        
        {copySuccess && (
          <span className="text-xs text-green-600 font-medium animate-fade-in">
            {copySuccess}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Partager cette technique"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span>Partager</span>
      </button>

      {/* Share Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-blue-ink rounded-2xl shadow-2xl border border-red-600/20 backdrop-blur-sm z-50">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-600">
                Partager cette technique
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                aria-label="Fermer le panneau de partage"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quote Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary-secondary mb-2">
                Citation à partager :
              </label>
              <select
                value={selectedQuoteId}
                onChange={(e) => setSelectedQuoteId(e.target.value)}
                className="w-full p-2 border border-red-600/20 rounded-lg bg-white dark:bg-blue-ink text-primary-secondary focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                {keyQuotes.map((quote) => (
                  <option key={quote.id} value={quote.id}>
                    {quote.context}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Quote Preview */}
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-600/20">
              <p className="text-sm text-red-700 dark:text-red-300 italic">
                {selectedQuoteData.text}
              </p>
            </div>

            {/* Preview du contenu (optionnel) */}
            {showPreview && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-600/20">
                <p className="text-sm text-red-700 dark:text-red-300 italic mb-2">
                  {selectedQuoteData.text}
                </p>
                <div className="text-xs text-red-600 dark:text-red-400">
                  📍 {currentSection ? `Section: ${currentSection}` : 'Page complète'}
                </div>
              </div>
            )}

            {/* Social Media Buttons */}
            <div className="space-y-3">
              {/* LinkedIn */}
              <button
                onClick={shareToLinkedIn}
                disabled={isSharing}
                className="w-full flex items-center gap-3 p-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-colors duration-200 disabled:opacity-50 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Partager sur LinkedIn</span>
                {isSharing && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-auto"></div>}
              </button>

              {/* Twitter */}
              <button
                onClick={shareToTwitter}
                disabled={isSharing}
                className="w-full flex items-center gap-3 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#0d8bd9] transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span>Partager sur Twitter</span>
              </button>

              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                disabled={isSharing}
                className="w-full flex items-center gap-3 p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Partager sur Facebook</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareToWhatsApp}
                disabled={isSharing}
                className="w-full flex items-center gap-3 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Partager sur WhatsApp</span>
              </button>

              {/* Telegram */}
              <button
                onClick={shareToTelegram}
                disabled={isSharing}
                className="w-full flex items-center gap-3 p-3 bg-[#0088CC] text-white rounded-lg hover:bg-[#006ba3] transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Partager sur Telegram</span>
              </button>

              {/* Divider */}
              <div className="border-t border-red-600/20 my-3"></div>

              {/* Copy Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Lien</span>
                </button>

                <button
                  onClick={copyText}
                  className="flex items-center gap-2 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Texte</span>
                </button>
              </div>

              {/* Native Share (if available) */}
              {supportsNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Partager...</span>
                </button>
              )}
            </div>

            {/* Success Message */}
            {copySuccess && (
              <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300 text-center">
                  ✓ {copySuccess}
                </p>
              </div>
            )}

            {/* Current Section Info */}
            {currentSection && (
              <div className="mt-4 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  📍 Partage de la section : {currentSection}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}