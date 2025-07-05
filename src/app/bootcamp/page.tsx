'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function BootcampRedirector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryString = searchParams.toString();
    const targetUrl = `/${queryString ? `?${queryString}` : ''}#bootcamp`;
    router.replace(targetUrl);
  }, [router, searchParams]);

  return <p>Redirection en cours...</p>;
}

// The page itself is a Server Component.
export default function BootcampPage() {
  return (
    // The Suspense boundary is required by Next.js.
    <Suspense fallback={<p>Chargement de la page...</p>}>
      <BootcampRedirector />
    </Suspense>
  );
} 