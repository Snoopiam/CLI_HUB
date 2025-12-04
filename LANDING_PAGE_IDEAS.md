# Mjölnir Landing Page Ideas

A collection of creative concepts for showcasing the Mjölnir logo with an impactful landing experience.

---

## Option 1: Hero Splash with Scroll Morph

**Concept:** Full-screen hero with the Mjölnir hammer centered and large. As the user scrolls, the page morphs into the main dashboard.

**Animation Sequence:**
1. Page loads with full-viewport hero
2. Large Mjölnir hammer centered (3x-5x header size)
3. Subtle floating animation + soft glow pulsing
4. "Mjölnir - Claude Optimizer" text below with fade-in
5. Scroll indicator at bottom (chevron or "scroll to begin")

**On Scroll:**
- Hammer smoothly scales down (using CSS transform + scroll progress)
- Hammer translates upward to header position
- Background darkens/shifts
- Dashboard content fades in from below with staggered animation
- Header becomes fixed once hammer "docks"

**Technical Approach:**
- `framer-motion` useScroll + useTransform hooks
- Interpolate scale: 1 → 0.25 based on scroll progress
- Interpolate Y position: center → header
- opacity transitions for content reveal

**Complexity:** Medium-High
**Impact:** High - smooth, modern, memorable

---

## Option 2: Lightning Strike Reveal

**Concept:** Dramatic lightning animation reveals the hammer, then transitions to UI.

**Animation Sequence:**
1. Screen starts dark/black
2. Brief pause (300ms)
3. Lightning bolt SVG animates from top to center
4. Flash effect (screen briefly brightens)
5. Hammer revealed with electric glow/crackling effect
6. Energy ripples outward in circular waves
7. UI fades in around the hammer
8. Hammer shrinks to header (quick 500ms transition)

**Technical Approach:**
- SVG lightning bolt with stroke-dasharray animation
- CSS keyframes for flash effect
- Radial gradient animation for ripples
- Lottie animation as alternative for complex lightning

**Complexity:** High
**Impact:** Very High - dramatic, on-brand, memorable
**Risk:** Could feel slow if not optimized; might annoy repeat visitors

**Mitigation:**
- Store flag in localStorage after first visit
- Subsequent visits skip animation or show shortened version

---

## Option 3: Forge Animation

**Concept:** The hammer is "forged" before the user's eyes, tying into the optimizer theme.

**Animation Sequence:**
1. Dark screen with ember particles floating
2. Hammer silhouette appears, glowing orange/molten
3. Sparks fly as "forging" progresses
4. Hammer gradually solidifies (color shifts to final design)
5. Final "clang" moment - subtle screen shake
6. Sparks settle, UI reveals
7. Hammer floats to header

**Technical Approach:**
- Canvas or WebGL for particle effects
- SVG filters for glow/heat effect
- Multiple image states (molten → solid) with crossfade
- CSS animation for screen shake

**Complexity:** Very High
**Impact:** Very High - unique, thematic, tells a story
**Risk:** Performance on low-end devices; longer load time

---

## Option 4: Parallax Depth Landing

**Concept:** Multi-layered scene with depth, responding to mouse movement and scroll.

**Layer Structure (back to front):**
1. Deep background - subtle stars/northern lights
2. Mid background - distant mountains or clouds
3. Rune symbols - floating, slightly transparent
4. Mjölnir hammer - main focus, largest parallax movement
5. Foreground particles - dust/energy motes

**Interactions:**
- Mouse move: layers shift at different rates (parallax)
- Creates sense of depth and immersion
- Scroll: layers compress together, hammer moves to header
- Could include subtle ambient sound (optional)

**Technical Approach:**
- `react-parallax-tilt` or custom mouse tracking
- useMotionValue for mouse position
- Transform layers based on mouse offset
- Scroll-triggered collapse animation

**Complexity:** Medium-High
**Impact:** High - immersive, premium feel
**Inspiration:** Apple product pages, game landing pages

---

## Option 5: Minimal Pulse Entry

**Concept:** Clean, fast, elegant. Logo with breathing glow, single interaction to proceed.

**Animation Sequence:**
1. Centered Mjölnir logo (2x-3x header size)
2. Soft pulsing glow animation (infinite loop)
3. "Mjölnir" text with subtle letter-spacing animation
4. "Click or scroll to continue" hint
5. On interaction: smooth scale-down to header, content reveals

**Technical Approach:**
- CSS keyframes for pulse/glow
- Simple scroll listener or click handler
- framer-motion for exit animation
- Minimal JavaScript, mostly CSS

**Complexity:** Low-Medium
**Impact:** Medium - clean, fast, respects user time
**Best For:** Users who want quick access, repeat visitors

---

## Option 6: Rune Circle Activation

**Concept:** Norse-themed mystical activation sequence.

