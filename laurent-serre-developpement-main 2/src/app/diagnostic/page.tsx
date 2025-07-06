'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// 'use client' marks this component as a Client Component.
// All hooks like useRouter and useSearchParams must be in a Client Component.

function DiagnosticRedirector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reconstruct the query string from the searchParams object.
    const queryString = searchParams.toString();

    // Construct the target URL with the query string before the hash.
    const targetUrl = `/${queryString ? `?${queryString}` : ''}#diagnostic`;

    // Redirect using Next.js's router for smoother client-side navigation
    router.replace(targetUrl);
  }, [router, searchParams]);

  // This message will be displayed briefly while the client-side redirection occurs.
  return <p>Redirection en cours...</p>;
}

// The page itself is a Server Component.
export default function DiagnosticPage() {
  return (
    // The Suspense boundary is required by Next.js when a component uses useSearchParams.
    // It allows the server to render a fallback UI while waiting for the client-side part.
    <Suspense fallback={<p>Chargement de la page...</p>}>
      <DiagnosticRedirector />
    </Suspense>
  );
} 