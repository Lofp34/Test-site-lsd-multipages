# ScrollController Component

## Overview

The `ScrollController` component provides intelligent scroll management for chat interfaces with enhanced position detection, auto-scroll functionality, and user interaction handling. It's designed to meet the requirements for task 3.1 of the chat interface improvements.

## Features

### Enhanced Position Detection
- **IntersectionObserver Integration**: Uses IntersectionObserver with multiple thresholds (0, 0.1, 1) for accurate bottom position detection
- **Dual Validation**: Combines IntersectionObserver with manual scroll calculations for precise position tracking
- **Configurable Threshold**: 50px bottom threshold (configurable) to determine "at bottom" state

### Intelligent Auto-Scroll
- **Conditional Auto-Scroll**: Only auto-scrolls when user is at bottom and not manually scrolling
- **User Scroll Detection**: Detects manual user scrolling and temporarily disables auto-scroll
- **Smooth Animations**: Uses `requestAnimationFrame` for smooth scroll animations
- **Configurable Delays**: 500ms delay for user scroll detection, 3000ms for scroll suggestion

### User Interface Controls
- **Scroll to Bottom Button**: Appears after 3 seconds of inactivity when not at bottom during streaming
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Home`: Scroll to top
  - `Ctrl/Cmd + End`: Scroll to bottom
- **Visual Feedback**: Animated button with pulse effect for attention

### State Management
- **Comprehensive State Tracking**: Tracks `isAtBottom`, `isUserScrolling`, `shouldAutoScroll`, and `scrollPosition`
- **State Change Callbacks**: Notifies parent components of scroll state changes
- **Optimized Updates**: Prevents unnecessary state updates when position unchanged

## Props Interface

```typescript
interface ScrollControllerProps {
  containerRef: RefObject<HTMLDivElement>;
  isStreaming: boolean;
  autoScrollEnabled: boolean;
  onScrollStateChange: (state: ScrollState) => void;
  children: React.ReactNode;
}

interface ScrollState {
  isAtBottom: boolean;
  isUserScrolling: boolean;
  shouldAutoScroll: boolean;
  scrollPosition: number;
}

interface ScrollConfig {
  bottomThreshold: number; // pixels from bottom to consider "at bottom"
  autoScrollDelay: number; // ms before suggesting return to bottom
  smoothScrollDuration: number;
  userScrollDetectionDelay: number; // ms to detect end of user scrolling
  intersectionThreshold: number; // threshold for intersection observer
}
```

## Usage Example

```tsx
import ScrollController from './ScrollController';

function ChatInterface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtBottom: true,
    isUserScrolling: false,
    shouldAutoScroll: true,
    scrollPosition: 0
  });

  return (
    <div ref={containerRef} className="chat-container">
      <ScrollController
        containerRef={containerRef}
        isStreaming={isGenerating}
        autoScrollEnabled={true}
        onScrollStateChange={setScrollState}
      >
        {/* Chat messages */}
        <div className="messages">
          {messages.map(message => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </div>
      </ScrollController>
    </div>
  );
}
```

## Requirements Compliance

### Requirement 2.2: Manual Scroll During Streaming
✅ **WHEN l'utilisateur fait défiler vers le haut pendant le streaming THEN le système SHALL maintenir sa position de lecture sans forcer le retour en bas**

- Detects user scrolling and disables auto-scroll
- Maintains user's reading position during manual scroll

### Requirement 2.4: Temporary Auto-Scroll Disable
✅ **WHEN l'utilisateur remonte dans la conversation THEN le système SHALL désactiver temporairement l'auto-scroll**

- `isUserScrolling` state tracks manual scrolling
- Auto-scroll is disabled when `isUserScrolling` is true

### Requirement 2.5: Auto-Scroll Reactivation
✅ **WHEN l'utilisateur revient en bas de la conversation THEN le système SHALL réactiver l'auto-scroll automatiquement**

- IntersectionObserver detects when user returns to bottom
- `shouldAutoScroll` is automatically reactivated

## Technical Implementation

### Position Detection Algorithm

1. **IntersectionObserver Setup**:
   ```typescript
   const observer = new IntersectionObserver(callback, {
     root: containerRef.current,
     rootMargin: `0px 0px -${bottomThreshold}px 0px`,
     threshold: [0, 0.1, 1]
   });
   ```

2. **Dual Validation**:
   ```typescript
   const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
   const isActuallyAtBottom = distanceFromBottom <= bottomThreshold;
   const finalIsAtBottom = isIntersecting && isActuallyAtBottom;
   ```

3. **User Scroll Detection**:
   ```typescript
   // Detect manual scrolling (not auto-scroll)
   if (!isAutoScrollingRef.current) {
     setScrollState(prev => ({ ...prev, isUserScrolling: true }));
     
     // Reset after delay
     setTimeout(() => {
       setScrollState(prev => ({ ...prev, isUserScrolling: false }));
     }, userScrollDetectionDelay);
   }
   ```

### Auto-Scroll Logic

```typescript
useEffect(() => {
  if (!isStreaming || !autoScrollEnabled) return;
  if (!scrollState.shouldAutoScroll || scrollState.isUserScrolling) return;

  const scrollToBottom = () => {
    isAutoScrollingRef.current = true;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  };

  const animationFrame = requestAnimationFrame(scrollToBottom);
  return () => cancelAnimationFrame(animationFrame);
}, [isStreaming, autoScrollEnabled, scrollState.shouldAutoScroll, scrollState.isUserScrolling]);
```

## Performance Optimizations

1. **Throttled Events**: Scroll events are handled efficiently with proper cleanup
2. **Animation Frames**: Uses `requestAnimationFrame` for smooth animations
3. **Memory Management**: Proper cleanup of timeouts and observers
4. **State Optimization**: Prevents unnecessary re-renders with state comparison

## Accessibility Features

1. **ARIA Labels**: Proper labeling for screen readers
2. **Keyboard Navigation**: Full keyboard support with standard shortcuts
3. **Focus Management**: Maintains focus during scroll operations
4. **Visual Indicators**: Clear visual feedback for all interactions

## Testing

The component includes comprehensive unit tests covering:

- ✅ Core functionality and rendering
- ✅ IntersectionObserver configuration and behavior
- ✅ Position detection logic
- ✅ User scrolling detection
- ✅ Keyboard shortcuts
- ✅ Scroll button behavior
- ✅ State management
- ✅ Configuration handling
- ✅ Development mode features

Run tests with:
```bash
npm test src/components/chat/enhanced/__tests__/ScrollController.unit.test.tsx
```

## Configuration

Default configuration values:

```typescript
const defaultConfig: ScrollConfig = {
  bottomThreshold: 50,           // 50px from bottom
  autoScrollDelay: 3000,         // 3 seconds before showing scroll button
  smoothScrollDuration: 300,     // 300ms scroll animation
  userScrollDetectionDelay: 500, // 500ms to detect end of user scrolling
  intersectionThreshold: 0.1,    // 10% intersection threshold
};
```

## Browser Compatibility

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

Requires IntersectionObserver support (polyfill available for older browsers).

## Development Mode

In development mode, the component shows debug indicators displaying:
- Current scroll state (at bottom: ⬇️, not at bottom: ⬆️)
- User scrolling indicator (👆)
- Auto-scroll enabled indicator (🤖)

## Future Enhancements

Potential improvements for future iterations:
- Touch gesture support for mobile
- Customizable scroll button styling
- Advanced scroll position memory
- Integration with virtual scrolling
- Performance metrics collection