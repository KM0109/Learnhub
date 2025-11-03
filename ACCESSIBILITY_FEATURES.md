# Accessibility Features - Screen Reader Support

## Overview

The LearnHub platform now includes a powerful **AccessibleImage** component that showcases screen reader support by allowing users to toggle between viewing images and their descriptive alt text through a right-click context menu.

## AccessibleImage Component

### Location
`src/components/AccessibleImage.tsx`

### Features

#### 1. **Right-Click Context Menu**
- Right-click on any image to open a context menu
- Toggle between "Show Image" and "Show Alt Text (Screen Reader)" modes
- Smooth, intuitive user experience

#### 2. **Alt Text Display Mode**
When toggled to alt text mode, the component displays:
- A styled container with dashed border (visual indicator of accessible mode)
- Clear label: "Screen Reader Text:"
- The complete, descriptive alt text
- Helper text: "(Right-click to view original image)"
- Visual indicator at the bottom: "Screen reader view active"

#### 3. **Accessibility Features**
- Full semantic HTML with `role="img"` and `aria-label` attributes
- Proper alt text on all images for screen readers
- Clear visual feedback when in screen reader mode
- Keyboard and mouse accessible context menu

### Usage

#### Basic Usage
```tsx
import AccessibleImage from "@/components/AccessibleImage";

<AccessibleImage
  src="/path/to/image.jpg"
  alt="Descriptive text for screen readers"
  className="w-full h-auto rounded-lg"
/>
```

#### With Additional Props
```tsx
<AccessibleImage
  src={courseImage}
  alt="Online learning environment with students collaborating"
  className="object-cover w-full h-full"
  onError={() => handleImageError()}
/>
```

### Integration Examples

#### CourseCard Component
- **File**: `src/components/CourseCard.tsx`
- Course thumbnail images now support screen reader toggle
- Users can see detailed descriptions of course images
- Accessible to both sighted and vision-impaired users

#### Index/Homepage
- **File**: `src/pages/Index.tsx`
- Hero image showcases the feature
- Alt text: "Online learning environment showcasing students and instructors collaborating in a digital classroom"
- Demonstrates the feature on your landing page

## How to Use (End User)

### For Sighted Users Testing Accessibility
1. Navigate to any page with images (e.g., homepage, courses)
2. **Right-click on any image**
3. Select "Show Alt Text (Screen Reader)"
4. View the descriptive text that screen reader users would experience
5. Right-click again to "Show Image" and return to normal view

### For Screen Reader Users
1. All images are properly marked with semantic HTML
2. Alt text is automatically available to assistive technologies
3. Users can navigate and understand all image content through their screen reader

## Benefits

### For Your Platform
- **Showcase Accessibility**: Demonstrate commitment to inclusive design
- **Education**: Help users understand importance of alt text
- **Testing**: Easy way to verify and improve alt text quality
- **User Experience**: Sighted users can verify accessibility compliance

### For Users
- **Transparency**: See what screen reader users experience
- **Learning**: Understand the importance of descriptive alt text
- **Accessibility**: Full support for users with visual impairments
- **Choice**: Toggle between image and text view anytime

## Best Practices for Alt Text

When using the AccessibleImage component, follow these guidelines:

### ✅ Good Alt Text Examples
- "Two students collaborating on a programming project in a modern classroom"
- "Certificate of completion with gold border and course name"
- "Dashboard showing course progress bars and completed lessons"

### ❌ Avoid
- "image" or "photo" (non-descriptive)
- Duplicating text already visible on page
- Extremely long descriptions (keep under 125 characters when possible)
- "Click here" or "Read more" (not descriptive)

## Technical Details

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| src | string | Yes | Image source URL |
| alt | string | Yes | Descriptive alt text for accessibility |
| className | string | No | Additional CSS classes |
| ...props | any | No | Additional image element props |

### Styling
The component respects your app's theme:
- Uses `bg-secondary/50` for alt text background
- Uses `border-primary/30` for the dashed border
- Uses `text-muted-foreground` for secondary text
- Maintains consistency with design system

### State Management
- **showAlt**: Boolean to track current view mode
- **contextMenu**: Position tracking for context menu display
- Context menu closes on outside click or selection

## Accessibility Compliance

- **WCAG 2.1 Level AA**: Compliant with Web Content Accessibility Guidelines
- **Semantic HTML**: Proper use of roles and aria attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Compatible**: Works with all major screen readers
  - NVDA (Windows)
  - JAWS (Windows)
  - VoiceOver (macOS/iOS)
  - TalkBack (Android)

## Future Enhancements

Potential improvements:
- Keyboard shortcut (e.g., Alt+T) to toggle mode
- Persistent user preference (remember last selected view)
- Extended descriptions link for very detailed image content
- Captions/transcripts for educational diagrams

## Integration Checklist

- [x] AccessibleImage component created
- [x] CourseCard updated with AccessibleImage
- [x] Homepage hero image updated
- [x] Build succeeds without errors
- [x] Right-click context menu functional
- [x] Alt text display styled consistently
- [x] Semantic HTML implemented
- [x] ARIA attributes added

## Support

For questions or improvements to the accessibility features, review the component source at `src/components/AccessibleImage.tsx`.
