"use client";

import { resetCookieConsentValue } from "react-cookie-consent";

const ManageCookiesButton = () => {
  const handleManageCookies = () => {
    // Supprime le cookie de consentement
    resetCookieConsentValue("cookie-consent");
    // Recharge la page pour réafficher la bannière
    window.location.reload();
  };

  return (
    <button
      onClick={handleManageCookies}
      className="font-body text-primary-bg/70 hover:text-mint-green text-sm transition-colors"
    >
      Gestion des cookies
    </button>
  );
};

export default ManageCookiesButton; 