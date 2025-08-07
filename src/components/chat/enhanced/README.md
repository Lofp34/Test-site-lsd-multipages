# Enhanced Chat Interface Components

This directory contains the enhanced chat interface components that provide improved user experience with Markdown rendering, intelligent scroll control, and advanced chat controls.

## Components

### MarkdownRenderer
- **Purpose**: Renders Markdown content with syntax highlighting and security
- **Features**:
  - Real-time Markdown rendering during streaming
  - Syntax highlighting with `react-syntax-highlighter`
  - Security sanitization with DOMPurify
  - Responsive tables with horizontal scroll
  - Copy-to-clipboard for code blocks
  - Theme-aware styling (light/dark mode)

### ScrollController
- **Purpose**: Intelligent scroll management during streaming
- **Features**:
  - Auto-scroll when user is at bottom
  - Preserves user scroll position when manually scrolling
  - "Scroll to bottom" button with smart visibility
  - Keyboard shortcuts (Ctrl+Home, Ctrl+End)
  - Mobile gesture support
  - Intersection Observer for efficient position detection

### ChatControls
- **Purpose**: Advanced chat control buttons and keyboard shortcuts
- **Features**:
  - Close, minimize, and fullscreen buttons
  - Confirmation dialogs when streaming
  - Global keyboard shortcuts (Escape, Ctrl+M, F11)
  - Streaming indicator
  - Accessible button design

### EnhancedChatWidget
- **Purpose**: Complete enhanced chat widget integrating all components
- **Features**:
  - Integrates MarkdownRenderer, ScrollController, and ChatControls
  - Maintains compatibility with existing ChatWidget API
  - Configurable markdown, scroll, and controls settings
  - State management and event handling
  - Privacy and mobile optimization integration

## Dependencies

### Required Packages
```json
{
  "react-markdown": "^9.0.0",
  "remark-gfm": "^4.0.0",
  "rehype-raw": "^7.0.0",
  "react-syntax-highlighter": "^15.5.0",
  "@types/react-syntax-highlighter": "^15.5.0",
  "dompurify": "^3.0.0",
  "@types/dompurify": "^3.0.0"
}
```

### Installation
```bash
npm install react-markdown remark-gfm rehype-raw react-syntax-highlighter @types/react-syntax-highlighter dompurify @types/dompurify
```

## Usage

### Basic Usage
```tsx
import EnhancedChatWidget from '@/components/chat/enhanced/EnhancedChatWidget';

function App() {
  return (
    <EnhancedChatWidget
      apiKey="your-gemini-api-key"
      position="bottom-right"
      theme="auto"
      onStateChange={(state) => console.log('Chat state:', state)}
    />
  );
}
```

### Advanced Configuration
```tsx
import EnhancedChatWidget from '@/components/chat/enhanced/EnhancedChatWidget';

function App() {
  return (
    <EnhancedChatWidget
      apiKey="your-gemini-api-key"
      markdownConfig={{
        enableSyntaxHighlighting: true,
        enableTables: true,
        enableLinks: true
      }}
      scrollConfig={{
        bottomThreshold: 50,
        autoScrollDelay: 3000,
        smoothScrollDuration: 300
      }}
      controlsConfig={{
        showMinimizeButton: true,
        showFullscreenButton: true,
        confirmCloseOnStreaming: true
      }}
      onStateChange={(state) => {
        // Handle state changes
        console.log('Chat state changed:', state);
      }}
    />
  );
}
```

## Configuration Options

### MarkdownConfig
- `enableSyntaxHighlighting`: Enable code syntax highlighting
- `enableTables`: Enable table rendering
- `enableLinks`: Enable clickable links
- `customComponents`: Custom React components for markdown elements

### ScrollConfig
- `bottomThreshold`: Pixels from bottom to consider "at bottom" (default: 50)
- `autoScrollDelay`: Delay before showing scroll-to-bottom suggestion (default: 3000ms)
- `smoothScrollDuration`: Duration of smooth scroll animations (default: 300ms)

### ControlsConfig
- `showMinimizeButton`: Show minimize button (default: true)
- `showFullscreenButton`: Show fullscreen button (default: true)
- `confirmCloseOnStreaming`: Confirm before closing when streaming (default: true)
- `keyboardShortcuts`: Customize keyboard shortcuts

## Testing

