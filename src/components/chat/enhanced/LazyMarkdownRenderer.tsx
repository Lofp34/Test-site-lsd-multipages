'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface LazyMarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
  onRenderComplete?: () => void;
  priority?: 'low' | 'medium' | 'high';
  maxLength?: number;
}

interface ChunkData {
  id: string;
  content: string;
  rendered: boolean;
  visible: boolean;
}

const LazyMarkdownRenderer: React.FC<LazyMarkdownRendererProps> = ({
  content,
  isStreaming = false,
  className = '',
  onRenderComplete,
  priority = 'medium',
  maxLength
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chunks, setChunks] = useState<ChunkData[]>([]);
  const [MarkdownComponent, setMarkdownComponent] = useState<React.ComponentType<any> | null>(null);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<React.ComponentType<any> | null>(null);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const [visibleChunks, setVisibleChunks] = useState<Set<string>>(new Set());
  
  const { 
    shouldLazyLoad, 
    shouldLimitMarkdown, 
    getOptimizedConfig,
    measurePerformance 
  } = useMobilePerformance();
  
  const { isMobile } = useMobileOptimization();
  
  const optimizedConfig = getOptimizedConfig();

  // Lazy load markdown components
  useEffect(() => {
    if (!shouldLazyLoad && !isComponentLoaded) {
      const loadComponents = async () => {
        try {
          // Load react-markdown dynamically
          const { default: ReactMarkdown } = await import('react-markdown');
          setMarkdownComponent(() => ReactMarkdown);
          
          // Load syntax highlighter only if needed and not limited
          if (!shouldLimitMarkdown && optimizedConfig.enableSyntaxHighlighting) {
            const syntaxHighlighterModule = await import('react-syntax-highlighter');
            setSyntaxHighlighter(() => syntaxHighlighterModule.Prism);
          }
          
          setIsComponentLoaded(true);
        } catch (error) {
          console.warn('Failed to load markdown components:', error);
          setIsComponentLoaded(true); // Still mark as loaded to show fallback
        }
      };

      // Load with priority-based delay
      const delay = priority === 'high' ? 0 : priority === 'medium' ? 100 : 300;
      setTimeout(loadComponents, delay);
    }
  }, [shouldLazyLoad, isComponentLoaded, shouldLimitMarkdown, optimizedConfig.enableSyntaxHighlighting, priority]);

  // Split content into chunks for progressive rendering
  const contentChunks = useMemo(() => {
    if (!content) return [];
    
    const effectiveMaxLength = maxLength || optimizedConfig.maxMessageLength;
    
    if (content.length <= effectiveMaxLength) {
      return [{
        id: 'single',
        content,
        rendered: false,
        visible: false
      }];
    }
    
    // Split by paragraphs first, then by length if needed
    const paragraphs = content.split('\n\n');
    const chunks: ChunkData[] = [];
    let currentChunk = '';
    let chunkIndex = 0;
    
    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length > effectiveMaxLength && currentChunk) {
        chunks.push({
          id: `chunk-${chunkIndex++}`,
          content: currentChunk.trim(),
          rendered: false,
          visible: false
        });
        currentChunk = paragraph;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      }
    }
    
    if (currentChunk) {
      chunks.push({
        id: `chunk-${chunkIndex}`,
        content: currentChunk.trim(),
        rendered: false,
        visible: false
      });
    }
    
    return chunks;
  }, [content, maxLength, optimizedConfig.maxMessageLength]);

  // Update chunks when content changes
  useEffect(() => {
    setChunks(contentChunks);
  }, [contentChunks]);

  // Intersection observer for lazy rendering
  useEffect(() => {
    if (!containerRef.current || !shouldLazyLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const chunkId = entry.target.getAttribute('data-chunk-id');
          if (chunkId && entry.isIntersecting) {
            setVisibleChunks(prev => new Set([...prev, chunkId]));
          }
        });
      },
      {
        rootMargin: `${optimizedConfig.lazyLoadThreshold}px`,
        threshold: 0.1
      }
    );

    const chunkElements = containerRef.current.querySelectorAll('[data-chunk-id]');
    chunkElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [chunks, shouldLazyLoad, optimizedConfig.lazyLoadThreshold]);

  // Render chunk content
  const renderChunkContent = useCallback((chunk: ChunkData) => {
    if (!isComponentLoaded) {
      return (
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4 w-full mb-2" />
      );
    }

    // If components failed to load or are limited, show plain text
    if (!MarkdownComponent || shouldLimitMarkdown) {
      return (
        <div className={`whitespace-pre-wrap ${isMobile ? 'text-sm' : 'text-base'}`}>
          {chunk.content}
        </div>
      );
    }

    // Render with markdown
    return (
      <MarkdownComponent
        className={`prose prose-sm max-w-none dark:prose-invert ${isMobile ? 'mobile-markdown' : ''}`}
        components={{
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && SyntaxHighlighter && language && optimizedConfig.enableSyntaxHighlighting) {
              return (
                <SyntaxHighlighter
                  language={language}
                  PreTag="div"
                  className="rounded-md"
                  showLineNumbers={false}
                  wrapLines={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            return (
              <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm`} {...props}>
                {children}
              </code>
            );
          },
          img: ({ src, alt, ...props }: any) => (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="max-w-full h-auto rounded-lg"
              data-optimizable="true"
              data-low-res={optimizedConfig.imageQuality === 'low' ? src + '?w=400&q=60' : undefined}
              {...props}
            />
          ),
          table: ({ children, ...props }: any) => (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
                {children}
              </table>
            </div>
          )
        }}
      >
        {chunk.content}
      </MarkdownComponent>
    );
  }, [
    isComponentLoaded, 
    MarkdownComponent, 
    SyntaxHighlighter, 
    shouldLimitMarkdown, 
    isMobile, 
    optimizedConfig
  ]);

  // Progressive rendering effect
  useEffect(() => {
    if (!shouldLazyLoad) {
      // Render all chunks immediately if not lazy loading
      setChunks(prev => prev.map(chunk => ({ ...chunk, rendered: true })));
      return;
    }

    // Render visible chunks progressively
    const renderNextChunk = () => {
      setChunks(prev => {
        const nextUnrendered = prev.find(chunk => 
          (visibleChunks.has(chunk.id) || isStreaming) && !chunk.rendered
        );
        
        if (nextUnrendered) {
          return prev.map(chunk => 
            chunk.id === nextUnrendered.id 
              ? { ...chunk, rendered: true }
              : chunk
          );
        }
        
        return prev;
      });
    };

    const interval = setInterval(renderNextChunk, optimizedConfig.debounceDelay);
    return () => clearInterval(interval);
  }, [visibleChunks, isStreaming, shouldLazyLoad, optimizedConfig.debounceDelay]);

  // Completion callback
  useEffect(() => {
    const allRendered = chunks.length > 0 && chunks.every(chunk => chunk.rendered);
    if (allRendered && onRenderComplete) {
      measurePerformance('markdown-render-complete', onRenderComplete);
    }
  }, [chunks, onRenderComplete, measurePerformance]);

  if (!content) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`lazy-markdown-container ${className}`}
      data-performance-optimized={shouldLazyLoad}
      data-mobile={isMobile}
    >
      {chunks.map((chunk, index) => (
        <div
          key={chunk.id}
          data-chunk-id={chunk.id}
          className={`chunk-container ${chunk.rendered ? 'rendered' : 'pending'}`}
          style={{
            minHeight: chunk.rendered ? 'auto' : '2rem',
            opacity: chunk.rendered ? 1 : 0.7,
            transition: optimizedConfig.enableAnimations ? 'opacity 0.3s ease-in-out' : 'none'
          }}
        >
          {chunk.rendered ? (
            renderChunkContent(chunk)
          ) : (
            <div className="chunk-placeholder">
              {shouldLazyLoad ? (
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4 w-full mb-2" />
              ) : (
                <div className="text-gray-500 text-sm">Chargement...</div>
              )}
            </div>
          )}
        </div>
      ))}
      
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <div>Chunks: {chunks.length}</div>
          <div>Rendered: {chunks.filter(c => c.rendered).length}</div>
          <div>Lazy Loading: {shouldLazyLoad ? 'On' : 'Off'}</div>
          <div>Syntax Highlighting: {optimizedConfig.enableSyntaxHighlighting ? 'On' : 'Off'}</div>
          <div>Image Quality: {optimizedConfig.imageQuality}</div>
        </div>
      )}
    </div>
  );
};

export default LazyMarkdownRenderer;
export type { LazyMarkdownRendererProps };