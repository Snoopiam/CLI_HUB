# Mjölnir AI - User Manual

> **Version:** 0.1.0
> **Last Updated:** December 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Features Overview](#features-overview)
4. [User Interface Guide](#user-interface-guide)
5. [UI/UX Design System](#uiux-design-system)
6. [Development Commands](#development-commands)
7. [Troubleshooting](#troubleshooting)

---

## Introduction

**Mjölnir AI** is a feature discovery and optimization guide for Claude Code. It helps developers find the exact features, agents, and tools tailored for their specific tasks through an intelligent, task-based recommendation system.

### Core Philosophy

- **Task-First Approach**: Describe what you're building, get relevant recommendations
- **Feature Discovery**: Explore six powerful Claude Code feature types
- **Guided Workflows**: Step-by-step assistance for specific development tasks

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## Features Overview

### Dashboard (Home)

The main landing page where you can:
- Enter a task description to receive tailored feature recommendations
- Browse Claude Code feature types at a glance
- Access guided workflows

### Feature Types

Mjölnir organizes Claude Code capabilities into six categories:

| Feature | Icon | Description |
|---------|------|-------------|
| **Agents** | ◆ | Specialized AI assistants for specific domains |
| **Skills** | ✦ | Reusable workflows activated automatically |
| **MCPs** | ◎ | External integrations and connections |
| **Hooks** | ↻ | Lifecycle automation and triggers |
| **Commands** | / | Quick actions via slash commands |
| **CLAUDE.md** | # | Project context and conventions |

### Analyze Page

Enter any development task and receive:
- Relevant feature recommendations
- Suggested tools and agents
- Related workflows

---

## User Interface Guide

### Navigation

- **Header**: Contains the Mjölnir AI logo and navigation links
- **Main Input**: The central morphing input field for task entry
- **Quick Start**: Pre-filled example tasks for rapid exploration
- **Feature Grid**: Visual cards for each feature type
- **Footer**: Additional links and information

### Interactive Elements

- **Cards**: Hover to see tilt effects and accent highlights
- **Buttons**: Lift on hover with smooth transitions
- **Input Field**: Animated border glow on focus
- **Background**: Subtle animated orbs for visual depth

---

## UI/UX Design System

This section documents the complete design language used in Mjölnir AI. Reference these values for consistent development and design work.

### Design Philosophy

> *Refined. Intelligent. Purposeful.*

- Monochrome foundation with intentional warm accent
- Motion that feels natural, not decorative
- Interactions that reward attention
- Typography that commands respect

---

### Color Palette

#### Background Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Primary Background** | `#0A0A0A` | `rgb(10, 10, 10)` | Main page background (near black) |
| **Secondary Background** | `#111111` | `rgb(17, 17, 17)` | Card backgrounds, elevated surfaces |
| **Tertiary Background** | `#1A1A1A` | `rgb(26, 26, 26)` | Higher elevated surfaces |
| **Hover Background** | `#222222` | `rgb(34, 34, 34)` | Interactive hover states |

#### Text Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Primary Text** | `#FAFAFA` | `rgb(250, 250, 250)` | Headlines, important content |
| **Secondary Text** | `#A3A3A3` | `rgb(163, 163, 163)` | Body text, descriptions |
| **Tertiary Text** | `#6B6B6B` | `rgb(107, 107, 107)` | Muted text, labels, hints |
| **Inverse Text** | `#0A0A0A` | `rgb(10, 10, 10)` | Text on light backgrounds |

#### Light Mode Text (for light card backgrounds)

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Light Primary** | `#0A0A0A` | `rgb(10, 10, 10)` | Dark text on light backgrounds |
| **Light Secondary** | `#4A4A4A` | `rgb(74, 74, 74)` | Medium gray on light backgrounds |
| **Light Tertiary** | `#6B6B6B` | `rgb(107, 107, 107)` | Light gray on light backgrounds |

#### Border Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Subtle Border** | `#1F1F1F` | `rgb(31, 31, 31)` | Barely visible separators |
| **Default Border** | `#2A2A2A` | `rgb(42, 42, 42)` | Standard borders |
| **Emphasis Border** | `#3A3A3A` | `rgb(58, 58, 58)` | Emphasized/highlighted borders |

#### Accent Colors (Warm Gold/Bronze)

| Name | Hex Code | RGBA | Usage |
|------|----------|------|-------|
| **Primary Accent** | `#D4A574` | `rgb(212, 165, 116)` | Main accent, CTAs, highlights |
| **Secondary Accent** | `#B8956A` | `rgb(184, 149, 106)` | Darker variant for depth |
| **Muted Accent** | - | `rgba(212, 165, 116, 0.1)` | Subtle background tints |
| **Glow Accent** | - | `rgba(212, 165, 116, 0.2)` | Glow effects, emphasis |

#### Semantic Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Success** | `#4ADE80` | `rgb(74, 222, 128)` | Success states, confirmations |
| **Warning** | `#FBBF24` | `rgb(251, 191, 36)` | Warning states, cautions |
| **Error** | `#F87171` | `rgb(248, 113, 113)` | Error states, destructive actions |

#### Category Card Background Colors

| Category | RGBA Value | Usage |
|----------|------------|-------|
| **Agents** | `rgba(212, 165, 116, 0.08)` | Warm gold tint |
| **Skills** | `rgba(200, 180, 160, 0.06)` | Neutral warm |
| **MCPs** | `rgba(150, 180, 200, 0.07)` | Cool blue-gray |
| **Hooks** | `rgba(200, 160, 180, 0.06)` | Mauve/purple |
| **Commands** | `rgba(160, 200, 180, 0.06)` | Teal |
| **CLAUDE.md** | `rgba(212, 165, 116, 0.08)` | Warm gold (like agents) |
| **Settings** | `rgba(180, 180, 180, 0.06)` | Neutral gray |
| **Development** | `rgba(180, 200, 160, 0.06)` | Soft yellow-green |
| **Testing** | `rgba(160, 180, 200, 0.06)` | Cool blue |
| **Debugging** | `rgba(200, 160, 160, 0.06)` | Warm red-gray |
| **Documentation** | `rgba(180, 180, 200, 0.06)` | Cool purple |

---

### Typography

#### Font Family

```css
font-family: "arboria", sans-serif;
```

**Source:** Adobe Fonts (TypeKit)
**Import:** `@import url("https://use.typekit.net/sxa0ixq.css");`

Arboria is used throughout the application for both sans-serif and monospace contexts, creating a unified, distinctive typographic identity.

#### Font Size Scale

| Token | Size (rem) | Size (px) | Usage |
|-------|------------|-----------|-------|
| `xs` | 0.75rem | 12px | Small labels, badges |
| `sm` | 0.875rem | 14px | Secondary text, captions |
| `base` | 1rem | 16px | Body text (default) |
| `lg` | 1.125rem | 18px | Slightly emphasized text |
| `xl` | 1.25rem | 20px | Subheadings |
| `2xl` | 1.5rem | 24px | Section titles |
| `3xl` | 2rem | 32px | Page section headers |
| `4xl` | 2.5rem | 40px | Large headlines |
| `5xl` | 3.5rem | 56px | Hero headlines |

#### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `normal` | 400 | Body text |
| `medium` | 500 | Slightly emphasized |
| `semibold` | 600 | Subheadings, labels |
| `bold` | 700 | Headlines, CTAs |

#### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | 1.1 | Headlines, large text |
| `snug` | 1.25 | Compact layouts |
| `normal` | 1.5 | Body text (default) |
| `relaxed` | 1.75 | Comfortable reading |

#### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tighter` | -0.05em | Display headlines |
| `tight` | -0.025em | Large headings |
| `normal` | 0em | Body text |
| `wide` | 0.025em | Small caps, labels |
| `wider` | 0.05em | Emphasis labels |
| `widest` | 0.1em | All-caps headings |

---

### Spacing System

Based on a 4px base unit:

| Token | Size (rem) | Size (px) |
|-------|------------|-----------|
| `px` | 1px | 1px |
| `0` | 0 | 0px |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |
| `24` | 6rem | 96px |

#### Common Spacing Patterns

| Element | Spacing | Tailwind Class |
|---------|---------|----------------|
| Card Padding | 24px / 20px | `p-6` / `p-5` |
| Section Margins | 32-48px | `mb-8` to `mb-12` |
| Element Gaps | 12-24px | `gap-3` to `gap-6` |
| Pill Badges | 16px × 8px | `px-4 py-2` |
| Input Padding | 20px | `p-5` |

---

### Border Radius

| Token | Size (rem) | Size (px) | Usage |
|-------|------------|-----------|-------|
| `none` | 0 | 0px | Sharp corners |
| `sm` | 0.25rem | 4px | Small elements |
| `md` | 0.5rem | 8px | Default buttons |
| `lg` | 0.75rem | 12px | Cards, inputs |
| `xl` | 1rem | 16px | Buttons, pills |
| `2xl` | 1.5rem | 24px | Large cards, modals |
| `full` | 9999px | - | Circles, pills |

#### Common Radius Usage

| Element | Radius | Tailwind Class |
|---------|--------|----------------|
| Buttons & Pills | 16px | `rounded-xl` |
| Cards | 24px | `rounded-2xl` |
| Inputs | 24px | `rounded-2xl` |
| Small Badges | 4-12px | `rounded` to `rounded-lg` |
| Avatar/Orbs | Circular | `rounded-full` |

---

### Shadows & Effects

#### Box Shadows

| Token | CSS Value | Usage |
|-------|-----------|-------|
| `none` | `none` | Flat elements |
| `sm` | `0 1px 2px rgba(0, 0, 0, 0.3)` | Subtle elevation |
| `md` | `0 4px 6px rgba(0, 0, 0, 0.3)` | Default cards |
| `lg` | `0 10px 15px rgba(0, 0, 0, 0.4)` | Elevated elements |
| `xl` | `0 20px 25px rgba(0, 0, 0, 0.4)` | Modals, dropdowns |
| `glow` | `0 0 20px rgba(212, 165, 116, 0.15)` | Accent glow |
| `glowStrong` | `0 0 40px rgba(212, 165, 116, 0.25)` | Emphasized glow |

#### Hover Lift Effect

```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

#### Glassmorphism

```css
.glass-card {
  background: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

#### Backdrop Blur

| Usage | Value |
|-------|-------|
| Header | `blur(20px)` |
| Input containers | `blur(20px)` |
| Overlays | `blur(20px)` |

---

### Gradients

#### Animated Gradient Text

```css
.gradient-text {
  background: linear-gradient(
    135deg,
    #FAFAFA 0%,
    #D4A574 25%,
    #FAFAFA 50%,
    #B8956A 75%,
    #FAFAFA 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}
```

#### Border Gradient

```css
background: linear-gradient(
  135deg,
  rgba(212, 165, 116, 0.3) 0%,
  transparent 30%,
  transparent 70%,
  rgba(184, 149, 106, 0.2) 100%
);
```

#### Shimmer Effect

```css
background: linear-gradient(
  90deg,
  transparent 0%,
  rgba(212, 165, 116, 0.1) 50%,
  transparent 100%
);
```

#### Section Divider Glow

```css
background: linear-gradient(
  90deg,
  transparent,
  rgba(212, 165, 116, 0.3),
  transparent
);
```

#### Background Orb Gradients

| Orb | Gradient |
|-----|----------|
| Primary | `radial-gradient(circle, #D4A57415, transparent 70%)` |
| Secondary | `radial-gradient(circle, #B8956A12, transparent 70%)` |
| Accent | `radial-gradient(circle, #D4A57420, transparent 70%)` |

---

### Animation & Motion

#### Duration Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `instant` | 0.1s | Micro-interactions |
| `fast` | 0.2s | Quick feedback |
| `normal` | 0.3s | Standard transitions (default) |
| `slow` | 0.5s | Emphasized motion |
| `slower` | 0.8s | Complex animations |

#### Easing Curves (Cubic Bezier)

| Token | Value | CSS | Usage |
|-------|-------|-----|-------|
| `default` | `[0.4, 0, 0.2, 1]` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease |
| `out` | `[0, 0, 0.2, 1]` | `cubic-bezier(0, 0, 0.2, 1)` | Deceleration |
| `in` | `[0.4, 0, 1, 1]` | `cubic-bezier(0.4, 0, 1, 1)` | Acceleration |
| `bounce` | `[0.34, 1.56, 0.64, 1]` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful emphasis |
| `elastic` | `[0.68, -0.55, 0.265, 1.55]` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Springy motion |

#### Spring Animations (Framer Motion)

```javascript
// Default spring
{ type: 'spring', stiffness: 400, damping: 30 }

// Bouncy spring
{ type: 'spring', stiffness: 300, damping: 20 }
```

#### Keyframe Animations

| Animation | Duration | Description |
|-----------|----------|-------------|
| `gradient-shift` | 8s | Animated gradient text - shifts background position |
| `shimmer` | 3s | Shimmer sweep effect - slides left to right |
| `glow-pulse` | 3s | Pulsing glow shadow - 0 0 20px to 0 0 40px |
| `floating` | 20-35s | Background orb movement |
| `dot-bounce` | 0.8s | Loading dot animation |

#### Keyframe Definitions

```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 200% center; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 165, 116, 0.1); }
  50% { box-shadow: 0 0 40px rgba(212, 165, 116, 0.2); }
}
```

---

### Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `behind` | -1 | Behind main content |
| `base` | 0 | Default layer |
| `raised` | 10 | Slightly elevated |
| `dropdown` | 100 | Dropdown menus |
| `sticky` | 200 | Sticky headers |
| `overlay` | 300 | Background overlays |
| `modal` | 400 | Modal dialogs |
| `popover` | 500 | Popovers |
| `toast` | 600 | Toast notifications |
| `tooltip` | 700 | Highest priority tooltips |

---

### Responsive Breakpoints

| Token | Width | Usage |
|-------|-------|-------|
| `sm` | 640px | Small screens (mobile landscape) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

---

### Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #111111;
}

::-webkit-scrollbar-thumb {
  background: #2A2A2A;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3A3A3A;
}
```

---

### Selection Styling

```css
::selection {
  background-color: rgba(212, 165, 116, 0.3);
  color: #FAFAFA;
}
```

---

### Focus States

```css
:focus-visible {
  outline: 2px solid #D4A574;
  outline-offset: 2px;
}
```

---

### Component Styling Rules

#### Cards

| Property | Default Variant | Accent Variant |
|----------|-----------------|----------------|
| Background | `rgba(17, 17, 17, 0.7)` | Same with gradient border |
| Border | `1px solid #2A2A2A` | Gradient border with glow |
| Hover Border | `#D4A574` | Enhanced glow |
| Hover Transform | `translateY(-4px)` | Same |
| Tilt | Optional 3D perspective | Same |

#### Buttons

```css
/* Standard Button */
padding: 0.5rem 1rem; /* px-4 py-2 */
border-radius: 1rem; /* rounded-xl */

/* Hover */
transform: translateY(-1px);

/* Active */
transform: scale(0.98);

/* Hover Shadow */
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
```

#### Input Fields (MorphInput)

| State | Property | Value |
|-------|----------|-------|
| Default | Background | `#111111` |
| Default | Border Radius | `rounded-2xl` (24px) |
| Focus | Border | Animated gradient |
| Focus | Glow | `radial-gradient(ellipse at center, #D4A574 15%, transparent 70%)` |
| Valid Button | Background | `#D4A574` |
| Invalid Button | Background | `#222222` |

#### Badges/Tags

```css
/* Standard Badge */
padding: 0.25rem 0.625rem; /* px-2.5 py-1 */
border-radius: 0.5rem; /* rounded-lg */
font-size: 0.75rem; /* text-xs */

/* Icon Badge (CardIcon) */
width: 2.5rem; /* w-10 */
height: 2.5rem; /* h-10 */
border-radius: 0.75rem; /* rounded-xl */

/* Group Hover Effect */
transform: scale(1.1) rotate(5deg);
```

#### Section Pills

```css
padding: 0.5rem 1rem; /* px-4 py-2 */
border-radius: 9999px; /* rounded-full */
background: rgba(212, 165, 116, 0.15);
border: 1px solid rgba(212, 165, 116, 0.3);
```

---

### CSS Custom Properties

```css
:root {
  /* Typography */
  font-family: "arboria", sans-serif;
  line-height: 1.5;
  font-weight: 400;

  /* Color scheme */
  color-scheme: dark;
  color: #FAFAFA;
  background-color: #0A0A0A;

  /* Font rendering */
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Custom properties */
  --accent-primary: #D4A574;
  --accent-secondary: #B8956A;
  --font-sans: "arboria", sans-serif;
  --font-mono: "arboria", sans-serif;
}
```

---

### Utility Classes

| Class | Description |
|-------|-------------|
| `.gradient-text` | Animated gradient text effect |
| `.shimmer` | Shimmer animation overlay |
| `.glow-pulse` | Pulsing glow box-shadow |
| `.border-gradient` | Animated gradient border |
| `.glass-card` | Glassmorphism effect |
| `.hover-lift` | Transform lift on hover |
| `.line-clamp-2` | 2-line text truncation |
| `.line-clamp-3` | 3-line text truncation |

---

### Layout Patterns

#### Page Structure

| Element | CSS |
|---------|-----|
| Header | Fixed, `h-16` (64px), `z-50` |
| Main Content | `pt-32 pb-16 px-6` |
| Hero Section | `pt-32 pb-24 px-6` |
| Footer | `py-12 px-6` |
| Min Height | `min-h-screen` |

#### Container Widths

| Container | Max Width | Tailwind Class |
|-----------|-----------|----------------|
| Main Container | ~64rem | `max-w-5xl` |
| Card Container | ~56rem | `max-w-4xl` |
| Input Container | ~42rem | `max-w-2xl` |

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

---

## Troubleshooting

### Common Issues

**Font not loading:**
- Ensure internet connection for Adobe Fonts (TypeKit)
- Check that the import URL is accessible: `https://use.typekit.net/sxa0ixq.css`

**Animations not smooth:**
- Enable hardware acceleration in browser
- Check for `prefers-reduced-motion` media query respect

**Colors appear different:**
- Ensure color scheme is set to dark
- Check monitor color profile settings
- Verify browser is rendering with correct color space

**Glassmorphism not working:**
- Check browser support for `backdrop-filter`
- Ensure `-webkit-backdrop-filter` fallback is present

---

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   │       ├── AnimatedBackground.tsx
│   │       ├── Card.tsx
│   │       ├── Footer.tsx
│   │       ├── Header.tsx
│   │       ├── MorphInput.tsx
│   │       └── PageLoader.tsx
│   ├── design/
│   │   └── system.ts     # Design system tokens
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── AnalyzePage.tsx
│   │   ├── AgentsPage.tsx
│   │   └── LogoTask.tsx
│   ├── services/         # API services
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── package.json
└── tailwind.config.js
```

---

## Credits

- **Design System:** Mjölnir Design Language
- **Typography:** Arboria by Adobe Fonts
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS
- **Framework:** React 18 + TypeScript + Vite

---

*Mjölnir - Refined. Intelligent. Purposeful.*
