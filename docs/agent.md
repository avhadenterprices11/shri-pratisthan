# Agent Playbook: Shree Prathishthan

This document serves as the executive instruction manual and governing authority for any AI or developer working on the digital experience of **Shree Prathishthan**. It establishes our code quality, design fidelity, and operational rules.

---

## 1. Project Identity & Brand Mission

*   **Project Name**: Shree Prathishthan Digital Ecosystem
*   **Organization Type**: Cultural & Social Welfare Trust (Non-Governmental Organization)
*   **Brand Essence**: "Heritage in Motion" — Merging ancient Indian cultural ethos with cutting-edge digital aesthetics. We present community service, social development, and traditional festivals not as historical artifacts, but as a modern, vibrant, and alive movement.
*   **Target Audience**: Global patrons, local volunteers, community members, sponsors, and corporate CSR partners.

---

## 2. Design & Motion Philosophy

### Design Philosophy (Obsidian Minimalist)
*   **Restraint over Excess**: Minimal layout structures with massive typography and high-contrast space.
*   **Glow & Depth**: A dark obsidian background acts as a canvas for soft, warm light glows (saffron and gold). 
*   **Glassmorphism**: Elegant translucent sheets representing purity and transparency of trust governance.
*   **Human Element**: Immersive, full-screen, high-definition portrait photography of volunteers and festival celebrations.

### Motion Philosophy (Kinetic Fluidity)
*   **Inertial & Organic**: We use Lenis smooth scrolling coupled with GSAP-powered scroll animations that mimic natural gravity and inertia.
*   **Text & Grid Reveal**: Headlines should split into words/characters and reveal on scroll. Grids expand outwards upon viewport entry.
*   **No Linear Transitions**: All movement follows custom cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) or GSAP's power4.out.

---

## 3. Coding Rules

*   **Framework**: Next.js 16 (App Router) using React 19 and TypeScript.
*   **Styling**: Vanilla CSS inside Tailwind CSS v4. Standardize utility usage. Avoid ad-hoc values; always refer to the design system tokens.
*   **Type Safety**:
    *   No usage of `any`.
    *   Interfaces must be declared in separate types or explicitly at the top of the file.
    *   All Component props must be typed.
*   **Component Structure**:
    *   Functional Components only.
    *   Use React Server Components (RSC) by default. Use `"use client"` only when interactive states (hooks, browser events) are required.
*   **File Structure Conventions**:
    *   Keep components focused and modular.
    *   Store shared utilities in [lib/utils.ts](file:///D:/Shri%20Pratisthan/lib/utils.ts).

---

## 4. Animation Standards

*   **Timeline Orchestration**: Use a centralized GSAP master timeline for page load animations to prevent layout shifts.
*   **Performance First**:
    *   Animate only `transform` (translate, scale, rotate) and `opacity` properties.
    *   Avoid animating width, height, top, left, or margin as they trigger browser layout recalculations.
    *   Apply `will-change: transform, opacity` to highly active animated nodes.
*   **Scrollers**: Lenis is initialized globally. Do not instantiate multiple scrollers.

---

## 5. Accessibility (WCAG 2.1 AA)

*   **Contrast**: Text elements must maintain a minimum contrast ratio of 4.5:1 against the obsidian background.
*   **Interactive Elements**:
    *   All buttons, links, and input elements must have visible, animated focus states.
    *   Use semantic HTML (`<button>`, `<a href>`, `<input>`).
    *   Interactive items must have a minimum touch target area of 44x44px.
*   **Screen Readers**: Ensure proper `aria-*` tags on custom interactive elements (e.g. accordions, modals).

---

## 6. Performance & SEO Rules

*   **Core Web Vitals (CWV)**:
    *   **LCP (Largest Contentful Paint)**: Keep under 1.5 seconds.
    *   **INP (Interaction to Next Paint)**: Keep under 100 milliseconds.
    *   **CLS (Cumulative Layout Shift)**: Must be `0.0`. Set explicit aspect ratios on all media wrappers.
*   **SEO Rules**:
    *   Exactly one `<h1>` per page.
    *   Use Next.js Metadata API for dynamically generating page titles and structured Schema.org JSON-LD data.
    *   All images must have descriptive `alt` tags.

---

## 7. Component Naming & Folder Structure

### Folder Structure
```text
D:\Shri Pratisthan/
├── app/                  # Routing pages, layouts, and global styles
├── components/           # UI elements (ui/ shared components, layouts/)
├── docs/                 # System documentation & guidelines
├── lib/                  # Utilities (utils.ts, gsap.ts, lenis.ts)
├── hooks/                # Custom React hooks (useMouse, useMediaQuery)
├── public/               # Static assets (compressed images, SVGs, videos)
└── data/                 # JSON or Static TS data configurations
```

### Component Naming Conventions
*   **Files**: PascalCase (e.g., `FestivalCard.tsx`, `NavigationMenu.tsx`).
*   **CSS Classes**: kebab-case (e.g., `glass-card`, `btn-primary`).
*   **Folders**: lowercase (e.g., `components/ui/button.tsx`).

---

## 8. AI System Instructions

When executing instructions or adding new features:
1.  **Read Before Writing**: Scan existing code and styles to ensure stylistic integration.
2.  **No Mock Components**: Avoid basic placeholders. Use genuine layouts, styles, and animation definitions.
3.  **Validate Layout**: Verify responsiveness on mobile, tablet, and widescreen viewports before considering a task done.
4.  **Preserve Comments**: Do not delete existing comments or documentation.
