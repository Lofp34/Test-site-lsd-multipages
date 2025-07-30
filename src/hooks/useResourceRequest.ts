/**
 * Hook pour gérer les demandes de ressources
 */

'use client';

import { useState, useCallback } from 'react';

export interface ResourceRequestData {
  userEmail: string;
  resourceUrl: string;
  sourceUrl: string;
  message?: string;
}

export interface UseResourceRequestResult {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  submitRequest: (data: ResourceRequestData) => Promise<boolean>;
  reset: () => void;
}

export function useResourceRequest(): UseResourceRequestResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitRequest = useCallback(async (data: ResourceRequestData): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/resource-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi de la demande');
      }

      setSuccess(true);
      return true;

    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    isSubmitting,
    error,
    success,
    submitRequest,
    reset
  };
}