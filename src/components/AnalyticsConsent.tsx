"use client";

import { useEffect, useState } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import GoogleAnalytics from "./GoogleAnalytics";
import { analyticsConfig } from "@/config/analytics";

const AnalyticsConsent = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = getCookieConsentValue("cookie-consent");
    setHasConsent(consent === "true");
  }, []);

  return hasConsent ? <GoogleAnalytics measurementId={analyticsConfig.measurementId} /> : null;
};

export default AnalyticsConsent; 