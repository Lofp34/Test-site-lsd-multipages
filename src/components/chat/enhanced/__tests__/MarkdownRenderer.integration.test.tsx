import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import MarkdownRenderer from '../MarkdownRenderer';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' })
}));

// Mock DOMPurify
vi.mock('isomorphic-dompurify', () => ({
  default: {
    sanitize: vi.fn((content) => content)
  }
}));

// Mock react-syntax-highlighter
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, ...props }: any) => (
    <pre data-testid="syntax-highlighter" {...props}>
      <code>{children}</code>
    </pre>
  )
}));

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  oneDark: {},
  oneLight: {}
}));

// Mock remark and rehype plugins
vi.mock('remark-gfm', () => ({
  default: () => {}
}));

vi.mock('rehype-raw', () => ({
  default: () => {}
}));

describe('MarkdownRenderer Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles streaming markdown content progressively', async () => {
    const mockOnRenderingStateChange = vi.fn();
    const mockOnRenderComplete = vi.fn();

    // Simulate streaming content being built up progressively
    const streamingContent = [
      '# Hello',
      '# Hello\n\nThis is a paragraph.',
      '# Hello\n\nThis is a paragraph.\n\n## Subheading',
      '# Hello\n\nThis is a paragraph.\n\n## Subheading\n\n- List item 1',
      '# Hello\n\nThis is a paragraph.\n\n## Subheading\n\n- List item 1\n- List item 2'
    ];

    const { rerender } = render(
      <MarkdownRenderer
        content={streamingContent[0]}
        isStreaming={true}
        onRenderingStateChange={mockOnRenderingStateChange}
        onRenderComplete={mockOnRenderComplete}
      />
    );

    // Should show rendering state
    expect(mockOnRenderingStateChange).toHaveBeenCalledWith('rendering');
    expect(screen.getByText('Rendu en cours...')).toBeInTheDocument();

    // Simulate progressive content updates
    for (let i = 1; i < streamingContent.length; i++) {
      rerender(
        <MarkdownRenderer
          content={streamingContent[i]}
          isStreaming={true}
          onRenderingStateChange={mockOnRenderingStateChange}
          onRenderComplete={mockOnRenderComplete}
        />
      );

      // Content should be progressively rendered
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello');
      
      if (i >= 1) {
        expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
      }
      
      if (i >= 2) {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subheading');
      }
    }

    // Complete the streaming
    rerender(
      <MarkdownRenderer
        content={streamingContent[streamingContent.length - 1]}
        isStreaming={false}
        onRenderingStateChange={mockOnRenderingStateChange}
        onRenderComplete={mockOnRenderComplete}
      />
    );

    // Should complete rendering
    await waitFor(() => {
      expect(mockOnRenderComplete).toHaveBeenCalled();
      expect(mockOnRenderingStateChange).toHaveBeenCalledWith('complete');
    });

    // Streaming indicator should be hidden
    expect(screen.queryByText('Rendu en cours...')).not.toBeInTheDocument();
  });

  it('handles code blocks during streaming', async () => {
    const codeContent = '```javascript\nconst hello = "world";\nconsole.log(hello);\n```';
    
    const { rerender } = render(
      <MarkdownRenderer
        content={codeContent}
        isStreaming={true}
      />
    );

    // Should show the code block header
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByTitle('Copier le code')).toBeInTheDocument();

    // Complete streaming
    rerender(
      <MarkdownRenderer
        content={codeContent}
        isStreaming={false}
      />
    );

    // Code should still be rendered
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText(/const hello = "world"/)).toBeInTheDocument();
  });

  it('handles tables during streaming', () => {
    const tableContent = `
| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |
    `;

    render(
      <MarkdownRenderer
        content={tableContent}
        isStreaming={true}
      />
    );

    // Should show table content (even if not perfectly formatted due to mocking)
    expect(screen.getByText(/Name.*Age.*City/)).toBeInTheDocument();
    expect(screen.getByText(/John.*25.*NYC/)).toBeInTheDocument();
  });

  it('maintains performance with large streaming content', () => {
    // Generate large content
    const largeContent = Array.from({ length: 100 }, (_, i) => 
      `## Section ${i + 1}\n\nThis is paragraph ${i + 1} with some **bold** text and *italic* text.\n\n`
    ).join('');

    const startTime = performance.now();
    
    render(
      <MarkdownRenderer
        content={largeContent}
        isStreaming={true}
      />
    );

    const renderTime = performance.now() - startTime;
    
    // Should render within reasonable time (less than 100ms)
    expect(renderTime).toBeLessThan(100);
    
    // Should still show streaming indicator
    expect(screen.getByText('Rendu en cours...')).toBeInTheDocument();
  });

  it('handles mixed content types during streaming', () => {
    const mixedContent = `
# Main Title

This is a paragraph with **bold** and *italic* text.

## Code Example

\`\`\`typescript
interface User {
  name: string;
  age: number;
}
\`\`\`

## List

- Item 1
- Item 2
- Item 3

## Table

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Code | ✅ |
| Tables | ✅ |

> This is a blockquote with important information.
    `;

    render(
      <MarkdownRenderer
        content={mixedContent}
        isStreaming={true}
      />
    );

    // Should render all content types
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument(); // Code block language
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText(/Feature.*Status/)).toBeInTheDocument(); // Table header
  });
});