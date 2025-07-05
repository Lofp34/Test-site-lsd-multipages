"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Tout accepter"
      declineButtonText="Tout refuser"
      enableDeclineButton
      cookieName="cookie-consent"
      style={{
        background: "linear-gradient(to right, #1e2a3a, #1a2330)",
        color: "#f1f1f1",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        borderTop: "1px solid #334155",
      }}
      buttonStyle={{
        backgroundColor: "#00c4b3",
        color: "#ffffff !important",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "12px 20px",
        transition: "background-color 0.3s",
      }}
      declineButtonStyle={{
        backgroundColor: "#4a5568",
        color: "#ffffff !important",
        fontSize: "14px",
        borderRadius: "8px",
        padding: "12px 20px",
        transition: "background-color 0.3s",
      }}
      expires={180}
    >
      Ce site utilise des cookies pour améliorer l'expérience utilisateur. En
      cliquant sur "Tout accepter", vous consentez à notre utilisation des
      cookies.{" "}
      <Link href="/cookies" className="text-mint-green hover:underline">
        En savoir plus
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieConsentBanner; 