### Run Tests
```bash
# Run all enhanced chat tests
npm run test:run -- src/components/chat/enhanced/__tests__/

# Run specific component tests
npm run test:run -- src/components/chat/enhanced/__tests__/MarkdownRenderer.test.tsx
npm run test:run -- src/components/chat/enhanced/__tests__/ScrollController.test.tsx
npm run test:run -- src/components/chat/enhanced/__tests__/ChatControls.test.tsx
npm run test:run -- src/components/chat/enhanced/__tests__/EnhancedChatWidget.test.tsx

# Run with coverage
npm run test:coverage -- src/components/chat/enhanced/__tests__/
```

### Test Runner
```bash
# Use the custom test runner
tsx src/components/chat/enhanced/__tests__/test-runner.ts

# Watch mode
tsx src/components/chat/enhanced/__tests__/test-runner.ts watch

# Specific test
tsx src/components/chat/enhanced/__tests__/test-runner.ts test MarkdownRenderer
```

## Architecture

### Component Hierarchy
```
EnhancedChatWidget
├── ChatControls (header controls)
├── ScrollController (message container wrapper)
│   └── Messages with MarkdownRenderer
└── ChatInterface (input area)
```

### State Management
- Central state management in EnhancedChatWidget
- State changes propagated via onStateChange callback
- Scroll state managed by ScrollController
- Chat state includes: isOpen, isMinimized, isFullscreen, isStreaming, messageCount, scrollState

### Integration Points
- Compatible with existing useGeminiChat hook
- Integrates with privacy management system
- Works with mobile optimization hooks
- Maintains existing ChatWidget API compatibility

## Security Features

### Markdown Security
- DOMPurify sanitization of all markdown content
- Whitelist of allowed HTML tags and attributes
- URL validation for links (only http, https, mailto)
- XSS protection for dynamic content

### Privacy Integration
- Respects user privacy preferences
- Cookie-free mode support
- Consent management integration
- Data encryption for local storage

## Performance Optimizations

### Rendering Performance
- React.memo for component memoization
- useMemo for expensive calculations
- Lazy loading of syntax highlighter
- Efficient re-rendering strategies

### Scroll Performance
- IntersectionObserver for position detection
- requestAnimationFrame for smooth animations
- Throttled scroll event handling
- Optimized DOM queries

### Memory Management
- Cleanup of event listeners
- Timeout and interval cleanup
- Ref cleanup on unmount
- Optimized message history management

## Accessibility Features

### WCAG 2.1 AA Compliance
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management

### Keyboard Shortcuts
- Escape: Close chat
- Ctrl/Cmd + M: Minimize/maximize
- F11: Fullscreen toggle
- Ctrl/Cmd + Home: Scroll to top
- Ctrl/Cmd + End: Scroll to bottom

## Mobile Optimization

### Touch-Friendly Design
- 44px minimum touch targets
- Gesture support for scroll control
- Responsive button sizing
- Mobile-specific layouts

### Performance on Mobile
- Optimized for slower devices
- Reduced animations on low-power mode
- Efficient memory usage
- Network-aware features

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills Required
- IntersectionObserver (for older browsers)
- requestAnimationFrame (built into modern browsers)

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration followed
- Consistent naming conventions
- Comprehensive JSDoc comments

### Testing Requirements
- Unit tests for all components
- Integration tests for component interactions
- Accessibility tests
- Performance tests
- Cross-browser compatibility tests

### Performance Monitoring
- Core Web Vitals tracking
- Render time monitoring
- Memory usage tracking
- Error rate monitoring

## Troubleshooting

### Common Issues
1. **Markdown not rendering**: Check if remark-gfm plugin is installed
2. **Scroll not working**: Verify container ref is properly set
3. **Keyboard shortcuts not working**: Check for event listener conflicts
4. **Performance issues**: Enable React DevTools Profiler

### Debug Mode
Set `NODE_ENV=development` to enable:
- Debug indicators in ScrollController
- Detailed error logging
- Performance timing logs
- State change logging

## Future Enhancements

### Planned Features
- Voice input support
- File drag-and-drop
- Message search functionality
- Custom themes
- Plugin system for extensions

### Performance Improvements
- Virtual scrolling for long conversations
- Web Workers for heavy computations
- Service Worker for offline support
- Progressive loading of features

## Contributing

### Development Setup
1. Install dependencies: `npm install`
2. Run tests: `npm run test:run`
3. Start development server: `npm run dev`
4. Run linting: `npm run lint`

### Pull Request Guidelines
- Include tests for new features
- Update documentation
- Follow existing code style
- Test on multiple browsers
- Include performance impact assessment

## License

This component library is part of the Laurent Serre Development project and follows the same licensing terms as the main project.