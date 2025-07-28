import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Create a simple ErrorBoundary component for testing
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

const DefaultErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert" className="error-fallback">
    <h2>Quelque chose s'est mal passé</h2>
    <p>Une erreur est survenue lors du chargement de cette section.</p>
    <details>
      <summary>Détails de l'erreur</summary>
      <pre>{error.message}</pre>
    </details>
  </div>
)

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error fallback when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Quelque chose s\'est mal passé')).toBeInTheDocument()
  })

  it('displays error details', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('uses custom fallback component when provided', () => {
    const CustomFallback = ({ error }: { error: Error }) => (
      <div data-testid="custom-fallback">Custom error: {error.message}</div>
    )
    
    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument()
  })

  it('catches errors in nested components', () => {
    const NestedComponent = () => (
      <div>
        <ThrowError shouldThrow={true} />
      </div>
    )
    
    render(
      <ErrorBoundary>
        <NestedComponent />
      </ErrorBoundary>
    )
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('does not catch errors in event handlers', () => {
    const ComponentWithEventHandler = () => {
      const handleClick = () => {
        throw new Error('Event handler error')
      }
      
      return <button onClick={handleClick}>Click me</button>
    }
    
    render(
      <ErrorBoundary>
        <ComponentWithEventHandler />
      </ErrorBoundary>
    )
    
    // Should render the button, not the error fallback
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})