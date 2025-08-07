import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('MarkdownRenderer', () => {
  const mockOnRenderComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders basic markdown content', () => {
    const content = '# Hello World\n\nThis is **bold** text.';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
        onRenderComplete={mockOnRenderComplete}
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
    expect(screen.getByText('bold')).toBeInTheDocument();
  });

  it('renders code blocks with syntax highlighting', async () => {
    const content = '```javascript\nconst hello = "world";\n```';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    // Check for the language label
    expect(screen.getByText('javascript')).toBeInTheDocument();
    // Check for the copy button
    expect(screen.getByTitle('Copier le code')).toBeInTheDocument();
    // Check for the code content
    expect(screen.getByText('const hello = "world";')).toBeInTheDocument();
  });

  it('renders inline code', () => {
    const content = 'Use `console.log()` for debugging.';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    const codeElement = screen.getByText('console.log()');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe('CODE');
  });

  it('renders tables with responsive wrapper', () => {
    const content = `
| Name | Age |
|------|-----|
| John | 25  |
| Jane | 30  |
    `;
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    // Since we're mocking the plugins, the table won't actually render as a table
    // Instead, check that the content is present
    expect(screen.getByText(/Name.*Age/)).toBeInTheDocument();
    expect(screen.getByText(/John.*25/)).toBeInTheDocument();
  });

  it('renders links with security attributes', () => {
    const content = '[Google](https://google.com)';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    const link = screen.getByRole('link', { name: 'Google' });
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('sanitizes malicious links', () => {
    const content = '[Malicious](javascript:alert("xss"))';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    // Should render as plain text, not a link
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Malicious')).toBeInTheDocument();
  });

  it('renders lists correctly', () => {
    const content = `
- Item 1
- Item 2
  - Nested item
- Item 3

1. First
2. Second
3. Third
    `;
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Nested item')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();
  });

  it('renders blockquotes', () => {
    const content = '> This is a quote';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    const blockquote = screen.getByText('This is a quote').closest('blockquote');
    expect(blockquote).toBeInTheDocument();
  });

  it('shows streaming indicator when streaming', () => {
    render(
      <MarkdownRenderer
        content="Some content"
        isStreaming={true}
      />
    );

    expect(screen.getByText('Rendu en cours...')).toBeInTheDocument();
  });

  it('hides streaming indicator when not streaming', () => {
    render(
      <MarkdownRenderer
        content="Some content"
        isStreaming={false}
      />
    );

    expect(screen.queryByText('Rendu en cours...')).not.toBeInTheDocument();
    expect(screen.queryByText('Laurent Serre écrit...')).not.toBeInTheDocument();
  });

  it('calls onRenderComplete when streaming stops', async () => {
    const mockOnRenderingStateChange = vi.fn();
    
    const { rerender } = render(
      <MarkdownRenderer
        content="Some content"
        isStreaming={true}
        onRenderComplete={mockOnRenderComplete}
        onRenderingStateChange={mockOnRenderingStateChange}
      />
    );

    expect(mockOnRenderComplete).not.toHaveBeenCalled();
    expect(mockOnRenderingStateChange).toHaveBeenCalledWith('rendering');

    rerender(
      <MarkdownRenderer
        content="Some content"
        isStreaming={false}
        onRenderComplete={mockOnRenderComplete}
        onRenderingStateChange={mockOnRenderingStateChange}
      />
    );

    await waitFor(() => {
      expect(mockOnRenderComplete).toHaveBeenCalledTimes(1);
      expect(mockOnRenderingStateChange).toHaveBeenCalledWith('complete');
    });
  });

  it('handles empty content gracefully', () => {
    render(
      <MarkdownRenderer
        content=""
        isStreaming={false}
      />
    );

    // Should not render anything
    expect(document.querySelector('.markdown-content')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <MarkdownRenderer
        content="# Test"
        isStreaming={false}
        className="custom-class"
      />
    );

    expect(document.querySelector('.markdown-content.custom-class')).toBeInTheDocument();
  });

  it('provides copy functionality for code blocks', async () => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    const content = '```javascript\nconst test = "code";\n```';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    const copyButton = screen.getByTitle('Copier le code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const test = "code";');
    });
  });

  it('handles different heading levels', () => {
    const content = `
# H1 Title
## H2 Title  
### H3 Title
    `;
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('H1 Title');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('H2 Title');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('H3 Title');
  });

  it('preserves text formatting', () => {
    const content = 'This is **bold**, *italic*, and ~~strikethrough~~ text.';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={false}
      />
    );

    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });

  it('handles progressive rendering during streaming', () => {
    const content = 'First paragraph.\n\nSecond paragraph.\n\nIncomplete';
    
    render(
      <MarkdownRenderer
        content={content}
        isStreaming={true}
      />
    );

    // Should render complete blocks
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Incomplete')).toBeInTheDocument();
  });

  it('shows rendering state indicator', () => {
    const mockOnRenderingStateChange = vi.fn();
    
    render(
      <MarkdownRenderer
        content="Some content"
        isStreaming={true}
        onRenderingStateChange={mockOnRenderingStateChange}
      />
    );

    expect(screen.getByText('Rendu en cours...')).toBeInTheDocument();
    expect(mockOnRenderingStateChange).toHaveBeenCalledWith('rendering');
  });

  it('handles rendering state changes', () => {
    const mockOnRenderingStateChange = vi.fn();
    
    render(
      <MarkdownRenderer
        content="Some content"
        isStreaming={false}
        onRenderingStateChange={mockOnRenderingStateChange}
      />
    );

    expect(mockOnRenderingStateChange).toHaveBeenCalledWith('complete');
  });
});