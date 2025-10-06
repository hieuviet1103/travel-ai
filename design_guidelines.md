# Design Guidelines: AI Travel Itinerary Planner

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Airbnb's trip planning interface and Google Travel's clean map integration, creating an intuitive travel planning experience that balances emotional appeal with functional utility.

**Core Design Principles:**
- Travel-first visual hierarchy with destination imagery taking center stage
- Seamless map integration as a co-equal design element, not an afterthought
- Card-based information architecture for scannable content
- Confidence-inspiring AI recommendations through clear visual feedback
- Mobile-responsive planning experience for on-the-go travelers

---

## Color Palette

### Light Mode
- **Primary Coral**: 351 100% 61% (#FF385C) - CTAs, active states, key actions
- **Secondary Teal**: 176 100% 33% (#00A699) - Success states, map markers, secondary actions
- **Background White**: 0 0% 100% (#FFFFFF) - Main background, card surfaces
- **Text Charcoal**: 0 0% 13% (#222222) - Primary text, headings
- **Accent Grey**: 0 0% 46% (#767676) - Secondary text, icons, borders
- **Success Green**: 123 100% 26% (#008A05) - Confirmations, completed states

### Dark Mode
- **Primary Coral**: 351 100% 65% - Slightly lighter for contrast
- **Secondary Teal**: 176 80% 45% - Adjusted saturation
- **Background Dark**: 0 0% 12% - Main dark background
- **Card Surface**: 0 0% 16% - Elevated surfaces
- **Text Light**: 0 0% 95% - Primary text on dark
- **Accent Grey Dark**: 0 0% 60% - Secondary text on dark

### Semantic Colors
- **Map Route**: Primary Coral for active routes
- **Map Markers**: Secondary Teal for destinations
- **Time Indicators**: Accent Grey for timestamps
- **AI Badge**: 260 60% 55% (purple) for AI-generated content

---

## Typography

**Font Stack**: Inter (primary), SF Pro Display (headings), system fallbacks
- **Display/Hero**: SF Pro Display, 48-72px, weight 700, tight tracking
- **H1 Headings**: Inter, 36-42px, weight 600, -0.02em tracking
- **H2 Subheadings**: Inter, 24-28px, weight 600, -0.01em tracking
- **H3 Card Titles**: Inter, 18-20px, weight 600
- **Body Text**: Inter, 15-16px, weight 400, 1.6 line-height
- **Small/Captions**: Inter, 13-14px, weight 500, Accent Grey
- **Map Labels**: Inter, 12px, weight 600, uppercase, 0.05em tracking

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 24 (e.g., p-4, gap-6, mb-8, py-12, px-16, space-y-24)

**Grid Structure:**
- Container: max-w-7xl with px-4 md:px-6 lg:px-8
- Map Section: 60/40 split on desktop (map 60%, details 40%)
- Itinerary Cards: Single column mobile, 2-column tablet, 2-3 column desktop
- Form Layouts: max-w-2xl centered for input forms

**Breakpoints:**
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768-1024px (2 columns, condensed spacing)
- Desktop: > 1024px (full layout, 24px base spacing)

---

## Component Library

### Navigation
- **Top Bar**: Sticky header with logo left, search center, user profile right, white bg with subtle shadow
- **Mobile Menu**: Slide-in drawer from left, full-height overlay

### Hero Section
- **Large Format Image**: Full-width destination hero (1920x600px) with gradient overlay (coral to transparent)
- **Search Widget**: Floating card overlay on hero with destination input, date picker, travelers count, prominent "Plan Trip" CTA in Primary Coral

### Cards & Content
- **Itinerary Day Cards**: White bg, rounded-2xl, p-6, shadow-md, hover:shadow-lg transition
- **Activity Cards**: Grid layout with image thumbnail (300x200), title, time, location icon, teal accent line on left
- **Destination Cards**: Featured image top, content below, tag badges (AI-suggested, Popular, Hidden Gem)

### Interactive Map
- **Map Container**: Rounded-xl borders, shadow-lg, full height on mobile (400px min), 60% width desktop
- **Map Controls**: Floating white circles with icons, positioned top-right with gap-2
- **Route Lines**: Primary Coral (2px width) with subtle animation
- **Markers**: Custom teal circular markers with white center dot, number badges for sequence

### Forms & Inputs
- **Text Inputs**: Border-2 border-gray-200, rounded-lg, p-3, focus:border-coral, dark mode compatible
- **Date Picker**: Calendar popup with coral accents, range selection with teal highlight
- **Dropdowns**: Smooth slide-down animation, shadow-xl, max-height with scroll
- **CTAs**: Primary Coral rounded-full px-8 py-3, white text, weight 600, hover:scale-105

### AI Features
- **AI Badge**: Purple gradient pill badge with sparkle icon, "AI Suggested" text
- **Loading States**: Pulsing coral dots animation for AI generation
- **Recommendations Panel**: Side drawer with suggested activities, each with confidence score bar in teal

### Data Display
- **Timeline View**: Vertical line in Accent Grey, activity nodes in Teal, time labels in small grey text
- **Budget Tracker**: Horizontal progress bar, teal fill, grey background, monetary values in Charcoal
- **Weather Icons**: Inline with location, colored appropriately (sun yellow, rain blue)

---

## Images Strategy

### Hero Image
**Primary Hero**: Large format destination image (1920x800px recommended) showcasing aspirational travel destination with warm, inviting photography. Overlay with coral-to-transparent gradient for text legibility.

### Supporting Imagery
- **Activity Thumbnails**: 16:9 ratio images for each suggested activity (400x225px)
- **Destination Gallery**: Masonry grid of location photos in itinerary details
- **Map Markers**: Custom icon set for different POI categories (restaurants, attractions, hotels)
- **Empty States**: Illustrated graphics for "No trips yet" states in brand colors
- **AI Avatar**: Friendly bot icon for AI assistant interactions

**Image Placement:**
- Hero: Top of homepage and trip detail pages
- Cards: Left-aligned thumbnails in activity cards
- Gallery: Below each day's itinerary section
- Background: Subtle destination patterns in footer

---

## Animations

**Minimal & Purposeful:**
- **Map Interactions**: Smooth zoom/pan with easing, marker bounce on hover (300ms)
- **Card Hover**: Subtle lift with shadow expansion (200ms ease)
- **Route Drawing**: Animated polyline drawing when itinerary loads (1s)
- **AI Generation**: Shimmer effect on loading cards (1.5s loop)
- **Page Transitions**: Fade between route changes (300ms)

**Avoid**: Excessive scroll animations, parallax effects, unnecessary micro-interactions

---

## Mobile Optimization

- **Bottom Sheet**: Itinerary details slide up from bottom on mobile, swipe to dismiss
- **Map Toggle**: Tab system to switch between map view and list view
- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Sticky CTA**: "Save Trip" button fixed at bottom with safe area padding
- **Condensed Typography**: Scale down by 10-15% on mobile while maintaining hierarchy

---

## Accessibility & Dark Mode

- **Contrast Ratios**: Minimum 4.5:1 for body text, 3:1 for large text
- **Focus States**: Visible 2px coral outline on all interactive elements
- **Dark Mode**: Consistent implementation across forms, maps, cards - use dark surface colors with adjusted text contrast
- **Screen Readers**: Semantic HTML, ARIA labels for map interactions, status announcements for AI results
- **Keyboard Navigation**: Full keyboard support for map controls, card navigation, form completion