**Animation Sequence:**
1. Dark screen, hammer silhouette centered
2. Rune circle draws itself around the hammer (SVG path animation)
3. Runes glow in sequence (one by one)
4. When circle completes, energy pulses inward
5. Hammer "activates" with bright glow
6. Circle fades, UI emerges
7. Hammer transitions to header

**Technical Approach:**
- SVG stroke-dashoffset animation for circle drawing
- Staggered opacity animations for runes
- Radial gradient for energy pulse
- Custom SVG rune designs

**Complexity:** Medium-High
**Impact:** High - unique, deeply thematic
**Bonus:** Could use actual Norse runes with meanings related to AI/optimization

---

## Option 7: Typing Command Interface

**Concept:** Terminal/CLI aesthetic - hammer appears as if "summoned" by command.

**Animation Sequence:**
1. Dark screen with blinking cursor
2. Text types out: `> summon mjolnir`
3. Brief pause, then: `> WORTHY.`
4. Hammer ASCII art or actual image slams in from top
5. Screen "cracks" effect radiating from impact point
6. Transitions to normal UI

**Technical Approach:**
- Typewriter effect (simple interval-based)
- CSS animation for slam-in
- SVG or CSS for crack effect
- Quick transition to main UI

**Complexity:** Medium
**Impact:** Medium-High - clever, developer-friendly vibe
**Fits:** Claude/AI optimization theme (command-line feel)

---

## Recommendation

**For Maximum Impact:** Option 2 (Lightning Strike) or Option 3 (Forge)
- Most memorable, strong brand impression
- Best for product launches or first-time visitors

**For Balance of Impact + Performance:** Option 1 (Scroll Morph)
- Modern, smooth, widely used pattern
- Good performance, familiar UX
- Easiest to implement well

**For Speed + Elegance:** Option 5 (Minimal Pulse)
- Respects user time
- Still showcases the logo
- Fast load, minimal friction

**For Unique Branding:** Option 6 (Rune Circle)
- Deeply thematic
- Memorable and distinctive
- Good middle ground on complexity

---

## Implementation Considerations

### First Visit vs. Returning Users
- Store `hasSeenLanding` in localStorage
- First visit: full animation
- Return visits: skip or abbreviated version (0.5s vs 2s)

### Performance
- Preload hammer image
- Use CSS transforms (GPU accelerated)
- Avoid heavy JavaScript during animation
- Consider `prefers-reduced-motion` media query

### Skip Option
- Always provide "Skip" button or click-to-skip
- Keyboard accessible (Enter/Space to skip)

### Mobile Considerations
- Simpler animations on mobile (battery/performance)
- Touch-friendly interactions
- Shorter durations

---

## Dynamic Layout Adaptation

The layout should adapt fluidly across four dimensions with **moderate intensity** - noticeable but not distracting.

### 1. Screen Size / Device Responsiveness

**Breakpoints:**
```
Mobile:      < 640px   (sm)
Tablet:      640-1024px (md)
Desktop:     1024-1440px (lg)
Ultrawide:   > 1440px   (xl/2xl)
```

**Landing Page Adaptations:**
| Element | Mobile | Tablet | Desktop | Ultrawide |
|---------|--------|--------|---------|-----------|
| Logo size | 120px | 180px | 240px | 300px |
| Text size | 1.5rem | 2rem | 2.5rem | 3rem |
| Particle count | 20 | 40 | 60 | 80 |
| Animation duration | 1.5s | 2s | 2s | 2s |

**Dashboard Adaptations:**
| Element | Mobile | Tablet | Desktop | Ultrawide |
|---------|--------|--------|---------|-----------|
| Grid columns | 1 | 2 | 3 | 4 |
| Card size | full width | 48% | 32% | 24% |
| Sidebar | hidden/drawer | collapsed | visible | expanded |
| Header height | 56px | 60px | 64px | 64px |

**Implementation:**
```tsx
// Tailwind responsive classes
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"

// Or with CSS container queries for component-level responsiveness
@container (min-width: 400px) { ... }
```

---

### 2. Scroll Position Adaptations

**Scroll Zones:**
```
Zone 1: 0-20vh     → Landing hero (logo prominent)
Zone 2: 20-50vh    → Transition zone (logo shrinking, content appearing)
Zone 3: 50-100vh   → Dashboard revealed (logo docked in header)
Zone 4: 100vh+     → Normal scrolling behavior
```

**Element Behaviors by Scroll:**

| Element | 0% scroll | 50% scroll | 100% scroll |
|---------|-----------|------------|-------------|
| Logo | Center, 240px | Moving up, 120px | Header, 40px |
| Logo opacity | 1.0 | 1.0 | 1.0 |
| Background | Dark gradient | Transitioning | Dashboard bg |
| Content cards | opacity: 0, y: 50px | opacity: 0.5, y: 25px | opacity: 1, y: 0 |
| Header | transparent | semi-visible | fully visible |

