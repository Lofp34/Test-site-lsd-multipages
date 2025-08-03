'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SimpleChatWidget = dynamic(() => import('./SimpleChatWidget').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null
});

interface ChatWidgetWrapperProps {
  position?: 'bottom-right' | 'bottom-left' | 'center';
  theme?: 'light' | 'dark' | 'auto';
  initialMessage?: string;
  expertiseContext?: string;
}

export default function ChatWidgetWrapper(props: ChatWidgetWrapperProps) {
  return (
    <Suspense fallback={null}>
      <SimpleChatWidget {...props} />
    </Suspense>
  );
}