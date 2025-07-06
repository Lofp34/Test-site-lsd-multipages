// Configuration Google Analytics
export const analyticsConfig = {
  // Remplacez par votre vrai Measurement ID depuis Google Analytics
  // Format: G-XXXXXXXXXX
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-1YMSHSSQKJ',
  
  // Configuration avancée
  config: {
    // Respecter le consentement RGPD
    anonymize_ip: true,
    // Durée de session en secondes (30 minutes)
    session_timeout: 1800,
    // Tracking des liens sortants
    link_attribution: true,
  }
};

// Helper pour vérifier si Analytics est configuré
export const isAnalyticsEnabled = () => {
  return analyticsConfig.measurementId !== 'G-XXXXXXXXXX' && 
         analyticsConfig.measurementId.startsWith('G-');
}; 