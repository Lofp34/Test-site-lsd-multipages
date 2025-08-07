'use client';

import React, { memo, useMemo, useCallback, lazy, Suspense, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'isomorphic-dompurify';
import { useTheme } from 'next-themes';
import { AriaHelper, AccessibilityConfig, defaultAccessibilityConfig } from '@/lib/chat/accessibility';
import { chatSecurity, SecurityConfig, defaultSecurityConfig } from '@/lib/chat/security';

// Lazy load syntax highlighter for better performance
const SyntaxHighlighter = lazy(() => 
  import('react-syntax-highlighter').then(module => ({
    default: module.Prism
  }))
);

interface MarkdownRendererProps {
  content: string;
  isStreaming: boolean;
  className?: string;
  onRenderComplete?: () => void;
  renderingState?: 'pending' | 'rendering' | 'complete' | 'error';
  onRenderingStateChange?: (state: 'pending' | 'rendering' | 'complete' | 'error') => void;
  accessibilityConfig?: AccessibilityConfig;
  messageRole?: 'user' | 'assistant';
  messageTimestamp?: Date;
  securityConfig?: SecurityConfig;
}

interface MarkdownConfig {
  enableSyntaxHighlighting: boolean;
  enableTables: boolean;
  enableLinks: boolean;
  customComponents?: Record<string, React.ComponentType<any>>;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const defaultConfig: MarkdownConfig = {
  enableSyntaxHighlighting: true,
  enableTables: true,
  enableLinks: true,
};

// Lazy code block component with performance optimizations
const LazyCodeBlock = memo(({ language, code, theme, ...props }: {
  language: string;
  code: string;
  theme: string | undefined;
  [key: string]: any;
}) => {
  const [styles, setStyles] = useState<any>(null);
  
  // Load styles dynamically
  React.useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then((styleModule) => {
      setStyles({
        oneDark: styleModule.oneDark,
        oneLight: styleModule.oneLight
      });
    });
  }, []);

  if (!styles) {
    return (
      <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-b-lg overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    );
  }

  return (
    <SyntaxHighlighter
      style={theme === 'dark' ? styles.oneDark : styles.oneLight}
      language={language}
      PreTag="div"
      className="!mt-0 !mb-0 rounded-b-lg"
      showLineNumbers={true}
      wrapLines={true}
      customStyle={{
        margin: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
      {...props}
    >
      {code}
    </SyntaxHighlighter>
  );
});

LazyCodeBlock.displayName = 'LazyCodeBlock';

const MarkdownRenderer: React.FC<MarkdownRendererProps> = memo(({
  content,
  isStreaming,
  className = '',
  onRenderComplete,
  renderingState = 'complete',
  onRenderingStateChange,
  accessibilityConfig = defaultAccessibilityConfig,
  messageRole = 'assistant',
  messageTimestamp = new Date(),
  securityConfig = defaultSecurityConfig
}) => {
  const { theme } = useTheme();
  const [internalRenderingState, setInternalRenderingState] = useState<'pending' | 'rendering' | 'complete' | 'error'>('pending');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentId = useMemo(() => AriaHelper.generateId('markdown-content'), []);
  
  // Memoize content processing for performance and security
  const processedContent = useMemo(() => {
    if (!content) return '';
    
    try {
      // Security processing pipeline
      const secureContent = chatSecurity.processContent(content, 'markdown');
      return secureContent.trim();
    } catch (error) {
      console.error('Content security processing failed:', error);
      onRenderingStateChange?.('error');
      return ''; // Return empty content if security check fails
    }
  }, [content, onRenderingStateChange]);

  // Handle rendering state changes
  useEffect(() => {
    if (!processedContent) {
      setInternalRenderingState('pending');
      onRenderingStateChange?.('pending');
      return;
    }

    if (isStreaming) {
      setInternalRenderingState('rendering');
      onRenderingStateChange?.('rendering');
    } else {
      setInternalRenderingState('complete');
      onRenderingStateChange?.('complete');
    }
  }, [processedContent, isStreaming, onRenderingStateChange]);

  // Progressive rendering for streaming content
  const streamingContent = useMemo(() => {
    if (!isStreaming || !processedContent) return processedContent;
    
    // For streaming, we want to render complete markdown blocks
    // Split content by double newlines to get blocks
    const blocks = processedContent.split('\n\n');
    let completeBlocks = '';
    
    // Only render complete blocks during streaming
    for (let i = 0; i < blocks.length - 1; i++) {
      completeBlocks += blocks[i] + '\n\n';
    }
    
    // Add the last block if it seems complete (ends with punctuation or newline)
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock && (lastBlock.endsWith('.') || lastBlock.endsWith('!') || lastBlock.endsWith('?') || lastBlock.endsWith('\n'))) {
      completeBlocks += lastBlock;
    } else if (lastBlock) {
      // For incomplete blocks, show them but mark as streaming
      completeBlocks += lastBlock;
    }
    
    return completeBlocks;
  }, [processedContent, isStreaming]);
  
  // Enhanced content sanitization with security
  const sanitizedContent = useMemo(() => {
    const contentToSanitize = isStreaming ? streamingContent : processedContent;
    if (!contentToSanitize) return '';
    
    try {
      // Use the security system's enhanced sanitization
      return chatSecurity.processContent(contentToSanitize, 'html');
    } catch (error) {
      console.error('Content sanitization failed:', error);
      onRenderingStateChange?.('error');
      // Fallback to basic DOMPurify sanitization
      return DOMPurify.sanitize(contentToSanitize, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
        ALLOWED_ATTR: [],
        KEEP_CONTENT: true
      });
    }
  }, [processedContent, streamingContent, isStreaming, onRenderingStateChange]);

  // Advanced code component with lazy loading and performance optimizations
  const CodeComponent = useCallback((props: any) => {
    const { node, inline, className, children, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const codeContent = String(children).replace(/\n$/, '');
    
    // For inline code, return simple styled element
    if (inline || !language || !defaultConfig.enableSyntaxHighlighting) {
      return (
        <code 
          className={`${className || ''} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono`} 
          {...rest}
        >
          {children}
        </code>
      );
    }

    // For code blocks, use lazy-loaded syntax highlighter
    return (
      <div className="relative group my-4">
        {/* Header with language and copy button */}
        <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-white px-4 py-2 rounded-t-lg text-sm">
          <span className="font-medium text-gray-300">{language}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(codeContent);
            }}
            className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 focus:ring-offset-gray-800"
            title="Copier le code"
            aria-label={`Copier le code ${language}`}
            type="button"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copier
          </button>
        </div>
        
        {/* Code content with lazy-loaded syntax highlighter */}
        <Suspense 
          fallback={
            <pre 
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-b-lg overflow-x-auto"
              role="region"
              aria-label={`Code ${language}`}
              tabIndex={0}
            >
              <code className="text-sm font-mono">{codeContent}</code>
            </pre>
          }
        >
          <div
            role="region"
            aria-label={`Code ${language}`}
            tabIndex={0}
          >
            <LazyCodeBlock 
              language={language}
              code={codeContent}
              theme={theme}
              {...rest}
            />
          </div>
        </Suspense>
      </div>
    );
  }, [theme]);

  // Enhanced table component with responsive scroll and better styling
  const TableComponent = useCallback((props: any) => {
    const { children, ...rest } = props;
    
    if (!defaultConfig.enableTables) {
      return <div>{children}</div>;
    }

    const tableId = AriaHelper.generateId('table');
    const captionId = AriaHelper.generateId('table-caption');
    
    return (
      <div className="my-6">
        {/* Table wrapper with responsive scroll */}
        <div 
          className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          role="region"
          aria-labelledby={captionId}
          tabIndex={0}
        >
          <table 
            id={tableId}
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            role="table"
            {...rest}
          >
            {children}
          </table>
        </div>
        
        {/* Mobile scroll hint */}
        <div 
          id={captionId}
          className="mt-2 text-xs text-gray-500 dark:text-gray-400 md:hidden"
          role="note"
        >
          <svg className="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Faites défiler horizontalement pour voir plus
        </div>
      </div>
    );
  }, []);

  // Custom link component with enhanced security
  const LinkComponent = useCallback((props: any) => {
    const { href, children, ...rest } = props;
    
    if (!defaultConfig.enableLinks || !href) {
      return <span>{children}</span>;
    }

    // Enhanced URL validation with security system
    const urlValidation = chatSecurity.validateURL(href);
    if (!urlValidation.isValid) {
      return (
        <span 
          className="text-gray-500 cursor-not-allowed" 
          title={`Lien bloqué: ${urlValidation.reason}`}
        >
          {children} <span className="text-xs">[lien bloqué]</span>
        </span>
      );
    }

    const isExternal = urlValidation.reason?.includes('External domain');
    const safeHref = urlValidation.sanitizedURL || href;

    return (
      <a
        href={safeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mint-green hover:text-blue-ink underline transition-colors focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 rounded"
        aria-label={`Lien ${isExternal ? 'externe' : ''}: ${children} (s'ouvre dans un nouvel onglet)`}
        onClick={(e) => {
          if (isExternal) {
            const confirmed = window.confirm(
              `Ce lien vous redirige vers un site externe: ${new URL(safeHref).hostname}\n\nVoulez-vous continuer ?`
            );
            if (!confirmed) {
              e.preventDefault();
            }
          }
        }}
        {...rest}
      >
        {children}
        {isExternal && <span className="text-xs ml-1">🔗</span>}
        <span className="sr-only"> (lien {isExternal ? 'externe' : ''})</span>
      </a>
    );
  }, []);

  // Custom components for markdown rendering
  const components = useMemo((): Components => ({
    code: CodeComponent,
    table: TableComponent,
    a: LinkComponent,
    h1: ({ children, ...props }) => {
      const headingId = AriaHelper.generateId('heading-1');
      return (
        <h1 
          id={headingId}
          className="text-2xl font-bold text-blue-ink dark:text-mint-green mt-6 mb-4 first:mt-0 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 rounded" 
          tabIndex={accessibilityConfig.keyboardNavigationEnabled ? 0 : undefined}
          {...props}
        >
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      const headingId = AriaHelper.generateId('heading-2');
      return (
        <h2 
          id={headingId}
          className="text-xl font-semibold text-blue-ink dark:text-mint-green mt-5 mb-3 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 rounded" 
          tabIndex={accessibilityConfig.keyboardNavigationEnabled ? 0 : undefined}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const headingId = AriaHelper.generateId('heading-3');
      return (
        <h3 
          id={headingId}
          className="text-lg font-semibold text-blue-ink dark:text-mint-green mt-4 mb-2 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 rounded" 
          tabIndex={accessibilityConfig.keyboardNavigationEnabled ? 0 : undefined}
          {...props}
        >
          {children}
        </h3>
      );
    },
    p: ({ children, ...props }) => (
      <p className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="ml-4" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="relative border-l-4 border-mint-green pl-6 py-4 my-6 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800 dark:to-transparent italic text-gray-700 dark:text-gray-300 rounded-r-lg" 
        {...props}
      >
        <div className="absolute left-2 top-2 text-mint-green opacity-50">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        {children}
      </blockquote>
    ),
    img: ({ src, alt, ...props }) => {
      const imgId = AriaHelper.generateId('image');
      const captionId = AriaHelper.generateId('image-caption');
      
      return (
        <figure className="my-4" role="img" aria-labelledby={alt ? captionId : undefined}>
          <img 
            id={imgId}
            src={src}
            alt={alt || 'Image'}
            className="max-w-full h-auto rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2"
            loading="lazy"
            tabIndex={accessibilityConfig.keyboardNavigationEnabled ? 0 : undefined}
            {...props}
          />
          {alt && (
            <figcaption 
              id={captionId}
              className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic"
            >
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
    th: ({ children, ...props }) => (
      <th 
        className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td 
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100" 
        {...props}
      >
        {children}
      </td>
    ),
  }), [CodeComponent, TableComponent, LinkComponent]);

  // Handle render completion
  React.useEffect(() => {
    if (!isStreaming && onRenderComplete) {
      const timer = setTimeout(() => {
        setInternalRenderingState('complete');
        onRenderingStateChange?.('complete');
        onRenderComplete();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, onRenderComplete, onRenderingStateChange]);

  // Performance optimization: early return for empty content
  if (!sanitizedContent) {
    return null;
  }

  // Error boundary for markdown rendering
  const renderMarkdown = useCallback(() => {
    try {
      return (
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          skipHtml={false}
        >
          {sanitizedContent}
        </ReactMarkdown>
      );
    } catch (error) {
      console.error('Markdown rendering error:', error);
      setInternalRenderingState('error');
      onRenderingStateChange?.('error');
      
      // Fallback to plain text
      return (
        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {sanitizedContent}
        </div>
      );
    }
  }, [sanitizedContent, components, onRenderingStateChange]);

  // Set up accessibility attributes on mount
  useEffect(() => {
    if (containerRef.current) {
      AriaHelper.setStreamingAttributes(containerRef.current, isStreaming);
      
      if (messageRole && messageTimestamp) {
        AriaHelper.setChatMessageAttributes(containerRef.current, messageRole, messageTimestamp);
      }
    }
  }, [isStreaming, messageRole, messageTimestamp]);

  // Apply font size based on accessibility config
  const getFontSizeClass = () => {
    switch (accessibilityConfig.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  // Apply motion preferences
  const getAnimationClass = () => {
    return accessibilityConfig.reduceMotion ? 'motion-reduce:animate-none' : '';
  };

  // Apply contrast preferences
  const getContrastClass = () => {
    return accessibilityConfig.highContrastMode ? 'contrast-more:text-black contrast-more:dark:text-white' : '';
  };

  return (
    <div 
      ref={containerRef}
      id={contentId}
      className={`markdown-content prose prose-gray dark:prose-invert max-w-none ${className} ${getFontSizeClass()} ${getContrastClass()}`}
      role="article"
      aria-label={`Message ${messageRole === 'user' ? 'utilisateur' : 'assistant'} ${isStreaming ? '(en cours)' : ''}`}
      aria-live={isStreaming && accessibilityConfig.announceNewMessages ? accessibilityConfig.liveRegionPoliteness : 'off'}
      aria-busy={isStreaming}
      tabIndex={accessibilityConfig.keyboardNavigationEnabled ? 0 : undefined}
    >
      {renderMarkdown()}
      
      {/* Enhanced streaming indicator with rendering state */}
      {(isStreaming || internalRenderingState === 'rendering') && (
        <div 
          className={`flex items-center space-x-3 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${getAnimationClass()}`}
          role="status"
          aria-label="Contenu en cours de génération"
        >
          <div className="flex space-x-1" aria-hidden="true">
            <div className={`w-2 h-2 bg-mint-green rounded-full ${accessibilityConfig.reduceMotion ? '' : 'animate-bounce'}`}></div>
            <div className={`w-2 h-2 bg-mint-green rounded-full ${accessibilityConfig.reduceMotion ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-2 h-2 bg-mint-green rounded-full ${accessibilityConfig.reduceMotion ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {internalRenderingState === 'rendering' ? 'Rendu en cours...' : 'Laurent Serre écrit...'}
          </span>
          {internalRenderingState === 'rendering' && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Markdown
            </div>
          )}
        </div>
      )}
      
      {/* Error state indicator */}
      {internalRenderingState === 'error' && (
        <div 
          className="flex items-center space-x-2 mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
          role="alert"
          aria-label="Erreur de rendu"
        >
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-red-600 dark:text-red-400">
            Erreur lors du rendu Markdown
          </span>
        </div>
      )}
      
      {/* Screen reader only content summary */}
      {accessibilityConfig.screenReaderOptimized && !isStreaming && (
        <div className="sr-only">
          Fin du message {messageRole === 'user' ? 'utilisateur' : 'assistant'}. 
          Contenu rendu en Markdown avec {sanitizedContent.split('\n').length} lignes.
        </div>
      )}
    </div>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

export default MarkdownRenderer;
export type { MarkdownRendererProps, MarkdownConfig };