**Scroll-Linked Animations:**
```tsx
const { scrollYProgress } = useScroll();

const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.17]);
const logoY = useTransform(scrollYProgress, [0, 0.3], ['40vh', '32px']);
const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
```

**Parallax Speeds:**
- Background layer: 0.3x scroll speed
- Mid elements: 0.6x scroll speed
- Foreground: 1x scroll speed
- Creates depth without being overwhelming

---

### 3. User Interaction Adaptations

**Mouse/Cursor Effects:**

| Interaction | Response | Intensity |
|-------------|----------|-----------|
| Mouse move (landing) | Subtle parallax on logo layers | ±15px max |
| Mouse move (cards) | Tilt effect (already implemented) | 12° max |
| Hover on logo | Glow intensifies + slight scale | 1.05x |
| Hover on nav items | Background fade + indicator | 200ms |
| Click/tap | Ripple or press effect | subtle |

**Implementation:**
```tsx
// Mouse position tracking for parallax
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

// Transform based on mouse position (moderate range)
const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);
```

**Focus States:**
- Keyboard navigation shows visible focus rings
- Tab through interactive elements highlights them
- Accessible but visually consistent

**Touch Adaptations (Mobile):**
- Disable hover-dependent effects
- Use tap feedback instead
- Swipe gestures for navigation (optional)

---

### 4. Content Amount Adaptations

**Dynamic Grid System:**

| Content Count | Layout | Behavior |
|---------------|--------|----------|
| 1-2 items | Centered, larger cards | Max-width container |
| 3-4 items | 2-column grid | Balanced spacing |
| 5-9 items | 3-column grid | Standard layout |
| 10+ items | 4-column grid or virtualized | Pagination/infinite scroll |

**Card Sizing Logic:**
```tsx
const getGridCols = (itemCount: number) => {
  if (itemCount <= 2) return 'grid-cols-1 max-w-2xl mx-auto';
  if (itemCount <= 4) return 'grid-cols-1 sm:grid-cols-2';
  if (itemCount <= 9) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
};
```

**Empty States:**
- No content: Centered illustration + CTA
- Loading: Skeleton cards matching expected layout
- Error: Friendly message with retry option

**Overflow Handling:**
- Long text: Truncate with ellipsis + tooltip
- Many tags: Show first 3 + "+N more"
- Large images: Object-fit cover with aspect ratio

---

### 5. Combined Adaptation Matrix

**State Machine Approach:**

```
┌─────────────────────────────────────────────────────────────┐
│                        APP STATE                            │
├─────────────────────────────────────────────────────────────┤
│  Device    │  Scroll Zone  │  Interaction  │  Content      │
│  ────────  │  ───────────  │  ───────────  │  ─────────    │
│  mobile    │  hero         │  idle         │  empty        │
│  tablet    │  transition   │  hovering     │  sparse       │
│  desktop   │  dashboard    │  scrolling    │  normal       │
│  ultrawide │  deep-scroll  │  clicking     │  dense        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  RENDER LAYOUT  │
                    │  based on all   │
                    │  state factors  │
                    └─────────────────┘
```

**Priority Order (when conflicts arise):**
1. Device/screen size (structural)
2. Content amount (layout)
3. Scroll position (animation)
4. User interaction (enhancement)

---

### 6. Technical Implementation

**Recommended Hooks/Utilities:**

```tsx
// Custom hook for combined layout state
function useLayoutState() {
  const breakpoint = useBreakpoint();        // 'mobile' | 'tablet' | 'desktop' | 'ultrawide'
  const { scrollYProgress } = useScroll();
  const scrollZone = useScrollZone();        // 'hero' | 'transition' | 'dashboard'
  const mousePosition = useMousePosition();
  const contentCount = useContentCount();

  return {
    breakpoint,
    scrollZone,
    scrollProgress: scrollYProgress,
    mouse: mousePosition,
    contentDensity: getContentDensity(contentCount),

    // Computed values
    gridCols: computeGridCols(breakpoint, contentCount),
    logoSize: computeLogoSize(breakpoint, scrollZone),
    animationIntensity: computeIntensity(breakpoint),
  };
}
```

**CSS Variables for Runtime Updates:**
```css
:root {
  --layout-cols: 3;
  --logo-size: 240px;
  --content-opacity: 1;
  --parallax-intensity: 1;
}

/* Updated via JavaScript based on state */
```

**Performance Considerations:**
- Use CSS transforms (GPU accelerated)
- Debounce resize handlers (100ms)
- Throttle scroll handlers (16ms / 60fps)
- Use `will-change` sparingly
- Prefer `transform` and `opacity` for animations

---

## Next Steps

1. Choose preferred landing concept (or hybrid)
2. Create component structure
3. Implement base animation
4. Add scroll/interaction triggers
5. Handle first-visit logic
6. Test performance
7. Add skip functionality
8. Mobile optimization
9. **Build responsive layout system**
10. **Implement scroll-linked animations**
11. **Add mouse interaction effects**
12. **Create content-aware grid**
